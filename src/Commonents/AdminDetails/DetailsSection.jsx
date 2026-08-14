export default function DetailsSection({ title, children, className = "" }) {
    return (
        <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
            <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>
            {children}
        </section>
    );
}
