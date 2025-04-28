import { StepForm } from "@/components/form/form";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { HomeIcon } from "@/components/icons/homeIcon";
import { RoundRightIcon } from "@/components/icons/roundRightIcon";
import { BlogSection } from "@/components/sub-components/blogs";
import { CTASection } from "@/components/sub-components/cta-section";
import { Testimonials } from "@/components/sub-components/testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="lg:space-y-32 space-y-20">
      <div
        id="home"
        className="relative flex min-h-[500px] w-full items-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero.png"
            alt="hero-sec"
            fill
            className="object-fill"
          />
        </div>

        {/* Content Container */}
        <div className="container relative z-10 mx-auto flex flex-col items-start gap-8 lg:px-10 px-5 lg:py-12 py-6 md:flex-row md:items-start md:gap-16 lg:gap-24">
          {/* Left Column - Text */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-6xl">
              Estimate Your Roof Replacement Costs Instantly
            </h1>
          </div>

          {/* Right Column - Form */}
          <div className="w-full md:w-1/2">
            <div className="rounded-4xl bg-white p-6 shadow-lg">
              <StepForm />
            </div>
          </div>
        </div>
      </div>

      <section id="projects">
        <div className="px-5 lg:px-10 lg:pb-12 pb-6 ">
          {/* Heading Section */}
          <div className="">
            <h2 className="text-4xl font-bold text-gray-700 md:text-3xl">
              Get a project quote
            </h2>
            <p className="mt-4 lg:text-lg text-gray-600">
              Ready to find out exactly how much your roof replacement will
              cost? With Roof Quoter, getting an accurate, personalized estimate
              has never been easier. Whether you're replacing aging shingles,
              upgrading to a more durable material, or tackling storm damage,
              our smart quoting system instantly connects you with trusted,
              local roofing professionals. Just enter a few basic details about
              your home and roof — such as size, material preference, and
              location — and Roof Quoter will generate tailored pricing based on
              current market rates and real contractor bids. No guesswork, no
              pressure, and no hidden fees. You'll get a clear, transparent
              quote that helps you plan your budget with confidence.
            </p>
          </div>

          {/* Process Section */}
          <div
            className="mt-16 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/images/map.png')" }}
          >
            <div className="text-center">
              <p className="text-lg text-gray-500">Never wonder what's next</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-800">
                Our process make it easy
              </h3>
            </div>

            <div className="mt-12 gap-y-12 grid md:grid-cols-5">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-400 text-white">
                  <ArrowIcon />
                </div>
                <h4 className="mt-6 text-xl font-semibold text-gray-800">
                  Compare Roofing Rates
                </h4>
                <p className="mt-2 text-gray-600">
                  Enter your address or fill out a quick form to instantly view
                  competitive roofing estimates from top-rated contractors—no
                  obligation required.
                </p>
              </div>

              {/* Connector Line - Desktop Only */}
              <div className="relative hidden md:block">
                <div className="absolute left-0 top-8 h-0.5 w-full border-t-2 border-dashed border-gray-300"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-400 text-white">
                  <HomeIcon />
                </div>
                <h4 className="mt-6 text-xl font-semibold text-gray-800">
                  Request Roof Inspection
                </h4>
                <p className="mt-2 text-gray-600">
                  For a more precise quote, schedule a visit from one of our
                  certified roofing partners. They'll assess your roof and
                  provide a detailed, customized estimate.
                </p>
              </div>

              {/* Connector Line - Desktop Only */}
              <div className="relative hidden md:block">
                <div className="absolute left-0 top-8 h-0.5 w-full border-t-2 border-dashed border-gray-300"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-400 text-white">
                  <RoundRightIcon />
                </div>
                <h4 className="mt-6 text-xl font-semibold text-gray-800">
                  Book Your Roofer
                </h4>
                <p className="mt-2 text-gray-600">
                  Choose the estimate that works best for you and schedule your
                  project with a trusted, pre-screened roofing professional.
                  Fast, reliable, and quality-focused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="px-5 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-700 md:text-5xl">
                Additional Roofing Costs to Know About
              </h2>
              <p className="text-gray-600 lg:text-lg">
                When comparing quotes on RoofQuoter, keep in mind that some
                roofing projects may include extra materials or repairs beyond
                just shingles. Here's what could affect your total roof
                replacement cost:
              </p>

              {/* Roof Decking */}
              <div className="space-y-2">
                <div className="flex gap-4 items-center">
                  <p className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_20px_4px_orange]"></p>

                  <h3 className="text-xl font-semibold text-gray-800">
                    Roof Decking
                  </h3>
                </div>
                <p className="text-gray-600 lg:text-lg">
                  Decking is the base layer your shingles are installed
                  on—usually made of plywood or oriented strand board. If
                  there's water damage or rot under your old roof, it may need
                  to be repaired or replaced.
                </p>
                <p className="text-gray-600 lg:text-lg">
                  Estimated cost: $2.20-$3.00 per sq. ft.
                </p>
              </div>

              {/* Roof Underlayment */}
              <div className="space-y-2">
                <div className="flex gap-4 items-center">
                  <p className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_20px_4px_orange]"></p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Roof Underlayment
                  </h3>
                </div>
                <p className="text-gray-600 lg:text-lg">
                  Underlayment acts as a waterproof barrier between your
                  shingles and roof decking. It's essential for protecting your
                  home from leaks and is required by building codes in many
                  areas. Most modern underlayments are made of synthetic felt.
                </p>
              </div>

              {/* Ice & Water Barrier */}
              <div className="space-y-2">
                <div className="flex gap-4 items-center">
                  <p className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_20px_4px_orange]"></p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Ice & Water Barrier
                  </h3>
                </div>
                <p className="text-gray-600 lg:text-lg">
                  This added protection is placed in high-risk areas like
                  valleys, edges, and ridges to prevent damage from snow and ice
                  buildup. It helps extend the life of your roof and adds an
                  extra line of defense against water infiltration.
                </p>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="relative flex items-center justify-center">
              <div className="grid grid-cols-1 gap-4">
                <Image
                  src="/assets/images/building.png"
                  alt="Roof details"
                  width={500}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="lg:space-y-18 space-y-12">
        <div id="testimonials">
          <Testimonials />
        </div>

        <BlogSection />
        <div id="contact">
          <CTASection />
        </div>
      </div>
    </div>
  );
}
