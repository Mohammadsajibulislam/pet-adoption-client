import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { FaDog, FaCat, FaDove } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const speciesIcon = {
  Dog: <FaDog size={11} />,
  Cat: <FaCat size={11} />,
  Bird: <FaDove size={11} />,
  Rabbit: <GiRabbit size={11} />,
};

const FeaturedPets = async () => {
  let pets = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/featured`,
      { cache: "no-store" }
    );
    pets = await res.json();
  } catch (error) {
    console.error("Failed to fetch featured pets:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold uppercase tracking-widest mb-1">
            <MdPets size={16} />
            Featured Pets
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Meet Some Of Our Pets
          </h2>
        </div>
        <Link href="/all-pets">
          <button className="hidden md:flex items-center gap-1 border border-orange-200 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer">
            View All Pets →
          </button>
        </Link>
      </div>

      {/* Pets Grid */}
      {pets.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <MdPets size={48} className="mx-auto mb-3 text-gray-200" />
          <p className="font-semibold">No pets available yet</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="border rounded-2xl overflow-hidden hover:shadow-lg transition group bg-white"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-44">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Species Badge */}
                <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  {speciesIcon[pet.species]} {pet.species}
                </span>
                {/* Heart Button */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-red-400 transition cursor-pointer">
                  <FaRegHeart size={14} className="text-gray-400" />
                </button>
                {/* Adopted Badge */}
                {pet.status === "adopted" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Adopted
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-bold text-gray-900 text-base">{pet.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                  <LuMapPin size={11} /> {pet.location}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-orange-500 font-bold text-sm">
                    ${pet.adoptionFee}
                  </p>
                  <Link href={`/all-pets/${pet._id}`}>
                    <button className="text-xs text-orange-500 font-semibold hover:underline cursor-pointer">
                      View →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          { icon: <MdPets size={28} className="text-orange-400" />, value: "500+", label: "Pets Available" },
          { icon: <FaDog size={24} className="text-orange-400" />, value: "1200+", label: "Happy Adoptions" },
          { icon: <FaCat size={24} className="text-orange-400" />, value: "Trusted", label: "Verified Owners" },
          { icon: <FaDove size={24} className="text-orange-400" />, value: "24/7", label: "Support" },
        ].map((stat, i) => (
          <div key={i} className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center gap-4">
            {stat.icon}
            <div>
              <p className="font-bold text-gray-900 text-xl">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="text-center mt-8 md:hidden">
        <Link href="/all-pets">
          <button className="border-2 border-orange-400 text-orange-500 px-8 py-3 font-semibold rounded-lg hover:bg-orange-50 transition cursor-pointer">
            View All Pets
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPets;