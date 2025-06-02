"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TriangleImage from "../sub-components/triangleImage";
import { StepForm } from "../form/form";
import { Loader } from "@googlemaps/js-api-loader";
import * as turf from "@turf/turf";
import Cookies from "js-cookie";

const GOOGLE_MAPS_API_KEY = "AIzaSyAKk0-KsCS2mJ6IBtUVNBpZ8Js1kWCZblU";

export default function HomeHeroSection() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const backgroundImages: string[] = [
    "/assets/images/hero.jpg",
    "/assets/images/hero2.png",
    "/assets/images/hero3.jpg",
    "/assets/images/hero.jpg",
    "/assets/images/hero.jpg",
  ];

  const getCentroid = useCallback((coords: number[][]): number[] => {
    const [latSum, lonSum] = coords.reduce(
      ([latAcc, lonAcc], [lat, lon]) => [latAcc + lat, lonAcc + lon],
      [0, 0]
    );
    return [latSum / coords.length, lonSum / coords.length];
  }, []);

  const haversineDistance = useCallback(
    ([lat1, lon1]: number[], [lat2, lon2]: number[]): number => {
      const toRad = (deg: number) => (deg * Math.PI) / 180;
      const R = 6371000;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    },
    []
  );

  const updateAreaDisplay = useCallback((text: string) => {
    // localStorage.setItem("areaDisplay", text)
    Cookies.set("areaDisplay", text);
  }, []);

  const getClosestBuilding = useCallback(
    (elements: any[], lat: number, lon: number) => {
      return elements.reduce(
        (acc, building) => {
          const coords = building.geometry.map((c: any) => [c.lat, c.lon]);
          const centroid = getCentroid(coords);
          const dist = haversineDistance([lat, lon], centroid);
          return dist < acc.minDist ? { minDist: dist, building } : acc;
        },
        { minDist: Infinity, building: null }
      ).building;
    },
    [haversineDistance, getCentroid]
  );

  const fetchBuildingPolygon = useCallback(
    (lat: number, lon: number, map: google.maps.Map) => {
      const query = `
      [out:json];
      (
        way["building"](around:10,${lat},${lon});
      );
      out geom;
    `;

      fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.elements?.length) {
            alert("No building found.");
            updateAreaDisplay("N/A");
            return;
          }

          const closest = getClosestBuilding(data.elements, lat, lon);
          if (!closest) {
            alert("No suitable building found.");
            updateAreaDisplay("N/A");
            return;
          }

          const coordinates: [number, number][] = closest.geometry.map(
            (coord: { lon: number; lat: number }) => [coord.lon, coord.lat]
          );

          coordinates.push(coordinates[0]); // close polygon

          const centroid = getCentroid(
            coordinates.map(([lng, lat]): [number, number] => [lat, lng])
          );

          if (markerRef.current) markerRef.current.setMap(null);

          markerRef.current = new google.maps.Marker({
            position: { lat: centroid[0], lng: centroid[1] },
            map,
            title: "Building Location",
          });

          const turfPolygon = turf.polygon([coordinates]);
          const areaSqFeet = turf.area(turfPolygon) * 10.7639;

          updateAreaDisplay(`${areaSqFeet.toFixed(2)} sqft`);
        })
        .catch((err) => {
          console.error("Fetch error", err);
          alert("Failed to fetch building.");
          updateAreaDisplay("N/A");
        });
    },
    [updateAreaDisplay, getCentroid, getClosestBuilding, markerRef]
  );

  const geocodeAddress = useCallback(
    (map: google.maps.Map, address: string) => {
      geocoderRef.current?.geocode({ address }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(20);
          fetchBuildingPolygon(location.lat(), location.lng(), map);
        } else {
          alert("Address not found.");
          updateAreaDisplay("N/A");
        }
      });
    },
    [fetchBuildingPolygon, updateAreaDisplay, geocoderRef]
  );

  const initMap = useCallback(async () => {
    if (!mapRef.current) return;

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    try {
      await loader.load();

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 40.6997786, lng: -73.9333901 },
        zoom: 18,
        mapTypeId: "satellite",
      });

      geocoderRef.current = new google.maps.Geocoder();

      const address = Cookies.get("address");
      if (address) geocodeAddress(map, address);
    } catch (error) {
      console.error("Map load error:", error);
    }
  }, [mapRef, geocodeAddress]);

  useEffect(() => {
    if (currentStep === 3) initMap();
  }, [currentStep, initMap]);

  const currentBgImage =
    backgroundImages[currentStep - 1] || backgroundImages[0];

  return (
    <div className="relative">
      <div
        className={`relative flex w-full items-center overflow-hidden ${
          currentStep === 1 ? "min-h-[500px]" : "min-h-[350px]"
        }`}
      >
        <div className="absolute inset-0 z-0">
          {currentStep === 3 ? (
            <div id="map" ref={mapRef} className="w-full h-full" />
          ) : (
            <TriangleImage
              src={currentBgImage}
              alt="hero-sec"
              className="brightness-50"
              priority
            />
          )}
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center px-5 py-6 md:flex-row md:items-start md:gap-16 lg:gap-24 lg:px-10 lg:py-12">
          {currentStep === 1 && (
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-6xl">
                Estimate Your Roof Replacement Costs Instantly
              </h1>
            </div>
          )}

          <div
            className={`w-full ${
              currentStep === 1
                ? "md:w-1/2 max-lg:mt-4"
                : "md:w-2/3 lg:w-1/2 absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2"
            }`}
          >
            {currentStep === 1 && (
              <div className="rounded-4xl bg-white p-6 shadow-lg">
                <StepForm
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {currentStep > 1 && (
        <div className="container mx-auto px-5 lg:px-10">
          <div className="rounded-4xl bg-white p-6 shadow-lg md:w-2/3 lg:w-1/2 mx-auto -mt-[150px] relative z-20">
            <StepForm
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      )}
    </div>
  );
}
