import { useState } from "react";
import axios from "axios";

const imageHostingKey = import.meta.env.VITE_IMAGE_API;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const useImageUpload = () => {
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file) => {
        if (!file) return null;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const imageRes = await axios.post(imageHostingApi, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (!imageRes.data?.success) {
                throw new Error("Image upload failed. Please try again!");
            }

            return imageRes.data.data.display_url;
        } catch (error) {
            console.error("Image upload error:", error.message);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
};

export default useImageUpload;
