import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { FaDog, FaCat, FaDove } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";

const speciesIcon = {
  Dog: <FaDog size={12} />,
  Cat: <FaCat size={12} />,
  Bird: <FaDove size={12} />,
  Rabbit: <GiRabbit size={12} />,
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
      <div className="text-center mb-10">
        <p className="text-cyan-600 uppercase tracking-widest text-sm font-medium">
          Ready for adoption
        </p>
        <h2 className="text-4xl font-bold mt-1">Featured Pets</h2>
        <p className="text-gray-500 mt-2">
          These adorable animals are looking for a loving home
        </p>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p>No pets available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition group"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  {speciesIcon[pet.species]} {pet.species}
                </span>
                {pet.status === "adopted" && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Adopted
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{pet.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {pet.breed} • {pet.age}
                    </p>
                  </div>
                  <p className="text-cyan-600 font-bold text-lg">
                    ${pet.adoptionFee}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-sm mt-2">
                  <LuMapPin size={13} /> {pet.location}
                </div>

                <Link href={`/all-pets/${pet._id}`}>
                  <button className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 text-sm font-semibold transition cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link href="/all-pets">
          <button className="border-2 border-cyan-500 text-cyan-600 px-8 py-3 font-semibold hover:bg-cyan-50 transition cursor-pointer">
            View All Pets
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPets;