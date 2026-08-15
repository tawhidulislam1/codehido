import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const normalizeReviews = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.result)) return payload.result;
    if (Array.isArray(payload.reviews)) return payload.reviews;
  }
  return [];
};

const getStatusClass = (status) => {
  const s = (status || "").toString().toLowerCase();
  switch (s) {
    case "active":
      return "bg-green-100 text-green-700 border border-green-200";
    case "inactive":
      return "bg-red-100 text-red-700 border border-red-200";
    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function MyReviews() {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/review/mine");
      return normalizeReviews(res.data);
    },
  });

  if (isPending) {
    return <div className="flex h-64 items-center justify-center text-[#2974FF] font-semibold">Loading your reviews...</div>;
  }

  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5FAFF] p-8 text-center shadow-xl">
        <h2 className="text-xl font-semibold text-[#0F172A]">No reviews yet</h2>
        <p className="mt-2 text-sm text-[#475569]">Your submitted reviews will appear here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">My Reviews</h2>
        <p className="mt-1 text-sm text-[#475569]">Total reviews: {reviews.length}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#E6F0FF] text-xs uppercase tracking-wide text-[#0F172A]">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id || index} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-yellow-500 font-semibold">{Number(review.rating || 0)} / 5</td>
                <td className="px-6 py-4 text-[#475569] max-w-md">{review.message || "-"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(review.status)}`}>
                    {review.status || "inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#475569]">{formatDate(review.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
