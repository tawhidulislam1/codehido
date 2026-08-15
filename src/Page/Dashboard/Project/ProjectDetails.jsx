import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDetailsLayout from "../../../Commonents/AdminDetails/AdminDetailsLayout";
import DetailsSection from "../../../Commonents/AdminDetails/DetailsSection";
import DetailsField from "../../../Commonents/AdminDetails/DetailsField";
import DetailsPageSkeleton from "../../../Commonents/AdminDetails/DetailsPageSkeleton";

const normalizeProject = (payload) => {
    if (!payload) return {};
    if (Array.isArray(payload)) return payload[0] || {};
    if (payload.data && typeof payload.data === "object") return payload.data;
    if (payload.result && typeof payload.result === "object") return payload.result;
    return payload;
};

const getDeveloperNames = (assignedDevelopers) => {
    if (!Array.isArray(assignedDevelopers)) return "Not assigned";
    const names = assignedDevelopers
        .map((dev) => (typeof dev === "string" ? dev : dev?.name))
        .filter(Boolean);
    return names.length ? names.join(", ") : "Not assigned";
};

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["admin-project-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/project/${id}`);
            return normalizeProject(res.data);
        },
        enabled: !!id,
    });

    if (isPending) return <DetailsPageSkeleton />;

    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">Project not found</h2>
                    <p className="mt-2 text-slate-600">This project could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/project")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AdminDetailsLayout
            title={data.name || "Project"}
            subtitle={data.duration ? `Duration: ${data.duration}` : "Project details"}
            backTo="/dashboard/project"
            backLabel="Back to projects"
            actions={[]}
            status={data.status}
        >
            <div className="space-y-6">
                <DetailsSection title="Project overview">
                    <p className="whitespace-pre-line text-slate-700">{data.details || "No project details provided."}</p>
                </DetailsSection>

                <div className="grid gap-4 md:grid-cols-2">
                    <DetailsField label="Price" value={data.price !== undefined ? `$${data.price}` : "Not set"} />
                    <DetailsField label="Duration" value={data.duration} />
                    <DetailsField label="Stack" value={Array.isArray(data.stack) ? data.stack.join(", ") : data.stack || "Not set"} />
                    <DetailsField label="Reference project" value={data.referenceProject || "Not provided"} />
                    <DetailsField label="Assigned developers" value={getDeveloperNames(data.assignedDevelopers)} className="md:col-span-2" />
                </div>
            </div>
        </AdminDetailsLayout>
    );
}
