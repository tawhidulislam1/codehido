import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ViewDetailsButton from "../../../Commonents/ViewDetailsButton";

const normalizeDonationRequests = (data) => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    if (Array.isArray(data.result)) return data.result;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.donationRequests)) return data.donationRequests;
    if (Array.isArray(data.requests)) return data.requests;
  }
  return [];
};

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/donation-request");
      return normalizeDonationRequests(res.data);
    },
  });

  const totalAmount = useMemo(
    () => requests.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [requests]
  );

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/dashboard/donation-request/${id}`, { status });
      Swal.fire({
        title: "Status Updated",
        text: `Request marked as ${status}.`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Failed to update status",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: "Delete donation request?",
      text: `This will permanently remove ${name || "this request"}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2974FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/dashboard/donation-request/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Donation request has been removed.",
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

  if (isLoading) {
    return <div className="text-center py-12 text-[#2974FF] font-semibold">Loading requests...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-6 sm:p-8 bg-[#F5FAFF] rounded-2xl shadow-xl border border-[#E6F0FF]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">Donation Requests</h2>
          <p className="text-[#475569] text-sm mt-1">Total requested: {requests.length}</p>
        </div>
        <div className="bg-[#E6F0FF] rounded-xl px-4 py-2 text-[#0F172A] font-semibold">
          Total Amount: ৳{totalAmount}
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-16 text-[#475569]">No donation requests found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white border border-[#E2E8F0]">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#E6F0FF] text-[#0F172A] uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Cause</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id || index} className="border-b hover:bg-[#F8FAFC] transition-all duration-200">
                  <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{request.name || "N/A"}</td>
                  <td className="px-6 py-4 text-[#475569]">{request.email || "N/A"}</td>
                  <td className="px-6 py-4 font-semibold text-[#2974FF]">৳{request.amount || 0}</td>
                  <td className="px-6 py-4 text-[#475569]">{request.cause || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : request.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <ViewDetailsButton to={`/dashboard/donation-request/${request._id}`} className="px-2 py-1 text-[10px]" />
                      <button
                        onClick={() => handleStatusChange(request._id, "approved")}
                        className="text-green-600 hover:text-green-800 transition-transform hover:scale-110"
                        title="Approve"
                      >
                        <FaCheck size={18} />
                      </button>

                      <button
                        onClick={() => handleStatusChange(request._id, "rejected")}
                        className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                        title="Reject"
                      >
                        <FaTimes size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(request._id, request.name)}
                        className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                        title="Delete"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default DonationRequests;
