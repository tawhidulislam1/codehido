import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Page/Home/Home";
import About from "../Page/About/About";
import Service from "../Page/Service/Service";
import Connect from "../Page/Connect/Connect";
import TeamMemberPage from "../Page/TeamMemberDetails/TeamMemberDetails";
import ServicesDetails from "../Page/ServiceDetails/ServicesDetails";
import Testimonial from "../Page/Testimonial/Testimonial";
import NotfoundPage from "../Page/NotfoundPage/NotfoundPage";
import Portfolio from "../Page/Portfolio/Portfolio";
import Teams from "../Page/Teams/Teams";
import Login from "../Page/Auth/Login";
import Register from "../Page/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUsers from "../Page/Dashboard/allUser/AllUser";
import AdminRoute from "./AdmintRoute";
import DeveloperRoute from "./DeveloperRoute";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useDeveloper from "../Hooks/useDeveloper";
import Dashboard from "../Page/Dashboard/Dashboard/Dashboard";
import AdminPortfolio from "../Page/Dashboard/Portfolio/Portfolio";
import AddPortfolio from "../Page/Dashboard/Portfolio/AddProfolio";
import EditPortfolio from "../Page/Dashboard/Portfolio/EditProfolio";
import ViewPortfolio from "../Page/Portfolio/viewPortfolio";
import TeamTable from "../Page/Dashboard/Teams/TeamList";
import AddTeamMember from "../Page/Dashboard/Teams/addTeamMember";
import EditTeamMember from "../Page/Dashboard/Teams/EditTeamMember";
import Profile from "../Page/Profile/Profile";
import Services from "../Page/Dashboard/Services/Services";
import AddService from "../Page/Dashboard/Services/AddService";
import EditService from "../Page/Dashboard/Services/EditService";
import BlogList from "../Page/Dashboard/Blog/BlogList";
import AddBlog from "../Page/Dashboard/Blog/AddBlog";
import EditBlog from "../Page/Dashboard/Blog/EditBlog";
import ReviewList from "../Page/Dashboard/Reviews/ReviewList";
import Blog from "../Page/Blog/Blog";
import BlogDetails from "../Page/Blog/BlogDetails";
import Donation from "../Page/Donation/Donation";
import ContentManagement from "../Page/Dashboard/Content/ContentManagement";
import DonationRequests from "../Page/Dashboard/Donation/DonationRequests";
import PortfolioDetails from "../Page/Dashboard/Portfolio/PortfolioDetails";
import BlogDetailsDashboard from "../Page/Dashboard/Blog/BlogDetails";
import UserDetails from "../Page/Dashboard/allUser/UserDetails";
import ServiceDetails from "../Page/Dashboard/Services/ServiceDetails";
import TeamMemberDetailsDashboard from "../Page/Dashboard/Teams/TeamDetails";
import ReviewDetails from "../Page/Dashboard/Reviews/ReviewDetails";
import DonationRequestDetails from "../Page/Dashboard/Donation/DonationRequestDetails";
import ContactList from "../Page/Dashboard/Contact/ContactList";
import ContactDetails from "../Page/Dashboard/Contact/ContactDetails";
import ProjectList from "../Page/Dashboard/Project/ProjectList";
import ProjectDetails from "../Page/Dashboard/Project/ProjectDetails";
import AddProject from "../Page/Dashboard/Project/AddProject";
import EditProject from "../Page/Dashboard/Project/EditProject";
import MyAccountLayout from "../Page/MyAccount/MyAccountLayout";
import MyReviews from "../Page/MyAccount/MyReviews";
import MyMessages from "../Page/MyAccount/MyMessages";
import MyDonations from "../Page/MyAccount/MyDonations";
import ChangePassword from "../Page/MyAccount/ChangePassword";

const DashboardAccessGuard = () => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isDeveloper, isDeveloperLoading] = useDeveloper();

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

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin || isDeveloper) {
        return <DashboardLayout />;
    }

    return <Navigate to="/my-account/profile" replace />;
};

