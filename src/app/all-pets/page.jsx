"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { FaDog, FaCat, FaDove, FaPaw } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { MdPets, MdFilterList } from "react-icons/md";
import { FaRegHeart, FaRegCalendar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";

const speciesIcon = {
  Dog: <FaDog size={11} />,
  Cat: <FaCat size={11} />,
  Bird: <FaDove size={11} />,
  Rabbit: <GiRabbit size={11} />,
};

const speciesList = ["all", "Dog", "Cat", "Bird", "Rabbit", "Others"];

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");

  const fetchPets = useCallback(async (searchTerm = "", speciesFilter = "all") => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?`;
      if (searchTerm) url += `search=${searchTerm}&`;
      if (speciesFilter !== "all") url += `species=${speciesFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets(search, species);
  }, [species]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPets(search, species);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSpecies("all");
    fetchPets("", "all");
  };

  return (
    <div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-50 via-orange-50 to-orange-100 border-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-between relative">

          <div className="absolute w-80 h-80 bg-orange-300 rounded-full opacity-10 -right-20 -top-20" />
          <div className="absolute w-48 h-48 bg-orange-400 rounded-full opacity-10 right-40 bottom-0" />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-3 py-1 text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">
              <FaPaw size={12} />
              Find your companion
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
              All <span className="text-orange-500">Pets</span>
            </h1>
            <p className="text-gray-500 text-base max-w-md">
              Find your perfect companion from our adorable pets ready for adoption.
            </p>

            <div className="flex gap-4 mt-5 flex-wrap">
              <div className="bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-orange-100 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MdPets size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{pets.length}+ Pets</p>
                  <p className="text-xs text-gray-400">Available now</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-orange-100 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaPaw size={14} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">5 Species</p>
                  <p className="text-xs text-gray-400">Dog, Cat & more</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="hidden md:block relative w-72 h-57 flex-shrink-0">
            <Image
              src="/all-pets-banner1.png"
              alt="All Pets"
              fill
              className="object-contain object-right drop-shadow-xl"
            />
          </div> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
                className="w-full border-2 pl-10 pr-4 py-2.5 outline-none focus:border-orange-400 rounded-xl text-sm transition"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 text-sm font-bold transition cursor-pointer rounded-xl shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Species Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <MdFilterList size={20} className="text-gray-400" />
            {speciesList.map((s) => (
              <button
                key={s}
                onClick={() => setSpecies(s)}
                className={`px-4 py-2 text-xs font-bold rounded-full border-2 transition cursor-pointer capitalize ${
                  species === s
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"
                }`}
              >
                {s === "all" ? "All Species" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-20 gap-3">
            <AiOutlineLoading3Quarters
              size={36}
              className="text-orange-500 animate-spin"
            />
            <p className="text-gray-400 text-sm">Finding pets for you...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && pets.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdPets size={40} className="text-orange-200" />
            </div>
            <p className="text-xl font-bold text-gray-700">No pets found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try a different search or filter
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 border-2 border-orange-400 text-orange-500 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-orange-50 transition cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pets Grid */}
        {!loading && pets.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-4">
              Showing{" "}
              <span className="font-bold text-gray-900">{pets.length}</span>{" "}
              pets
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  className="border-2 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition group bg-white"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute bottom-2 left-2 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      {speciesIcon[pet.species]} {pet.species}
                    </span>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-400 transition cursor-pointer">
                      <FaRegHeart size={14} className="text-gray-400" />
                    </button>
                    {pet.status === "adopted" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          Adopted
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-extrabold text-gray-900 text-lg">
                      {pet.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">{pet.breed}</p>

                    <div className="flex items-center gap-3 text-gray-400 text-xs mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <FaRegCalendar size={11} /> {pet.age}
                      </span>
                      <span className="flex items-center gap-1">
                        <BsGenderAmbiguous size={12} /> {pet.gender}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuMapPin size={11} /> {pet.location}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <p className="text-orange-500 font-extrabold text-lg">
                        ${pet.adoptionFee}
                      </p>
                      <Link href={`/all-pets/${pet._id}`}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;