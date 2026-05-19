"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { FaDog, FaCat, FaDove } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const speciesIcon = {
  Dog: <FaDog size={12} />,
  Cat: <FaCat size={12} />,
  Bird: <FaDove size={12} />,
  Rabbit: <GiRabbit size={12} />,
};

const speciesList = ["all", "Dog", "Cat", "Bird", "Rabbit", "Others"];

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");

  const fetchPets = async () => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?`;
      if (search) url += `search=${search}&`;
      if (species !== "all") url += `species=${species}`;

      const res = await fetch(url);
      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [species]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPets();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-cyan-600 uppercase tracking-widest text-sm font-medium">
          Find your companion
        </p>
        <h1 className="text-4xl font-bold mt-1">All Pets</h1>
        <p className="text-gray-500 mt-2">
          Browse all available pets ready for adoption
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pets by name..."
              className="w-full border pl-10 pr-4 py-2.5 outline-none focus:border-cyan-500 rounded-lg text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 text-sm font-semibold transition cursor-pointer rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Filter by species */}
        <div className="flex items-center gap-2 flex-wrap">
          <MdFilterList size={20} className="text-gray-400" />
          {speciesList.map((s) => (
            <button
              key={s}
              onClick={() => setSpecies(s)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition cursor-pointer capitalize ${
                species === s
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-cyan-400"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <AiOutlineLoading3Quarters
            size={36}
            className="text-cyan-500 animate-spin"
          />
        </div>
      )}

      {/* Pets Grid */}
      {!loading && pets.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-semibold">No pets found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
        </div>
      )}

      {!loading && pets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default AllPetsPage;