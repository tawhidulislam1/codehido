import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDetailsLayout from "../../../Commonents/AdminDetails/AdminDetailsLayout";
import DetailsSection from "../../../Commonents/AdminDetails/DetailsSection";
import DetailsField from "../../../Commonents/AdminDetails/DetailsField";
import DetailsPageSkeleton from "../../../Commonents/AdminDetails/DetailsPageSkeleton";

const normalizeService = (data) => {
    if (!data) return {};
    if (Array.isArray(data)) return data[0] || {};
    if (data.data && typeof data.data === "object") return data.data;
    if (data.result && typeof data.result === "object") return data.result;
    return data;
};

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["dashboard-service", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/service/${id}`);
            return normalizeService(res.data);
        },
        enabled: !!id,
    });

    if (isPending) return <DetailsPageSkeleton />;
    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">Service not found</h2>
                    <p className="mt-2 text-slate-600">This service entry could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/service")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to services
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AdminDetailsLayout
            title={data.title || "Service"}
            subtitle="Service information"
            image={data.image}
            backTo="/dashboard/service"
            backLabel="Back to services"
            status={data.status}
            actions={[
                { label: "Edit", variant: "primary", onClick: () => navigate(`/dashboard/edit-service/${id}`) },
            ]}
        >
            <div className="space-y-6">
                <DetailsSection title="Description">
                    <p className="whitespace-pre-line text-slate-700">{data.description || "No description provided."}</p>
                </DetailsSection>

                <div className="grid gap-4 md:grid-cols-2">
                    <DetailsField label="Service name" value={data.title} />
                    <DetailsField label="Status" value={data.status} />
                    <DetailsField label="Created at" value={data.createdAt ? new Date(data.createdAt).toLocaleString() : null} />
                    <DetailsField label="Updated at" value={data.updatedAt ? new Date(data.updatedAt).toLocaleString() : null} />
                </div>
            </div>
        </AdminDetailsLayout>
    );
}