const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/services',
                element: <Service />
            },
            {
                path: '/services/:id',
                element: <ServicesDetails />
            },
            {
                path: '/servicesDetals',
                element: <ServicesDetails />
            },
            {
                path: '/contact',
                element: <Connect />
            },
            {
                path: '/memberDetails',
                element: <TeamMemberPage />
            },
            {
                path: '/testimonial',
                element: <Testimonial />
            },
            {
                path: '/portfolio',
                element: <Portfolio />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/blog/:id',
                element: <BlogDetails />
            },
            {
                path: '/teams',
                element: <Teams />
            },
            {
                path: '/donation',
                element: <Donation />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/Register',
                element: <Register />
            },
            {
                path: '/portfolio/:id',
                element: <ViewPortfolio></ViewPortfolio>,

            },
            {
                path: "*",
                element: <NotfoundPage />,
            },

        ]


    },
    {
        path: 'my-account',
        element: <PrivateRoute><MyAccountLayout /></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: 'reviews',
                element: <PrivateRoute><MyReviews /></PrivateRoute>
            },
            {
                path: 'messages',
                element: <PrivateRoute><MyMessages /></PrivateRoute>
            },
            {
                path: 'donations',
                element: <PrivateRoute><MyDonations /></PrivateRoute>
            },
            {
                path: 'change-password',
                element: <PrivateRoute><ChangePassword /></PrivateRoute>
            },
            {
                path: '',
                element: <PrivateRoute><Profile /></PrivateRoute>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardAccessGuard />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/dashboard" replace />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'users/:id',
                element: <AdminRoute><UserDetails /></AdminRoute>
            },
            {
                path: 'dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: 'portfolio',
                element: <DeveloperRoute><AdminPortfolio></AdminPortfolio></DeveloperRoute>
            },
            {
                path: 'portfolio/:id',
                element: <DeveloperRoute><PortfolioDetails /></DeveloperRoute>
            },
            {
                path: 'add-portfolio',
                element: <DeveloperRoute><AddPortfolio></AddPortfolio></DeveloperRoute>
            },
            {
                path: 'edit-portfolio/:id',
                element: <DeveloperRoute><EditPortfolio></EditPortfolio></DeveloperRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/portfolio/${params.id}`).then(res => res.json())
            },
            {
                path: 'service',
                element: <Services />
            },
            {
                path: 'service/:id',
                element: <AdminRoute><ServiceDetails /></AdminRoute>
            },
            {
                path: 'add-service',
                element: <AddService />
            },
            {
                path: 'edit-service/:id',
                element: <EditService />,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/service/${params.id}`).then(res => res.json())
            },
            {
                path: 'blog',
                element: <DeveloperRoute><BlogList /></DeveloperRoute>
            },
            {
                path: 'blog/:id',
                element: <DeveloperRoute><BlogDetailsDashboard /></DeveloperRoute>
            },
            {
                path: 'add-blog',
                element: <DeveloperRoute><AddBlog /></DeveloperRoute>
            },
            {
                path: 'edit-blog/:id',
                element: <DeveloperRoute><EditBlog /></DeveloperRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blog/${params.id}`).then(res => res.json())
            },
            //? team page
            {
                path: 'team',
                element: <TeamTable></TeamTable>,
            },
            {
                path: 'team/:id',
                element: <AdminRoute><TeamMemberDetailsDashboard /></AdminRoute>
            },
            {
                path: 'team/add-member',
                element: <AddTeamMember />
            },
            {
                path: 'team/edit/:id',
                element: <EditTeamMember />
            },
            {
                path: 'content',
                element: <ContentManagement />
            },
            {
                path: 'donation-request',
                element: <DonationRequests />
            },
            {
                path: 'donation-request/:id',
                element: <AdminRoute><DonationRequestDetails /></AdminRoute>
            },
            {
                path: 'reviews',
                element: <DeveloperRoute><ReviewList /></DeveloperRoute>
            },
            {
                path: 'reviews/:id',
                element: <DeveloperRoute><ReviewDetails /></DeveloperRoute>
            },
            {
                path: 'project',
                element: <DeveloperRoute><ProjectList /></DeveloperRoute>
            },
            {
                path: 'project/:id',
                element: <DeveloperRoute><ProjectDetails /></DeveloperRoute>
            },
            {
                path: 'project/add',
                element: <AdminRoute><AddProject /></AdminRoute>
            },
            {
                path: 'project/edit/:id',
                element: <AdminRoute><EditProject /></AdminRoute>
            },
            {
                path: 'contact',
                element: <DeveloperRoute><ContactList /></DeveloperRoute>
            },
            {
                path: 'contact/:id',
                element: <DeveloperRoute><ContactDetails /></DeveloperRoute>
            },
            {
                path: 'change-password',
                element: <DeveloperRoute><ChangePassword /></DeveloperRoute>
            },
        ]
    }

]);
export default Router