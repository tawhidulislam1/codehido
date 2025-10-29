import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxosPublic from "./useAxiosPublic";


const useDeveloper = () => {

    const { user } = useAuth();
    const axiosPublic = useAxosPublic();
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