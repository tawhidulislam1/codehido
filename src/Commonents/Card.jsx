/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Card = ({ service }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(41, 116, 255, 0.3)" }}
            className="relative group bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center overflow-hidden cursor-pointer border-b-4 border-blue-600 hover:border-b-0">

            <div
                className="absolute inset-0 bg-blue-600 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out"
                style={{ transformOrigin: "bottom" }}
            ></div>

            <div className="relative z-10 flex flex-col items-center text-gray-900 group-hover:text-white transition-colors duration-500">

                <div className="p-4 rounded-full mb-4 bg-blue-100 group-hover:bg-white transition-colors duration-500">
                    <service.icon className="h-8 w-8 text-blue-600 group-hover:text-blue-600" />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                </h3>

                <p className="text-sm mb-4 flex-grow">
                    {service.description}
                </p>

                <a
                    href={service.link}
                    className="inline-block px-5 py-2 rounded-md font-medium text-blue-600 bg-white shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                    Read More →
                </a>

            </div>
        </motion.div>
    );
};

export default Card;
