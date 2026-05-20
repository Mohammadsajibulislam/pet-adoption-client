import Link from "next/link";
import { MdPets } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <MdPets size={80} className="text-cyan-200 mb-4" />

      <h1 className="text-8xl font-bold text-cyan-500">404</h1>
      <h2 className="text-3xl font-bold mt-3 mb-2">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Oops! Looks like this page ran away like a cat. The page you are
        looking for does not exist or has been moved.
      </p>

      <Link href="/">
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 transition cursor-pointer">
          <FaHome size={16} />
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;