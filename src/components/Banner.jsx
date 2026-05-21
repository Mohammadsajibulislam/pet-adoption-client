import Link from "next/link";
import Image from "next/image";
import { MdPets } from "react-icons/md";
import { FaHeart, FaShieldAlt, FaUsers } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative min-h-[520px]">

        {/* Left Content */}
        <div className="flex-1 z-10 max-w-xl">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-500 font-medium mb-6 shadow-sm">
            <FaHeart size={12} className="text-red-400" />
            Their love is unconditional. Adopt today!
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Find Your New <br />
            <span className="text-orange-500">Best Friend</span>
          </h1>

          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Thousands of adorable pets are waiting for a loving home.
            Adopt a pet and make a difference in their life.
          </p>

          <div className="flex gap-4 flex-wrap mb-10">
            <Link href="/all-pets">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition cursor-pointer shadow-lg shadow-orange-200">
                <MdPets size={20} />
                Adopt Now
              </button>
            </Link>
            <Link href="/all-pets">
              <button className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:border-orange-300 hover:text-orange-500 transition cursor-pointer">
                <MdPets size={18} />
                View All Pets
              </button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaShieldAlt size={14} className="text-green-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Safe & Trusted</p>
                <p className="text-xs text-gray-400">Verified owners</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <FaHeart size={14} className="text-pink-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">12K+</p>
                <p className="text-xs text-gray-400">Successful Adoptions</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FaUsers size={14} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Happy Community</p>
                <p className="text-xs text-gray-400">Join pet lovers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Image with floating card */}
        <div className="flex-1 flex justify-center md:justify-end relative">

          {/* Decorative blob */}
          <div className="absolute w-96 h-96 bg-orange-200 rounded-full opacity-30 top-0 right-0 -z-0" />

          {/* Pet Image */}
          <div className="relative z-10 w-full max-w-md h-[420px]">
            <div className="absolute inset-0 bg-orange-100 rounded-[40px] overflow-hidden">
              <Image
                src="/hero-banner-pets6.png"
                alt="Hero pets"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 z-20 border">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <MdPets size={22} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Every Adoption</p>
                <p className="text-xs text-gray-500">Saves a Life <span className="text-red-400">♥</span></p>
                <p className="text-xs text-orange-500 font-semibold">Be a hero today!</p>
              </div>
            </div>

            {/* Decorative lines */}
            <div className="absolute -top-4 -right-4 z-20">
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