import { useEffect, useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import useImageUpload from "../Hooks/useImageUpload";

export default function ImageUpload({ onUploaded, existingImageUrl = "" }) {
    const [preview, setPreview] = useState(existingImageUrl || "");
    const { uploadImage, uploading } = useImageUpload();

    useEffect(() => {
        setPreview(existingImageUrl || "");
    }, [existingImageUrl]);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) {
                setPreview(uploadedUrl);
                onUploaded?.(uploadedUrl);
            }
        } catch {
            setPreview(existingImageUrl || "");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative inline-block">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg ring-2 ring-blue-200 ring-offset-2 ring-offset-white">
                    {preview ? (
                        <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-slate-100 text-slate-400">
                            <ImageIcon className="h-10 w-10" />
                        </div>
                    )}
                </div>

                <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700">
                    <Camera className="h-4 w-4" />
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
            </div>

            <p className="text-center text-xs text-slate-500">
                {uploading ? "Uploading photo..." : "Choose a profile photo"}
            </p>
        </div>
    );
}
