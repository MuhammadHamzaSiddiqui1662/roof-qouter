import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Reason Why Roofing are factmake Easier.",
    date: "November 4, 2020",
    image: "/assets/images/blog1.png",
    slug: "roofing-reasons-1",
  },
  {
    id: 2,
    title: "10 Reason Why Roofing are factmake Easier.",
    date: "November 4, 2020",
    image: "/assets/images/blog2.png",
    slug: "roofing-reasons-2",
  },
  {
    id: 3,
    title: "10 Reason Why Roofing are factmake Easier.",
    date: "November 4, 2020",
    image: "/assets/images/blog3.png",
    slug: "roofing-reasons-3",
  },
];

export function BlogSection() {
  return (
    <section>
      <div className="container mx-auto px-5 lg:px-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            WHAT&apos;S NEW
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Our latest news & Blog
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col overflow-hidden rounded-lg"
            >
              {/* Blog Image */}
              <div className="relative h-48 w-full overflow-hidden md:h-64">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Blog Content */}
              <div className="flex flex-grow flex-col pt-4">
                <p className="text-sm text-gray-500">{post.date}</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <div className="mt-auto pt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center w-40 h-11 rounded-full justify-center bg-orange-400 text-white transition duration-700 delay-150 ease-in-out hover:bg-orange-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
