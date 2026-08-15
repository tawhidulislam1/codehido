import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
} from "recharts";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// codeHido Dashboard — Updated to use the custom color palette you provided.
// Palette (CSS variables defined in the component):
// --color-primary: #2974FF
// --color-primary-dark: #1558D6
// --color-light-blue: #E6F0FF
// --color-extra-light: #F5FAFF
// --color-text-dark: #0F172A
// --color-text-medium: #475569
// --color-border-gray: #CBD5E1

const projects = [
    { id: 1, name: "Fama Barber Shop", status: "Design", progress: 40 },
    { id: 2, name: "Donation Hub", status: "Deploy", progress: 85 },
    { id: 3, name: "Smart Parking", status: "Development", progress: 60 },
    { id: 4, name: "Roktho Bondhon", status: "QA", progress: 92 },
];

const activity = [
    { id: 1, text: "Deployed v1.2 to production", time: "2h ago" },
    { id: 2, text: "New payment processed ($120)", time: "5h ago" },
    { id: 3, text: "Anna joined the team", time: "1d ago" },
];

const chartData = [
    { name: "Jan", uv: 400 },
    { name: "Feb", uv: 600 },
    { name: "Mar", uv: 800 },
    { name: "Apr", uv: 700 },
    { name: "May", uv: 1000 },
    { name: "Jun", uv: 1200 },
    { name: "Jul", uv: 1500 },
];

