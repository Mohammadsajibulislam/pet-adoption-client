import { FaUserCircle, FaQuoteLeft } from "react-icons/fa";

const stories = [
  {
    name: "Sarah & Max",
    text: "Max was shy at first, but now he is the heart of our family. Best decision we ever made!",
    pet: "Golden Retriever",
  },
  {
    name: "James & Luna",
    text: "Luna cuddles with us every night. She filled a void we did not even know we had.",
    pet: "Siamese Cat",
  },
  {
    name: "Priya & Tweety",
    text: "Tweety chirps every morning and our home feels so alive now. Thank you PawsHome!",
    pet: "Parakeet",
  },
];

const SuccessStories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-cyan-600 uppercase tracking-widest text-sm font-medium">
          Happy families
        </p>
        <h2 className="text-4xl font-bold mt-1">Success Stories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((s, i) => (
          <div key={i} className="border rounded-xl p-6 hover:shadow-md transition">
            <FaQuoteLeft size={20} className="text-cyan-300 mb-3" />
            <p className="text-gray-600 italic mb-4">{s.text}</p>
            <div className="flex items-center gap-3">
              <FaUserCircle size={36} className="text-gray-300" />
              <div>
                <p className="font-bold">{s.name}</p>
                <p className="text-sm text-cyan-600">Adopted a {s.pet}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;