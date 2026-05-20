import { MdPets } from "react-icons/md";
import { FaBone, FaPersonRunning, FaSyringe, FaShower } from "react-icons/fa6";

const tips = [
  {
    icon: <FaBone size={24} className="text-orange-500" />,
    title: "Balanced Diet",
    desc: "Feed your pet species-appropriate food. Avoid human junk food.",
    bg: "bg-orange-50",
  },
  {
    icon: <FaPersonRunning size={24} className="text-blue-500" />,
    title: "Daily Exercise",
    desc: "Regular walks and playtime keep pets healthy and happy.",
    bg: "bg-blue-50",
  },
  {
    icon: <FaSyringe size={24} className="text-green-500" />,
    title: "Vet Checkups",
    desc: "Annual vet visits catch problems early. Keep vaccines up to date.",
    bg: "bg-green-50",
  },
  {
    icon: <FaShower size={24} className="text-purple-500" />,
    title: "Grooming",
    desc: "Regular baths and brushing prevent skin issues and strengthen bonds.",
    bg: "bg-purple-50",
  },
];

const PetCareTips = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">
            <MdPets size={16} />
            Be a great owner
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900">Pet Care Tips</h2>
          <p className="text-gray-500 mt-2">
            Keep your pet happy and healthy with these simple tips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border hover:shadow-md transition text-center"
            >
              <div className={`w-14 h-14 ${t.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                {t.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.title}</h3>
              <p className="text-gray-500 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;