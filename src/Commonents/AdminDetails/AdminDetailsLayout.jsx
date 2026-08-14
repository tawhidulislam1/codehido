import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDetailsLayout({
    title,
    subtitle,
    image,
    backTo,
    backLabel = "Back to list",
    actions = [],
    status,
    children,
}) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#edf4ff] p-4 sm:p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(backTo)}
                        className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        <FaArrowLeft className="text-xs" />
                        {backLabel}
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={action.onClick}
                                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                                    action.variant === "primary"
                                        ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                                        : action.variant === "danger"
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {action.label === "Edit" && <FaEdit className="text-xs" />}
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
                    {image && (
                        <div className="px-3 pt-5 sm:px-5 sm:pt-6">
                            <div className="mx-auto flex w-full max-w-[220px] items-center justify-center">
                                <div className="overflow-hidden rounded-full border-[5px] border-white bg-slate-100 shadow-[0_18px_38px_rgba(15,23,42,0.18)] ring-1 ring-slate-200">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="h-[190px] w-[190px] object-cover object-center sm:h-[220px] sm:w-[220px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Details</p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-800 sm:text-5xl">
                                {title}
                            </h1>
                            {subtitle && <p className="mt-3 text-lg text-slate-600">{subtitle}</p>}
                        </div>

                        {status && (
                            <div className="mb-6 flex justify-end">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                                        status === "active" || status === "published" || status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : status === "inactive" || status === "draft" || status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-blue-100 text-blue-700"
                                    }`}
                                >
                                    {status}
                                </span>
                            </div>
                        )}

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