export default function Dashboard() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: dashboardStats = {}, isLoading, refetch } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/stats');
            return res.data;
        },
        // Refresh periodically and on window focus so admin sees live numbers
        refetchInterval: 60_000,
        refetchOnWindowFocus: true,
        onSuccess: (d) => console.debug('dashboardStats loaded', d),
    });
    // Normalize dashboard stats from varying API shapes to make the UI resilient.
    const normalizeDashboardStats = (raw) => {
        const root = raw?.data ?? raw ?? {};
        const get = (candidates) => {
            for (const key of candidates) {
                const parts = key.split('.');
                let cur = root;
                let found = true;
                for (const p of parts) {
                    if (cur == null) {
                        found = false;
                        break;
                    }
                    cur = cur[p];
                }
                if (cur !== undefined && cur !== null) return cur;
            }
            return undefined;
        };

        const totalUsers = get(['totalUsers', 'total_users', 'usersCount', 'users_count', 'users.total', 'users', 'total']);
        const totalPortfolio = get(['totalPortfolio', 'total_portfolio', 'portfoliosCount', 'portfolio_count', 'portfolio.total', 'projects', 'projectsCount', 'portfolios']);
        const activePortfolio = get(['activePortfolio', 'active_portfolio', 'active_projects', 'activeProjects']);
        const inactivePortfolio = get(['inactivePortfolio', 'inactive_portfolio', 'inactive_projects', 'inactiveProjects']);

        return {
            totalUsers: Number(totalUsers) || 0,
            totalPortfolio: Number(totalPortfolio) || 0,
            activePortfolio: Number(activePortfolio) || 0,
            inactivePortfolio: Number(inactivePortfolio) || 0,
        };
    };

    const normalized = normalizeDashboardStats(dashboardStats);

    const stats = [
        { id: 1, title: "Total Users", value: normalized.totalUsers, change: "+8%" },
        { id: 2, title: "Total Portfolio", value: normalized.totalPortfolio, change: "+5%" },
        { id: 3, title: "Active Portfolio", value: normalized.activePortfolio, change: "+10%" },
        { id: 4, title: "Inactive Portfolio", value: normalized.inactivePortfolio, change: "-3%" },
    ];

    if (isLoading) {
        return <div className="flex justify-center items-center h-64 gap-2">
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
        </div>;
    }

    return (
        <div
            className="min-h-screen text-[var(--color-text-dark)]"
            style={{
                // define palette as CSS variables so you can override easily
                ['--color-primary']: '#2974FF',
                ['--color-primary-dark']: '#1558D6',
                ['--color-light-blue']: '#E6F0FF',
                ['--color-extra-light']: '#F5FAFF',
                ['--color-text-dark']: '#0F172A',
                ['--color-text-medium']: '#475569',
                ['--color-border-gray']: '#CBD5E1',
                background: 'linear-gradient(180deg, var(--color-extra-light) 0%, white 100%)',
            }}
        >
            {/* Inline style tag for a few helper classes (keeps the component self-contained) */}
            <style>{`
        .bg-primary { background: var(--color-primary); }
        .bg-primary-dark { background: var(--color-primary-dark); }
        .text-medium { color: var(--color-text-medium); }
        .border-custom { border-color: var(--color-border-gray); }
        .card-bg { background: white; }
        @media (prefers-color-scheme: dark) {
          .card-bg { background: #0b1220; color: #e6eefc; }
        }
      `}</style>

            <div className="max-w-[1400px] mx-auto p-6">
                <div className="grid grid-cols-12 gap-6">


                    {/* MAIN */}
                    <main className="col-span-12 md:col-span-12 lg:col-span-12">
                        <header className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-semibold">Welcome back,{user?.displayName} 👋</h1>
                                <p className="text-sm text-medium">Here’s what’s happening with your projects today.</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-4 rounded-2xl p-2" style={{ background: 'var(--color-extra-light)' }}>
                                    <input
                                        className="bg-transparent outline-none placeholder:text-medium text-sm"
                                        placeholder="Search projects, clients..."
                                    />
                                </div>

                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                                    style={{ background: 'linear-gradient(90deg,var(--color-primary),var(--color-primary-dark))' }}
                                >
                                    T
                                </div>
                            </div>
                        </header>

                        {/* Stats Grid */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid grid-cols-12 gap-4 mb-6">
                            {stats.map((s) => (
                                <motion.div
                                    key={s.id}
                                    whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(2,6,23,0.08)" }}
                                    className="col-span-12 sm:col-span-6 lg:col-span-3 card-bg rounded-2xl p-4 border border-custom"
                                >
                                    <div className="text-xs text-medium">{s.title}</div>
                                    <div className="flex items-end justify-between">
                                        <div className="text-2xl font-bold">{s.value}</div>
                                        <div className={`text-sm font-medium ${s.change.startsWith("+") ? "text-[green]" : "text-[red]"}`}>{s.change}</div>
                                    </div>
                                    <div className="mt-3 text-xs text-[var(--color-text-medium)]">Compared to last month</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="grid grid-cols-12 gap-4">
                            {/* Left Column - Chart + Projects */}
                            <section className="col-span-12 lg:col-span-8 space-y-4">
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="card-bg rounded-2xl p-4 border border-custom">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold">Revenue (last 7 months)</h3>
                                            <div className="text-sm text-medium">Estimated earnings and trends</div>
                                        </div>

                                        <div className="text-sm text-medium">Summary</div>
                                    </div>

                                    <div className="h-56">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" stroke="var(--color-text-medium)" />
                                                <YAxis stroke="var(--color-text-medium)" />
                                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-gray)" />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="uv" stroke="var(--color-primary-dark)" fillOpacity={1} fill="url(#colorUv)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="card-bg rounded-2xl p-4 border border-custom">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold">Active Projects</h3>
                                        <div className="text-sm text-medium">{projects.length} projects</div>
                                    </div>

                                    <div className="space-y-3">
                                        {projects.map((p) => (
                                            <div key={p.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-medium" style={{ background: 'var(--color-light-blue)' }}>{p.name.split(" ")[0][0]}</div>
                                                    <div>
                                                        <div className="font-medium">{p.name}</div>
                                                        <div className="text-xs text-medium">{p.status}</div>
                                                    </div>
                                                </div>

                                                <div className="w-40">
                                                    <div className="w-full bg-[var(--color-extra-light)] rounded-full h-2 overflow-hidden border border-custom">
                                                        <div className={`h-2 rounded-full`} style={{ width: `${p.progress}%`, background: `linear-gradient(90deg,var(--color-primary),var(--color-primary-dark))` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>

                            {/* Right Column - Team + Activity */}
                            <aside className="col-span-12 lg:col-span-4 space-y-4">
                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="card-bg rounded-2xl p-4 border border-custom">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold">Team</h3>
                                        <div className="text-sm text-medium">8 members</div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-3">
                                        {['AS', 'ML', 'JK', 'AN', 'RB'].map((a, i) => (
                                            <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: `linear-gradient(90deg,var(--color-primary),var(--color-primary-dark))` }}>{a}</div>
                                        ))}
                                        <div className="text-sm text-medium">+3 more</div>
                                    </div>

                                    <div className="text-xs text-medium">Roles</div>
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <div className="text-sm">Lead Designer</div>
                                        <div className="text-sm">Fullstack Dev</div>
                                        <div className="text-sm">Frontend Dev</div>
                                        <div className="text-sm">QA</div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="card-bg rounded-2xl p-4 border border-custom">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold">Activity</h3>
                                        <div className="text-sm text-medium">Recent</div>
                                    </div>

                                    <div className="space-y-3">
                                        {activity.map((a) => (
                                            <div key={a.id} className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-extra-light)' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                                                <div>
                                                    <div className="text-sm font-medium">{a.text}</div>
                                                    <div className="text-xs text-[var(--color-text-medium)]">{a.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(90deg,var(--color-primary),var(--color-primary-dark))' }}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm">Upgrade plan</div>
                                            <div className="text-lg font-semibold">Grow with codeHido</div>
                                        </div>
                                        <button className="bg-white/20 px-3 py-2 rounded-lg">Upgrade</button>
                                    </div>
                                </motion.div>
                            </aside>
                        </div>

                        <footer className="mt-6 text-sm text-medium">© {new Date().getFullYear()} codeHido — Built with ❤️</footer>
                    </main>
                </div>
            </div>
        </div>
    );
}
