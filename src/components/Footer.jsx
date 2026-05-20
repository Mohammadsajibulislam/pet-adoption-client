import Link from "next/link";
import Image from "next/image";
import { MdPets, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image
                src="/pawnest-logo-icon.png"
                alt="PawNest"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">
                <span className="text-gray-800">Paw</span>
                <span className="text-orange-500">Nest</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Find Love. Adopt. Repeat.
            </p>
            <p className="text-gray-400 text-sm max-w-xs">
              We connect loving people with pets in need of a forever home. Adopt a pet, change a life.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-orange-100 hover:text-orange-500 rounded-lg flex items-center justify-center text-gray-500 transition">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-orange-100 hover:text-orange-500 rounded-lg flex items-center justify-center text-gray-500 transition">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-orange-100 hover:text-orange-500 rounded-lg flex items-center justify-center text-gray-500 transition">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 hover:bg-orange-100 hover:text-orange-500 rounded-lg flex items-center justify-center text-gray-500 transition">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {[
                { href: "/", label: "Home" },
                { href: "/all-pets", label: "All Pets" },
                { href: "/my-requests", label: "My Requests" },
                { href: "/dashboard/add-pet", label: "Add Pet" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-500 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {["How to Adopt", "Pet Care Tips", "FAQs", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-500 transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-500 mb-6">
              <li className="flex items-center gap-2">
                <MdPhone className="text-orange-400 flex-shrink-0" size={16} />
                +880 1234-567890
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-orange-400 flex-shrink-0" size={16} />
                support@pawnest.com
              </li>
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-orange-400 flex-shrink-0" size={16} />
                Dhaka, Bangladesh
              </li>
            </ul>

            <h3 className="font-bold text-gray-800 mb-3">Subscribe</h3>
            <p className="text-xs text-gray-400 mb-2">Get updates on new pets and adoption stories.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border px-3 py-2 text-xs rounded-lg outline-none focus:border-orange-400"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p>© 2026 PawNest. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;