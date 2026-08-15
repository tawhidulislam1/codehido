import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error?.response?.status;
        if (status === 401) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
