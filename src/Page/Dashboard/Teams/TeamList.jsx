import { useState, useEffect } from "react";
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
import { FaPlus, FaEdit, FaTrash, FaGripVertical } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// ------------------- ROW COMPONENT -------------------
function Row({ member, onDelete, navigate }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: member._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between p-4 mb-2 bg-white shadow rounded-lg hover:bg-blue-50 transition"
        >
            {/* LEFT: Drag handle */}
            <div className="flex items-center gap-4">
                <div
                    {...listeners}
                    {...attributes}
                    className="cursor-grab active:cursor-grabbing text-gray-500"
                >
                    <FaGripVertical size={20} />
                </div>
                <span className="font-semibold text-gray-700 w-6">{member.sl}</span>

                <img
                    src={member.image}
                    className="w-12 h-12 rounded-full shadow border object-cover"
                />

                <div>
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-gray-600">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.email}</p>
                </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-4 text-lg">
                <button
                    onClick={() => navigate(`/dashboard/team/edit/${member._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(member._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

// ------------------- MAIN COMPONENT -------------------
export default function TeamTable() {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { data: members = [], refetch } = useQuery({
        queryKey: ["team"],
        queryFn: async () => {
            const res = await axiosPublic.get("/dashboard/team");
            return res.data;
        },
    });

    const [membersList, setMembersList] = useState([]);

    useEffect(() => {
        if (members.length > 0) {
            const withSl = members.map((m, i) => ({ ...m, sl: i + 1 }));
            setMembersList(withSl);
        }
    }, [members]);

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = membersList.findIndex((i) => i._id === active.id);
            const newIndex = membersList.findIndex((i) => i._id === over.id);

            const newOrder = arrayMove(membersList, oldIndex, newIndex);
            const updated = newOrder.map((m, i) => ({ ...m, sl: i + 1 }));

            setMembersList(updated);

            // Save new order to backend
            try {
                await axiosPublic.patch("/dashboard/team/reorder", {
                    newOrder: updated.map((m) => m._id),
                });
            } catch (err) {
                console.error("Failed to save new order", err);
            }
        }
    };

    const handleDelete = async (id) => {
        const sure = confirm("Are you sure you want to delete????");
        if (!sure) return;

        await axiosPublic.delete(`/dashboard/team/${id}`);
        refetch();
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-4 sm:mb-0">
                    Admin Portfolio Dashboard
                </h1>
                <button
                    onClick={() => navigate("/dashboard/team/add-member")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add Member
                </button>
            </div>

            {/* LIST */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={membersList.map((m) => m._id)} strategy={verticalListSortingStrategy}>
                    {membersList.map((member) => (
                        <Row key={member._id} member={member} onDelete={handleDelete} navigate={navigate} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
