import { MdEmail } from "react-icons/md";

const Newsletter = () => {
  return (
    <section className="bg-cyan-600 text-white py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-3">
          <MdEmail size={40} className="text-cyan-200" />
        </div>
        <h2 className="text-4xl font-bold mb-2">Stay Updated</h2>
        <p className="text-cyan-100 mb-8">
          Get notified when new pets are available for adoption in your area.
        </p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-gray-800 outline-none"
          />
          <button className="bg-white text-cyan-600 font-bold px-6 py-3 hover:bg-cyan-50 transition cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;