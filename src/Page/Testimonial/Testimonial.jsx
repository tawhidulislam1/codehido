import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Testimonial = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [form, setForm] = useState({ rating: 5, message: "" });
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { data: testimonials = [], isLoading, isError } = useQuery({
        queryKey: ["reviews-public"],
        queryFn: async () => {
            const res = await axiosPublic.get("/review");
            return res.data;
        },
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return;

        try {
            await axiosSecure.post("/review", {
                name: user.displayName || "Anonymous",
                photo: user.photoURL || "",
                rating: Number(form.rating),
                message: form.message,
            });

            setForm({ rating: 5, message: "" });
            setSubmitSuccess(true);
            Swal.fire({
                title: "Review submitted!",
                text: "Your review is pending admin approval and will only appear after approval.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Review submit error:", error);
            Swal.fire({
                title: "Error",
                text: error?.response?.data?.message || error.message,
                icon: "error",
            });
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-[#2974FF]">Loading testimonials...</div>;
    }

    if (isError) {
        return <div className="text-center py-20 text-red-500">Failed to load testimonials.</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
                <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                    Our clients love our work. Here’s what they have to say about our services.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                    <div
                        key={t._id || t.id}
                        className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={t.photo || "https://i.pravatar.cc/100?img=8"}
                            alt={t.name || "Reviewer"}
                            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#2974FF]"
                        />
                        <h3 className="text-xl font-semibold text-gray-900">{t.name || "Anonymous"}</h3>
                        <p className="text-sm text-gray-500">{t.role || "Client"}</p>

                        <div className="flex justify-center mt-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`h-5 w-5 ${i < (Number(t.rating) || 0) ? "text-yellow-400" : "text-gray-300"}`}
                                />
                            ))}
                        </div>

                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">“{t.message}”</p>
                    </div>
                ))}
            </div>

            <div className="max-w-2xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8">
                {user ? (
                    <>
                        <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Write a Review</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[#334155] mb-2">Rating</label>
                                <select
                                    name="rating"
                                    value={form.rating}
                                    onChange={handleChange}
                                    className="w-full border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
                                >
                                    <option value={5}>5 - Excellent</option>
                                    <option value={4}>4 - Very Good</option>
                                    <option value={3}>3 - Good</option>
                                    <option value={2}>2 - Fair</option>
                                    <option value={1}>1 - Poor</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#334155] mb-2">Your Review</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Share your experience with the CodeHido team..."
                                    className="w-full border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#2974FF] hover:bg-[#1558D6] text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                            >
                                Submit Review
                            </button>

                            {submitSuccess && (
                                <p className="text-green-600 font-medium">
                                    Your review has been submitted and is awaiting admin approval.
                                </p>
                            )}
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Log in to leave a review</h3>
                        <Link to="/login" className="inline-block bg-[#2974FF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1558D6] transition-all">
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testimonial;
