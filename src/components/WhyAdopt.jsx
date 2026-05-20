import { MdPets } from "react-icons/md";
import { FaHeart, FaHandshake } from "react-icons/fa";
import { FaSyringe, FaEarthAmericas } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";

const reasons = [
  {
    icon: <FaHeart size={22} className="text-orange-500" />,
    title: "Save a Life",
    desc: "You give a homeless pet a second chance at life.",
  },
  {
    icon: <MdPets size={22} className="text-orange-500" />,
    title: "Loyal Companion",
    desc: "Pets bring unconditional love and loyalty.",
  },
  {
    icon: <GiHealthNormal size={22} className="text-orange-500" />,
    title: "Better Health",
    desc: "Pets reduce stress and improve overall well-being.",
  },
  {
    icon: <BsCashCoin size={22} className="text-orange-500" />,
    title: "Affordable Fees",
    desc: "Adoption is much cheaper than buying from a breeder.",
  },
  {
    icon: <FaSyringe size={22} className="text-orange-500" />,
    title: "Health Checked",
    desc: "All pets are vaccinated and health-checked before adoption.",
  },
  {
    icon: <FaHandshake size={22} className="text-orange-500" />,
    title: "Ongoing Support",
    desc: "Our team is always here to help you after adoption.",
  },
];

const WhyAdopt = () => {
  return (
    <section className="bg-orange-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Left */}
          <div className="md:w-80 flex-shrink-0">
            <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">
              <MdPets size={16} />
              Why Adopt Pets
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Give Love, <br /> Get Love
            </h2>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              Adopting a pet is one of the most rewarding decisions you can make.
              You save a life, and in return, you gain a loyal companion.
            </p>
          </div>

          {/* Right Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-orange-100 hover:shadow-md transition"
              >
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
                  {r.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
                <p className="text-gray-500 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;