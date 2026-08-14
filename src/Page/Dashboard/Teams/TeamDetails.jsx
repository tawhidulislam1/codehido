import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDetailsLayout from "../../../Commonents/AdminDetails/AdminDetailsLayout";
import DetailsSection from "../../../Commonents/AdminDetails/DetailsSection";
import DetailsField from "../../../Commonents/AdminDetails/DetailsField";
import DetailsPageSkeleton from "../../../Commonents/AdminDetails/DetailsPageSkeleton";

const normalizeTeamMember = (data) => {
    if (!data) return {};
    if (Array.isArray(data)) return data[0] || {};
    if (data.data && typeof data.data === "object") return data.data;
    if (data.result && typeof data.result === "object") return data.result;
    return data;
};

export default function TeamMemberDetailsDashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["dashboard-team-member", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/team/${id}`);
            return normalizeTeamMember(res.data);
        },
        enabled: !!id,
    });

    if (isPending) return <DetailsPageSkeleton />;
    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">Team member not found</h2>
                    <p className="mt-2 text-slate-600">This team member could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/team")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to team list
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AdminDetailsLayout
            title={data.name || "Team Member"}
            subtitle={data.role || "Team member"}
            image={data.image}
            backTo="/dashboard/team"
            backLabel="Back to team"
            actions={[
                { label: "Edit", variant: "primary", onClick: () => navigate(`/dashboard/team/edit/${id}`) },
            ]}
        >
            <div className="space-y-6">
                <DetailsSection title="About">
                    <p className="whitespace-pre-line text-slate-700">{data.details || "No details available."}</p>
                </DetailsSection>

                <div className="grid gap-4 md:grid-cols-2">
                    <DetailsField label="Name" value={data.name} />
                    <DetailsField label="Role" value={data.role} />
                    <DetailsField label="Email" value={data.email} />
                    <DetailsField label="LinkedIn" value={data.linkedin ? <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open profile</a> : null} />
                </div>

                <DetailsSection title="Social profiles">
                    <div className="grid gap-4 md:grid-cols-3">
                        <DetailsField label="Facebook" value={data.facebook ? <a href={data.facebook} target="_blank" rel="noreferrer" className="text-blue-600 underline">Facebook</a> : null} />
                        <DetailsField label="Twitter" value={data.twitter ? <a href={data.twitter} target="_blank" rel="noreferrer" className="text-blue-600 underline">Twitter</a> : null} />
                        <DetailsField label="LinkedIn" value={data.linkedin ? <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">LinkedIn</a> : null} />
                    </div>
                </DetailsSection>
            </div>
        </AdminDetailsLayout>
    );
}
