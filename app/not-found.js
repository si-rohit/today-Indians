'use client';

import Image from 'next/image';
import Link from 'next/link';
import Error404 from '../public/images/404.png';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        {/* Left text content */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Oops…</h1>
          <h2 className="text-xl font-medium text-gray-700 mb-3">Looks like we crashed.</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            We were abducted by something abnormal. Don’t worry, we’ll get back on track!
            In the meantime, you can try going back home or explore some of our other out-of-this-world products.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-5 py-2 rounded hover:bg-[#222] transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Right image */}
        <div className="flex justify-center relative">
          <Image
            src={Error404}
            alt="404 UFO"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
          <h1 className="absolute text-[120px] font-bold text-gray-100 -z-10 right-0 top-1/2 -translate-y-1/2 hidden md:block">
            ERROR
          </h1>
        </div>
      </div>
    </div>
  );
}
