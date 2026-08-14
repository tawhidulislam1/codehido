export default function DetailsField({ label, value, emptyText = "Not available", className = "" }) {
    const safeValue = value ?? "";
    const displayValue = safeValue === "" || safeValue === null || safeValue === undefined ? emptyText : safeValue;

    return (
        <div className={`rounded-xl border border-slate-200 bg-slate-50 p-4 ${className}`}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="break-words text-sm text-slate-700 sm:text-base">{displayValue}</p>
        </div>
    );
}
