import Image from "next/image"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/cta-bg.png"
          alt="Modern living room"
          fill
          className="object-cover brightness-50 "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center text-white md:py-24">
        <h2 className="max-w-3xl text-2xl font-semibold md:text-3xl">
          Learn more about our quoting process and what&apos;s covered in your roofing estimate.
        </h2>
        <Link
          href="#"
          className="mt-8 rounded-full bg-orange-400 px-8 py-3 font-medium text-white transition-colors hover:bg-orange-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  )
}
