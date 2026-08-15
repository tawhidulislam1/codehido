import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const normalizeDonations = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.result)) return payload.result;
    if (Array.isArray(payload.donations)) return payload.donations;
  }
  return [];
};

const getStatusClass = (status) => {
  const s = (status || "").toString().toLowerCase();
  switch (s) {
    case "approved":
      return "bg-green-100 text-green-700 border border-green-200";
    case "rejected":
      return "bg-red-100 text-red-700 border border-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
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
  });
};

export default function MyDonations() {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isPending } = useQuery({
    queryKey: ["my-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-request/mine");
      return normalizeDonations(res.data);
    },
  });

  if (isPending) {
    return <div className="flex h-64 items-center justify-center text-[#2974FF] font-semibold">Loading your donations...</div>;
  }

  if (!donations.length) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5FAFF] p-8 text-center shadow-xl">
        <h2 className="text-xl font-semibold text-[#0F172A]">No donation requests yet</h2>
        <p className="mt-2 text-sm text-[#475569]">Your donation requests will appear here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">My Donations</h2>
        <p className="mt-1 text-sm text-[#475569]">Total requests: {donations.length}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#E6F0FF] text-xs uppercase tracking-wide text-[#0F172A]">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Cause</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((item, index) => (
              <tr key={item._id || index} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-[#0F172A]">{item.cause || "N/A"}</td>
                <td className="px-6 py-4 text-[#475569]">{item.amount ? `$${Number(item.amount).toLocaleString()}` : "N/A"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(item.status)}`}>
                    {item.status || "pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#475569]">{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
