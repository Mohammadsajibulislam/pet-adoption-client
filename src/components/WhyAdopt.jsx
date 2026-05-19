import {
  FaHeart,
  FaHome,
  FaDollarSign,
  FaHandshake,
} from "react-icons/fa";
import { FaSyringe, FaEarthAmericas } from "react-icons/fa6";

const reasons = [
  {
    icon: <FaHeart size={28} className="text-red-400" />,
    title: "Save a Life",
    desc: "Every adoption gives a pet a second chance at a happy life.",
  },
  {
    icon: <FaHome size={28} className="text-cyan-500" />,
    title: "Find Companionship",
    desc: "Pets bring joy, love, and reduce stress and loneliness.",
  },
  {
    icon: <FaDollarSign size={28} className="text-green-500" />,
    title: "Affordable Fees",
    desc: "Adoption is much cheaper than buying from a breeder.",
  },
  {
    icon: <FaSyringe size={28} className="text-blue-500" />,
    title: "Health Checked",
    desc: "All pets are vaccinated and health-checked before adoption.",
  },
  {
    icon: <FaHandshake size={28} className="text-purple-500" />,
    title: "Ongoing Support",
    desc: "Our team is always here to help you after adoption.",
  },
  {
    icon: <FaEarthAmericas size={28} className="text-orange-400" />,
    title: "Make an Impact",
    desc: "Reduce the number of homeless animals in your community.",
  },
];

const WhyAdopt = () => {
  return (
    <section className="bg-cyan-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-cyan-600 uppercase tracking-widest text-sm font-medium">
            Reasons to adopt
          </p>
          <h2 className="text-4xl font-bold mt-1">Why Adopt a Pet?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border hover:shadow-md transition"
            >
              <div className="mb-3">{r.icon}</div>
              <h3 className="font-bold text-lg mb-1">{r.title}</h3>
              <p className="text-gray-500 text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;