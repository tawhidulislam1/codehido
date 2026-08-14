import { useQuery } from "@tanstack/react-query";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const normalizeReviews = (data) => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
        if (Array.isArray(data.result)) return data.result;
        if (Array.isArray(data.reviews)) return data.reviews;
        if (Array.isArray(data.data)) return data.data;
    }
    return [];
};

const ReviewList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isPending, refetch } = useQuery({
        queryKey: ["dashboard-review-list"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/review");
            return normalizeReviews(res.data);
        },
    });

    const handleStatusChange = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/dashboard/review/${id}`, { status });
            if (res.data?.modifiedCount > 0 || res.data?.updatedReview) {
                Swal.fire({
                    title: "Status Updated!",
                    text: `Review marked as ${status}.`,
                    icon: "success",
                    timer: 1200,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                title: "Failed to update status",
                text: error?.response?.data?.message || error.message,
                icon: "error",
            });
        }
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: "Delete review?",
            text: `You are about to delete ${name || "this review"}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/dashboard/review/${id}`);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Review has been removed.",
                        icon: "success",
                        timer: 1200,
                        showConfirmButton: false,
                    });
                    refetch();
                } catch (error) {
                    Swal.fire({
                        title: "Delete failed",
                        text: error?.response?.data?.message || error.message,
                        icon: "error",
                    });
                }
            }
        });
    };

    if (isPending) {
        return <div className="flex justify-center items-center h-64 text-[#2974FF] font-semibold">Loading reviews...</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-[#475569]">
                <p className="text-lg font-medium">No reviews yet</p>
            </div>
        );
    }

    return (
        <div
            className="p-6 sm:p-8 bg-[#F5FAFF] rounded-2xl shadow-xl border border-[#E6F0FF]"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">Review List</h2>
                <p className="text-[#475569] text-sm mt-2 sm:mt-0">
                    Total Reviews: <span className="font-bold text-[#2974FF]">{reviews.length}</span>
                </p>
            </div>

            <div className="hidden md:block overflow-x-auto rounded-xl shadow-md bg-white border border-[#E2E8F0]">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#E6F0FF] text-[#0F172A] uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr
                                key={review._id || index}
                                className="border-b hover:bg-[#F8FAFC] transition-all duration-200"
                            >
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={review.photo || "https://i.pravatar.cc/100?img=8"}
                                            alt={review.name || "Reviewer"}
                                            className="w-10 h-10 rounded-full border border-[#E2E8F0] object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-[#0F172A]">{review.name || "Anonymous"}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < (Number(review.rating) || 0) ? "text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#475569] max-w-md">{review.message || "-"}</td>
                                <td className="px-6 py-4 text-center">
                                    <select
                                        value={review.status || "inactive"}
                                        onChange={(e) => handleStatusChange(review._id, e.target.value)}
                                        className={`px-3 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${review.status === "active"
                                            ? "bg-green-100 text-green-800 border-green-300"
                                            : "bg-red-100 text-red-700 border-red-300"
                                            }`}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleDelete(review._id, review.name)}
                                        className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                                        title="Delete Review"
                                    >
                                        <FaTrashAlt size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden grid gap-4 mt-6">
                {reviews.map((review, index) => (
                    <div
                        key={review._id || index}
                        className="bg-white p-4 rounded-xl shadow-md border border-[#E2E8F0]"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={review.photo || "https://i.pravatar.cc/100?img=8"}
                                alt={review.name || "Reviewer"}
                                className="w-12 h-12 rounded-full object-cover border"
                            />
                            <div>
                                <h3 className="font-semibold text-[#0F172A]">{review.name || "Anonymous"}</h3>
                                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < (Number(review.rating) || 0) ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-[#475569] mb-3">{review.message || "-"}</p>

                        <div className="flex justify-between items-center gap-2">
                            <select
                                value={review.status || "inactive"}
                                onChange={(e) => handleStatusChange(review._id, e.target.value)}
                                className={`px-3 py-1 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${review.status === "active"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-red-100 text-red-700 border-red-300"
                                    }`}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <button
                                onClick={() => handleDelete(review._id, review.name)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrashAlt size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
