import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";
import useDeveloper from "../../../Hooks/useDeveloper";
import ViewDetailsButton from "../../../Commonents/ViewDetailsButton";

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

const normalizeContactMessages = (data) => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
        if (Array.isArray(data.result)) return data.result;
        if (Array.isArray(data.data)) return data.data;
        if (Array.isArray(data.messages)) return data.messages;
        if (Array.isArray(data.contacts)) return data.contacts;
    }
    return [];
};

export default function ContactList() {
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isDeveloper] = useDeveloper();
    const isDeveloperRole = !isAdmin && Boolean(isDeveloper);

    const { data: messages = [], isPending, refetch } = useQuery({
        queryKey: ["dashboard-contact-list"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/messages");
            return normalizeContactMessages(res.data);
        },
    });

    const handleDelete = async (id, name) => {
        if (isDeveloperRole) {
            Swal.fire({
                title: "Read-only access",
                text: "Only admins can delete contact messages.",
                icon: "info",
            });
            return;
        }

        const result = await Swal.fire({
            title: "Delete contact message?",
            text: `This will permanently remove ${name || "this message"}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/contact/${id}`);
            Swal.fire({
                title: "Deleted!",
                text: "Contact message removed successfully.",
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
    };

    if (isPending) {
        return <div className="flex h-64 items-center justify-center text-[#2974FF] font-semibold">Loading contact messages...</div>;
    }

    if (messages.length === 0) {
        return (
            <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-8 text-center shadow-xl">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaEnvelope size={22} />
                </div>
                <h2 className="text-xl font-semibold text-[#0F172A]">No contact messages</h2>
                <p className="mt-2 text-sm text-[#475569]">New messages from the contact form will appear here.</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">Contact Messages</h2>
                    <p className="mt-1 text-sm text-[#475569]">Total messages: {messages.length}</p>
                </div>
            </div>

            <div className="hidden overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-md md:block">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#E6F0FF] text-xs uppercase tracking-wide text-[#0F172A]">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message, index) => (
                            <tr key={message._id || index} className="border-b border-[#E2E8F0] transition hover:bg-[#F8FAFC]">
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                                <td className="px-6 py-4 font-medium text-[#0F172A]">{message.name || "N/A"}</td>
                                <td className="px-6 py-4 text-[#475569]">{message.email || "N/A"}</td>
                                <td className="px-6 py-4 text-[#475569]">{message.subject || "N/A"}</td>
                                <td className="max-w-md px-6 py-4 text-[#475569]">
                                    {message.message ? `${message.message.slice(0, 80)}${message.message.length > 80 ? "..." : ""}` : "N/A"}
                                </td>
                                <td className="px-6 py-4 text-[#475569]">
                                    {formatDate(message.createdAt)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <ViewDetailsButton to={`/dashboard/contact/${message._id}`} className="px-2 py-1 text-[10px]" />
                                        {!isDeveloperRole && (
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(message._id, message.name)}
                                                className="text-red-500 transition hover:text-red-700"
                                                title="Delete message"
                                                aria-label="Delete message"
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 grid gap-4 md:hidden">
                {messages.map((message, index) => (
                    <div key={message._id || index} className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-semibold text-[#0F172A]">{message.name || "N/A"}</p>
                                <p className="text-sm text-[#475569]">{message.email || "N/A"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ViewDetailsButton to={`/dashboard/contact/${message._id}`} className="px-2 py-1 text-[10px]" />
                                {!isDeveloperRole && (
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(message._id, message.name)}
                                        className="text-red-500 transition hover:text-red-700"
                                        title="Delete message"
                                        aria-label="Delete message"
                                    >
                                        <FaTrashAlt size={15} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-[#475569]">
                            <p>
                                <span className="font-medium text-[#0F172A]">Subject:</span> {message.subject || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium text-[#0F172A]">Message:</span> {message.message ? `${message.message.slice(0, 100)}...` : "N/A"}
                            </p>
                            <p>
                                <span className="font-medium text-[#0F172A]">Date:</span>{" "}
                                {formatDate(message.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
