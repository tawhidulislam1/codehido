import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDetailsLayout from "../../../Commonents/AdminDetails/AdminDetailsLayout";
import DetailsSection from "../../../Commonents/AdminDetails/DetailsSection";
import DetailsField from "../../../Commonents/AdminDetails/DetailsField";
import DetailsPageSkeleton from "../../../Commonents/AdminDetails/DetailsPageSkeleton";

const normalizePortfolio = (data) => {
    if (!data) return {};
    if (Array.isArray(data)) return data[0] || {};
    if (data.data && typeof data.data === "object") return data.data;
    if (data.result && typeof data.result === "object") return data.result;
    return data;
};

export default function PortfolioDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["dashboard-portfolio", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/portfolio/${id}`);
            return normalizePortfolio(res.data);
        },
        enabled: !!id,
    });

    if (isPending) return <DetailsPageSkeleton />;
    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">Portfolio not found</h2>
                    <p className="mt-2 text-slate-600">This portfolio item could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/portfolio")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to portfolio list
                    </button>
                </div>
            </div>
        );
    }

    const techTags = data.technology ? String(data.technology).split(",").map((item) => item.trim()).filter(Boolean) : [];

    return (
        <AdminDetailsLayout
            title={data.name || "Portfolio Item"}
            subtitle={data.designedBy ? `Designed by ${data.designedBy}` : "Project details"}
            image={data.image}
            backTo="/dashboard/portfolio"
            backLabel="Back to portfolio"
            status={data.status}
            actions={[
                { label: "Edit", variant: "primary", onClick: () => navigate(`/dashboard/edit-portfolio/${id}`) },
            ]}
        >
            <div className="space-y-6">
                <DetailsSection title="Overview">
                    <p className="whitespace-pre-line text-slate-700">{data.details || "No description provided."}</p>
                </DetailsSection>

                <div className="grid gap-4 md:grid-cols-2">
                    <DetailsField label="Project name" value={data.name} />
                    <DetailsField label="Designed by" value={data.designedBy} />
                    <DetailsField label="Status" value={data.status} />
                    <DetailsField label="Technology" value={techTags.length ? techTags.join(", ") : null} />
                </div>

                <DetailsSection title="Links">
                    <div className="grid gap-4 md:grid-cols-3">
                        <DetailsField label="Live URL" value={data.live ? <a href={data.live} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open website</a> : null} />
                        <DetailsField label="GitHub URL" value={data.github ? <a href={data.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open repository</a> : null} />
                        <DetailsField label="Server URL" value={data.server ? <a href={data.server} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open server</a> : null} />
                    </div>
                </DetailsSection>

                {techTags.length > 0 && (
                    <DetailsSection title="Technologies">
                        <div className="flex flex-wrap gap-2">
                            {techTags.map((tag, index) => (
                                <span key={`${tag}-${index}`} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </DetailsSection>
                )}
            </div>
        </AdminDetailsLayout>
    );
}
