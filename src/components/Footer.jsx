const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">🐾 PawsHome</h1>
          <p className="mt-2 max-w-md">
            Find your perfect companion. Every pet deserves a loving home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white mb-3 font-semibold">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">All Pets</li>
              <li className="hover:text-white cursor-pointer">My Requests</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-3 font-semibold">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-3 font-semibold">CONTACT US</h3>
            <ul className="space-y-2 text-sm">
              <li>info@pawshome.com</li>
              <li>+1 800 PAWSHOME</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex justify-between items-center text-sm">
          <p>© 2026 PawsHome. All rights reserved.</p>
          <div className="flex gap-4 text-white">
            <span className="cursor-pointer">X</span>
            <span className="cursor-pointer">in</span>
            <span className="cursor-pointer">◎</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;