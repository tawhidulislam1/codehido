import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useDeveloper from '../Hooks/useDeveloper';

const DeveloperRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isDeveloper, isDeveloperLoading] = useDeveloper();
    const location = useLocation();

    if (loading || isAdminLoading || isDeveloperLoading) {
        return (
            <div className="loading-container">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        );
    }

    const isAllowed = Boolean(user) && (Boolean(isAdmin) || Boolean(isDeveloper));

    if (isAllowed) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default DeveloperRoute;
