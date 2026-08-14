import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const AxiosSecure = useAxiosSecure();
    const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        retry: false,
        queryFn: async () => {
            if (!user?.email) return false;
            const res = await AxiosSecure.get(`/user/admin/${user.email}`);
            return Boolean(res.data?.admin);
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;