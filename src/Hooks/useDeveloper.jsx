import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeveloper = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDeveloper = false, isPending: isDeveloperLoading } = useQuery({
        queryKey: [user?.email, 'developer'],
        enabled: !!user?.email,
        retry: false,
        queryFn: async () => {
            if (!user?.email) return false;
            const res = await axiosSecure.get(`/user/developer/${user.email}`);
            return Boolean(res.data?.developer);
        }
    });
    return [isDeveloper, isDeveloperLoading];
};

export default useDeveloper;