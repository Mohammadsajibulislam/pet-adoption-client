import { FaBone, FaPersonRunning, FaSyringe, FaShower } from "react-icons/fa6";

const tips = [
  {
    icon: <FaBone size={28} className="text-orange-400" />,
    title: "Balanced Diet",
    desc: "Feed your pet species-appropriate food. Avoid human junk food.",
  },
  {
    icon: <FaPersonRunning size={28} className="text-green-500" />,
    title: "Daily Exercise",
    desc: "Regular walks and playtime keep pets healthy and happy.",
  },
  {
    icon: <FaSyringe size={28} className="text-blue-500" />,
    title: "Vet Checkups",
    desc: "Annual vet visits catch problems early and keep vaccines up to date.",
  },
  {
    icon: <FaShower size={28} className="text-cyan-500" />,
    title: "Grooming",
    desc: "Regular baths and brushing prevent skin issues and strengthen your bond.",
  },
];

const PetCareTips = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-cyan-600 uppercase tracking-widest text-sm font-medium">
            Be a great owner
          </p>
          <h2 className="text-4xl font-bold mt-1">Pet Care Tips</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border text-center hover:shadow-md transition"
            >
              <div className="mb-3 flex justify-center">{t.icon}</div>
              <h3 className="font-bold mb-1">{t.title}</h3>
              <p className="text-gray-500 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;