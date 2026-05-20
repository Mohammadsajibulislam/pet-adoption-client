import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <AiOutlineLoading3Quarters
        size={48}
        className="text-cyan-500 animate-spin"
      />
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  );
};

export default Loading;