import { NextPage } from "next";
import { FaTools, FaClock, FaHardHat } from "react-icons/fa";

const Maintenance: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-700 mt-5">
      <div className="text-center">
        <FaTools className="text-8xl text-blue-500 animate-spin mb-4" />
        <h1 className="text-4xl font-bold">🚧 Site Under Maintenance 🚧</h1>
        <p className="text-lg mt-2">We're making some improvements. Please check back soon.</p>

        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <FaClock className="text-4xl text-yellow-500" />
            <p className="mt-2 text-sm">Expected Downtime: 1 hours</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHardHat className="text-4xl text-red-500" />
            <p className="mt-2 text-sm">Working Hard to Improve</p>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">Thank you for your patience! 🙏</p>
      </div>
    </div>
  );
};

export default Maintenance;
