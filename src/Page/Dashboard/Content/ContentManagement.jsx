import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const sectionConfig = [
  {
    key: "hero",
    label: "Hero Section",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "btnText", label: "Button Text", type: "text" },
      { name: "btnLink", label: "Button Link", type: "text" },
      { name: "videoLink", label: "Video Link", type: "text" },
      { name: "imgSrc", label: "Image URL", type: "text" },
    ],
  },
  {
    key: "about",
    label: "About Section",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "text", label: "Text", type: "textarea" },
    ],
  },
  {
    key: "footer",
    label: "Footer Section",
    fields: [
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "address", label: "Address", type: "text" },
    ],
  },
];

const normalizeContentData = (value) => {
  if (Array.isArray(value)) {
    return value.reduce((acc, item) => {
      if (item && typeof item === "object") {
        const key = item.section || item.key || item.name;
        if (key) {
          acc[key] = { ...acc[key], ...item };
        }
      }
      return acc;
    }, {});
  }

  if (value && typeof value === "object") {
    if (value.result && typeof value.result === "object") {
      return normalizeContentData(value.result);
    }
    if (value.data && typeof value.data === "object") {
      return normalizeContentData(value.data);
    }
    return value;
  }

  return {};
};

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [formState, setFormState] = useState({});

  const { data: contentData = {}, refetch, isLoading } = useQuery({
    queryKey: ["content-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/content");
      return res.data;
    },
  });

  useEffect(() => {
    const normalized = normalizeContentData(contentData);
    const nextState = {};

    sectionConfig.forEach(({ key, fields }) => {
      const sectionData = normalized[key] || {};
      nextState[key] = {};

      fields.forEach(({ name }) => {
        nextState[key][name] = sectionData[name] || "";
      });
    });

    setFormState(nextState);
  }, [contentData]);

  const handleFieldChange = (sectionKey, fieldName, value) => {
    setFormState((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [fieldName]: value,
      },
    }));
  };

  const handleSave = async (sectionKey) => {
    try {
      await axiosSecure.put(`/dashboard/content/${sectionKey}`, formState[sectionKey] || {});
      Swal.fire({
        title: "Section updated!",
        text: `${sectionKey.toUpperCase()} content saved successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      console.error("Content update error:", error);
      Swal.fire({
        title: "Update failed",
        text: error?.response?.data?.message || "Something went wrong while saving the section.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-[#2974FF] font-semibold">
        Loading content blocks...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0F172A]">Content Management</h2>
        <p className="text-[#475569] mt-2">
          Update the public site content for the hero, about, and footer sections.
        </p>
      </div>

      <div className="grid gap-6">
        {sectionConfig.map(({ key, label, fields }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-[#0F172A]">{label}</h3>
              <button
                type="button"
                onClick={() => handleSave(key)}
                className="bg-[#2974FF] hover:bg-[#1558D6] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save {label}
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {fields.map(({ name, label: fieldLabel, type }) => (
                <div key={name} className={type === "textarea" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    {fieldLabel}
                  </label>

                  {type === "textarea" ? (
                    <textarea
                      value={formState[key]?.[name] || ""}
                      onChange={(e) => handleFieldChange(key, name, e.target.value)}
                      rows={5}
                      className="w-full border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
                    />
                  ) : (
                    <input
                      type={type}
                      value={formState[key]?.[name] || ""}
                      onChange={(e) => handleFieldChange(key, name, e.target.value)}
                      className="w-full border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
