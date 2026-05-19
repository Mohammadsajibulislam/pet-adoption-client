import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="relative text-white flex flex-col justify-center items-center text-center gap-6 h-[600px]"
      style={{
        background: "linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #164e63 100%)",
      }}
    >
      <div className="relative z-10 max-w-3xl px-4">
        <p className="text-cyan-200 uppercase tracking-widest text-sm mb-3">
          Find Your Perfect Companion
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Give a Pet <br /> a Forever Home
        </h1>
        <p className="text-lg text-cyan-100 mb-8 max-w-xl mx-auto">
          Thousands of loving animals are waiting for a family just like yours.
          Browse, connect, and adopt today.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/all-pets">
            <button className="bg-white text-cyan-700 font-semibold px-8 py-3 uppercase tracking-wide hover:bg-cyan-50 transition cursor-pointer">
              Adopt Now
            </button>
          </Link>
          <Link href="/all-pets">
            <button className="border border-white text-white px-8 py-3 uppercase tracking-wide hover:bg-white/10 transition cursor-pointer">
              Browse Pets
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold">2,400+</p>
            <p className="text-xs text-cyan-200 uppercase tracking-wide">Pets Adopted</p>
          </div>
          <div className="border-l border-white/30 px-8">
            <p className="text-2xl font-bold">150+</p>
            <p className="text-xs text-cyan-200 uppercase tracking-wide">Shelters</p>
          </div>
          <div className="border-l border-white/30 px-8">
            <p className="text-2xl font-bold">98%</p>
            <p className="text-xs text-cyan-200 uppercase tracking-wide">Happy Families</p>
          </div>
          <div className="border-l border-white/30 px-8">
            <p className="text-2xl font-bold">5 Species</p>
            <p className="text-xs text-cyan-200 uppercase tracking-wide">Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;