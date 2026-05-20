import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
import { MdPets } from "react-icons/md";

const stories = [
  {
    name: "Sarah & Max",
    text: "Max was shy at first, but now he is the heart of our family. Best decision we ever made!",
    pet: "Golden Retriever",
    rating: 5,
  },
  {
    name: "James & Luna",
    text: "Luna cuddles with us every night. She filled a void we did not even know we had.",
    pet: "Siamese Cat",
    rating: 5,
  },
  {
    name: "Priya & Tweety",
    text: "Tweety chirps every morning and our home feels so alive now. Thank you PawNest!",
    pet: "Parakeet",
    rating: 5,
  },
];

const SuccessStories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">
          <MdPets size={16} />
          Happy Families
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900">Success Stories</h2>
        <p className="text-gray-500 mt-2">
          Real families, real happiness. See how adoption changed their lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((s, i) => (
          <div
            key={i}
            className="border rounded-2xl p-6 hover:shadow-md transition bg-white"
          >
            <FaQuoteLeft size={24} className="text-orange-200 mb-3" />

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {Array(s.rating).fill(0).map((_, j) => (
                <FaStar key={j} size={14} className="text-orange-400" />
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {s.text}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t">
              <FaUserCircle size={40} className="text-orange-200" />
              <div>
                <p className="font-bold text-gray-900">{s.name}</p>
                <p className="text-xs text-orange-500">Adopted a {s.pet}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;