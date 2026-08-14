export default function DetailsPageSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-8">
            <div className="mx-auto max-w-5xl animate-pulse">
                <div className="mb-8 h-12 w-64 rounded-xl bg-blue-100" />
                <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg">
                    <div className="h-72 w-full bg-slate-200" />
                    <div className="space-y-6 p-6 sm:p-8">
                        <div className="h-8 w-2/3 rounded bg-slate-200" />
                        <div className="h-4 w-full rounded bg-slate-200" />
                        <div className="h-4 w-5/6 rounded bg-slate-200" />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="h-20 rounded bg-slate-100" />
                            <div className="h-20 rounded bg-slate-100" />
                            <div className="h-20 rounded bg-slate-100" />
                            <div className="h-20 rounded bg-slate-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
