import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Eye, Pencil, Trash2, ShieldCheck, BriefcaseBusiness, UserRound } from "lucide-react";

const defaultIcons = {
    view: Eye,
    edit: Pencil,
    delete: Trash2,
    admin: ShieldCheck,
    developer: BriefcaseBusiness,
    user: UserRound,
};

export default function AdminActionsDropdown({ actions = [], triggerClassName = "", menuClassName = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!actions.length) return null;

    return (
        <div className="relative inline-block">
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-label="Open actions menu"
                title="More actions"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 ${triggerClassName}`}
            >
                <MoreHorizontal size={18} />
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className={`absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-100 ${menuClassName}`}
                >
                    {actions.map((action, index) => {
                        if (action.type === "divider") {
                            return <div key={`divider-${index}`} className="my-1 h-px bg-slate-200" />;
                        }

                        const Icon = action.icon || defaultIcons[action.key] || defaultIcons.view;
                        const isDanger = Boolean(action.danger);

                        return (
                            <button
                                key={action.label || `action-${index}`}
                                type="button"
                                onClick={() => {
                                    action.onClick?.();
                                    setIsOpen(false);
                                }}
                                disabled={action.disabled}
                                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition ${
                                    isDanger
                                        ? "text-red-600 hover:bg-red-50 disabled:text-red-300"
                                        : "text-slate-700 hover:bg-slate-50 disabled:text-slate-400"
                                } ${action.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                                title={action.label}
                            >
                                <Icon size={16} className="shrink-0" />
                                <span>{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
