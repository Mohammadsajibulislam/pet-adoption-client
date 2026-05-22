import Link from "next/link";
import Image from "next/image";
import { MdPets } from "react-icons/md";
import { FaHeart, FaShieldAlt, FaUsers } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative">

        {/* Left Content */}
        <div className="flex-1 z-10 w-full">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-500 font-medium mb-4 shadow-sm">
            <FaHeart size={12} className="text-red-400" />
            Their love is unconditional. Adopt today!
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-3">
            Find Your New <br />
            <span className="text-orange-500">Best Friend</span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg mb-6 max-w-md">
            Thousands of adorable pets are waiting for a loving home.
            Adopt a pet and make a difference in their life.
          </p>

          <div className="flex gap-3 flex-wrap mb-8">
            <Link href="/all-pets">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition cursor-pointer shadow-lg shadow-orange-200 text-sm md:text-base">
                <MdPets size={18} />
                Adopt Now
              </button>
            </Link>
            <Link href="/all-pets">
              <button className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-orange-300 hover:text-orange-500 transition cursor-pointer text-sm md:text-base">
                <MdPets size={16} />
                View All Pets
              </button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border">
              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaShieldAlt size={12} className="text-green-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">Safe & Trusted</p>
                <p className="text-xs text-gray-400">Verified owners</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border">
              <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaHeart size={12} className="text-pink-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">12K+</p>
                <p className="text-xs text-gray-400">Successful Adoptions</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border">
              <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUsers size={12} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">Happy Community</p>
                <p className="text-xs text-gray-400">Join pet lovers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Image */}
        <div className="flex-1 flex justify-center md:justify-end relative w-full">

          {/* Decorative blob — hidden on mobile */}
          <div className="absolute w-72 h-72 bg-orange-200 rounded-full opacity-30 top-0 right-0 -z-0 hidden md:block" />

          {/* Pet Image */}
          <div className="relative z-10 w-full max-w-xs md:max-w-md">
            <div className="relative h-56 md:h-96 bg-orange-100 rounded-[32px] overflow-hidden">
              <Image
                src="/hero-banner-pets.png"
                alt="Hero pets"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Floating card — hidden on small mobile */}
            <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 z-20 border hidden sm:flex">
              <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MdPets size={18} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">Every Adoption</p>
                <p className="text-xs text-gray-500">Saves a Life <span className="text-red-400">♥</span></p>
                <p className="text-xs text-orange-500 font-semibold">Be a hero today!</p>
              </div>
            </div>

            {/* Decorative lines — hidden on mobile */}
            <div className="absolute -top-4 -right-4 z-20 hidden md:block">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M10 30 Q30 10 50 30" stroke="#F97316" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                <path d="M10 40 Q30 20 50 40" stroke="#F97316" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;