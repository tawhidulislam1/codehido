import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useDeveloper = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isDeveloper = [], isPending: isDeveloperLoading } = useQuery({
        queryKey: [user?.email, "developer"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/developer/${user.email}`);
            return res.data;
        }
    });
    return [isDeveloper, isDeveloperLoading];
};

export default useDeveloper;