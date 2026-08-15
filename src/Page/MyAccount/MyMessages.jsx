import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const normalizeMessages = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.result)) return payload.result;
    if (Array.isArray(payload.messages)) return payload.messages;
  }
  return [];
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

export default function MyMessages() {
  const axiosSecure = useAxiosSecure();

  const { data: messages = [], isPending } = useQuery({
    queryKey: ["my-messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages/mine");
      return normalizeMessages(res.data);
    },
  });

  if (isPending) {
    return <div className="flex h-64 items-center justify-center text-[#2974FF] font-semibold">Loading your messages...</div>;
  }

  if (!messages.length) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5FAFF] p-8 text-center shadow-xl">
        <h2 className="text-xl font-semibold text-[#0F172A]">No messages found</h2>
        <p className="mt-2 text-sm text-[#475569]">Your sent messages will appear here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">My Messages</h2>
        <p className="mt-1 text-sm text-[#475569]">Total messages: {messages.length}</p>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={message._id || index} className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-semibold text-[#0F172A]">{message.subject || "No subject"}</h3>
              <span className="text-xs text-[#475569]">{formatDate(message.createdAt)}</span>
            </div>
            <p className="text-sm text-[#475569]">{message.message || "No message content."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
