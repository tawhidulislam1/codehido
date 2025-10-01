import React from 'react';
import { Link } from "react-router-dom";

const NotfoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4 text-center">
            {/* Big 404 Text */}
            <h1 className="text-9xl font-extrabold text-[#2974FF] drop-shadow-lg">404</h1>

            {/* Heading */}
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">
                Oops! Page Not Found
            </h2>

            {/* Message */}
            <p className="mt-2 text-gray-500 max-w-md">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            {/* Home Button */}
            <Link
                to="/"
                className="mt-6 inline-block bg-[#2974FF] hover:bg-[#1558D6] text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
                Back to Home
            </Link>

            {/* Decorative Image (Optional) */}
            <img
                src="https://illustrations.popsy.co/white/resistance-error.svg"
                alt="Not Found Illustration"
                className="mt-10 w-80 max-w-full"
            />
        </div>
    );
};

export default NotfoundPage;