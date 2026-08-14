import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeveloper = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDeveloper = [], isPending: isDeveloperLoading } = useQuery({
        queryKey: [user?.email, "developer"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/developer/${user.email}`);
            return res.data;
        }
    });
    return [isDeveloper, isDeveloperLoading];
};

export default useDeveloper;