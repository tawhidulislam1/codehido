import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        role: "CEO, TechCorp",
        image: "https://i.pravatar.cc/100?img=3",
        message:
            "Working with CodeHido was a fantastic experience. They delivered a modern, responsive product on time and exceeded expectations.",
        rating: 5,
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Marketing Manager, Brandify",
        image: "https://i.pravatar.cc/100?img=5",
        message:
            "The team is highly professional and attentive to details. Our project went smoothly, and the results were beyond impressive!",
        rating: 4,
    },
    {
        id: 3,
        name: "Michael Smith",
        role: "Product Owner, FinTechX",
        image: "https://i.pravatar.cc/100?img=7",
        message:
            "Their support and communication throughout the development were excellent. I highly recommend them to anyone!",
        rating: 5,
    },
];

const Testimonial = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
                <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                    Our clients love our work. Here’s what they have to say about our services.
                </p>
            </div>

            {/* Testimonial Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={t.image}
                            alt={t.name}
                            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#2974FF]"
                        />
                        <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                        <p className="text-sm text-gray-500">{t.role}</p>

                        {/* Rating */}
                        <div className="flex justify-center mt-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`h-5 w-5 ${i < t.rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Message */}
                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                            “{t.message}”
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
