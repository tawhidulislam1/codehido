import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDetailsLayout from "../../../Commonents/AdminDetails/AdminDetailsLayout";
import DetailsSection from "../../../Commonents/AdminDetails/DetailsSection";
import DetailsField from "../../../Commonents/AdminDetails/DetailsField";
import DetailsPageSkeleton from "../../../Commonents/AdminDetails/DetailsPageSkeleton";

const normalizeDonationRequest = (data) => {
    if (!data) return {};
    if (Array.isArray(data)) return data[0] || {};
    if (data.data && typeof data.data === "object") return data.data;
    if (data.result && typeof data.result === "object") return data.result;
    return data;
};

export default function DonationRequestDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["dashboard-donation-request", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/donation-request/${id}`);
            return normalizeDonationRequest(res.data);
        },
        enabled: !!id,
    });

    if (isPending) return <DetailsPageSkeleton />;
    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">Request not found</h2>
                    <p className="mt-2 text-slate-600">This donation request could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/donation-request")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to requests
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AdminDetailsLayout
            title={data.name || "Donation Request"}
            subtitle={data.email || "Donation request"}
            backTo="/dashboard/donation-request"
            backLabel="Back to requests"
            status={data.status}
            actions={[]}
        >
            <div className="space-y-6">
                <DetailsSection title="Request summary">
                    <div className="grid gap-4 md:grid-cols-2">
                        <DetailsField label="Name" value={data.name} />
                        <DetailsField label="Email" value={data.email} />
                        <DetailsField label="Amount" value={data.amount ? `৳${data.amount}` : null} />
                        <DetailsField label="Cause" value={data.cause} />
                        <DetailsField label="Status" value={data.status} />
                        <DetailsField label="Phone" value={data.phone} />
                    </div>
                </DetailsSection>

                <DetailsSection title="Message">
                    <p className="whitespace-pre-line text-slate-700">{data.message || "No message provided."}</p>
                </DetailsSection>
            </div>
        </AdminDetailsLayout>
    );
}
