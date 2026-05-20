import Link from "next/link";
import Image from "next/image";
import { MdPets } from "react-icons/md";

const Banner = () => {
  return (
    <div className="bg-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-8 relative min-h-[500px]">

        {/* Left Content */}
        <div className="flex-1 z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-500 font-medium mb-5">
            <MdPets size={16} />
            Adopt · Love · Care
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Find Your New <br />
            <span className="text-orange-500">Best Friend</span>
          </h1>

          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Thousands of adorable pets are waiting for a loving home. Adopt today and change two lives.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="/all-pets">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-lg transition cursor-pointer">
                <MdPets size={18} />
                Adopt Now
              </button>
            </Link>
            <Link href="/all-pets">
              <button className="border-2 border-gray-200 text-gray-700 font-semibold px-7 py-3 rounded-lg hover:border-orange-300 transition cursor-pointer">
                View All Pets
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 flex-wrap">
            <div>
              <p className="text-2xl font-bold text-gray-800">500+</p>
              <p className="text-sm text-gray-500">Pets Available</p>
            </div>
            <div className="border-l border-gray-200 pl-8">
              <p className="text-2xl font-bold text-gray-800">1200+</p>
              <p className="text-sm text-gray-500">Happy Adoptions</p>
            </div>
            <div className="border-l border-gray-200 pl-8">
              <p className="text-2xl font-bold text-gray-800">Trusted</p>
              <p className="text-sm text-gray-500">Verified Owners</p>
            </div>
            <div className="border-l border-gray-200 pl-8">
              <p className="text-2xl font-bold text-gray-800">24/7</p>
              <p className="text-sm text-gray-500">Support</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="relative w-full max-w-lg h-[400px]">
            <Image
              src="/hero-banner-pets.png"
              alt="Hero pets"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;