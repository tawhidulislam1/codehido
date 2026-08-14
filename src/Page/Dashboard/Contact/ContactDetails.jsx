import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDetailsLayout from "../../../Commonents/AdminDetails/AdminDetailsLayout";
import DetailsSection from "../../../Commonents/AdminDetails/DetailsSection";
import DetailsField from "../../../Commonents/AdminDetails/DetailsField";
import DetailsPageSkeleton from "../../../Commonents/AdminDetails/DetailsPageSkeleton";

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

const normalizeContactMessage = (data) => {
    if (!data) return {};
    if (Array.isArray(data)) return data[0] || {};
    if (data.data && typeof data.data === "object") return data.data;
    if (data.result && typeof data.result === "object") return data.result;
    return data;
};

export default function ContactDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["dashboard-contact-message", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact/${id}`);
            return normalizeContactMessage(res.data);
        },
        enabled: !!id,
    });

    if (isPending) return <DetailsPageSkeleton />;

    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">Message not found</h2>
                    <p className="mt-2 text-slate-600">This contact message could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/contact")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to contact
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AdminDetailsLayout
            title={data.name || "Contact Message"}
            subtitle={data.subject || "Contact form submission"}
            backTo="/dashboard/contact"
            backLabel="Back to contact"
            actions={[]}
        >
            <div className="space-y-6">
                <DetailsSection title="Message">
                    <p className="whitespace-pre-line text-slate-700">{data.message || "No message provided."}</p>
                </DetailsSection>

                <div className="grid gap-4 md:grid-cols-2">
                    <DetailsField label="Name" value={data.name} />
                    <DetailsField label="Email" value={data.email} />
                    <DetailsField label="Subject" value={data.subject} />
                    <DetailsField
                        label="Received at"
                        value={formatDate(data.createdAt)}
                    />
                </div>
            </div>
        </AdminDetailsLayout>
    );
}
