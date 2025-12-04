import { useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const initialTeam = [
    {
        id: "1",
        name: "Tawhidul Islam",
        role: "Frontend Developer",
        email: "designwithtawhid@gmail.com",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: "2",
        name: "Sara Rahman",
        role: "Backend Developer",
        email: "sara.rahman@example.com",
        image: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: "3",
        name: "John Doe",
        role: "UI/UX Designer",
        email: "john.doe@example.com",
        image: "https://i.pravatar.cc/150?img=44",
    },
];

// Row Component
function Row({ member }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: member.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: isDragging ? "grabbing" : "grab", // 🔥 cursor change
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="hover:bg-blue-50/40 transition"
        >
            <td className="px-6 py-4 font-semibold text-gray-700">{member.sl}</td>

            <td className="px-6 py-4">
                <img
                    src={member.image}
                    className="w-12 h-12 rounded-full shadow border border-gray-200"
                />
            </td>

            <td className="px-6 py-4 font-medium text-gray-800">{member.name}</td>
            <td className="px-6 py-4 text-gray-600">{member.role}</td>
            <td className="px-6 py-4 text-gray-500">{member.email}</td>
        </tr>
    );
}

// MAIN COMPONENT
export default function TeamTable() {
    const navigate = useNavigate()
    const [members, setMembers] = useState(initialTeam);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = members.findIndex((i) => i.id === active.id);
            const newIndex = members.findIndex((i) => i.id === over.id);

            const newOrder = arrayMove(members, oldIndex, newIndex);

            newOrder.forEach((m, i) => (m.sl = i + 1));

            setMembers([...newOrder]);
        }
    };

    const updatedMembers = members.map((m, i) => ({ ...m, sl: i + 1 }));

    return (
        <div className="p-8">
            {/* HEADER */}
            <header className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center mb-10 text-center sm:text-left">
                <h1
                    className="text-3xl sm:text-4xl font-bold text-blue-700"

                >
                    Admin Portfolio Dashboard
                </h1>


                <button
                    onClick={() => navigate("/dashboard/team/add-member")}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl shadow hover:bg-blue-700 transition-all cursor-pointer w-full sm:w-auto"
                >
                    <FaPlus /> Add Member
                </button>

            </header>
            <div className="rounded-xl shadow-lg border border-gray-100 bg-white overflow-hidden">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-50">
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                                    SL
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                                    Image
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                                    Email
                                </th>
                            </tr>
                        </thead>

                        <SortableContext
                            items={updatedMembers.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <tbody className="divide-y divide-gray-100">
                                {updatedMembers.map((member) => (
                                    <Row key={member.id} member={member} />
                                ))}
                            </tbody>
                        </SortableContext>
                    </table>
                </DndContext>
            </div>
        </div>
    );
}
