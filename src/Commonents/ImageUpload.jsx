import { useEffect, useState } from "react";
import useImageUpload from "../Hooks/useImageUpload";

export default function ImageUpload({ onUploaded, existingImageUrl = "" }) {
    const [preview, setPreview] = useState(existingImageUrl || "");
    const { uploadImage, uploading } = useImageUpload();

    useEffect(() => {
        if (!existingImageUrl) {
            setPreview("");
        }
    }, [existingImageUrl]);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        try {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) {
                setPreview(uploadedUrl);
                onUploaded?.(uploadedUrl);
            }
        } catch (error) {
            setPreview(existingImageUrl || "");
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            />

            {preview && (
                <div className="mt-3">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                    />
                </div>
            )}

            {uploading && (
                <p className="mt-2 text-sm text-blue-600">Uploading image...</p>
            )}
        </div>
    );
}
