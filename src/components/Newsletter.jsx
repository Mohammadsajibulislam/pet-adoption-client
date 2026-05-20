import { MdEmail } from "react-icons/md";
import { MdPets } from "react-icons/md";

const Newsletter = () => {
  return (
    <section className="bg-orange-500 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center text-white">

        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MdEmail size={32} className="text-white" />
        </div>

        <h2 className="text-4xl font-extrabold mb-2">Stay Updated</h2>
        <p className="text-orange-100 mb-8 text-lg">
          Get notified when new pets are available for adoption in your area.
        </p>

        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 outline-none text-sm"
          />
          <button className="bg-white text-orange-500 font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition cursor-pointer text-sm whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p className="text-orange-200 text-xs mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;