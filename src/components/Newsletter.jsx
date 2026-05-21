"use client";

import { useState } from "react";
import { MdEmail, MdSend } from "react-icons/md";
import { FaPaw, FaHeart, FaBell } from "react-icons/fa";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Subscribed successfully! 🐾");
    setEmail("");
    setLoading(false);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full -top-20 -right-20" />
          <div className="absolute w-48 h-48 bg-white opacity-5 rounded-full -bottom-16 -left-16" />
          <div className="absolute w-32 h-32 bg-white opacity-5 rounded-full top-10 right-40" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">

            {/* Left */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaBell size={18} className="text-white" />
                </div>
                <span className="text-orange-100 text-sm font-semibold uppercase tracking-widest">
                  Newsletter
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Stay Updated <br />
                <span className="text-orange-200">on New Pets!</span>
              </h2>

              <p className="text-orange-100 text-sm leading-relaxed mb-6 max-w-sm">
                Get notified when new pets are available for adoption in your area. Be the first to know!
              </p>

              {/* Features */}
              <div className="space-y-2">
                {[
                  "Weekly pet adoption updates",
                  "New arrival notifications",
                  "Adoption tips and stories",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-orange-100">
                    <FaPaw size={12} className="text-orange-200 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 w-full">
              <div className="bg-white rounded-2xl p-6 shadow-xl">

                <div className="flex items-center gap-2 mb-4">
                  <FaHeart size={16} className="text-orange-500" />
                  <h3 className="font-bold text-gray-900">Join Our Community</h3>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full border-2 px-4 py-3 rounded-xl text-sm outline-none focus:border-orange-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <MdEmail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full border-2 pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:border-orange-400 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
                  >
                    {loading ? (
                      "Subscribing..."
                    ) : (
                      <>
                        <MdSend size={18} />
                        Subscribe Now
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  No spam. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;