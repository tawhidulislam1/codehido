import { createBrowserRouter } from "react-router-dom";
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
import Dashboard from "../Page/Dashboard/Dashboard/Dashboard";
import AdminPortfolio from "../Page/Dashboard/Portfolio/Portfolio";
import AddProject from "../Page/Dashboard/Portfolio/AddProfolio";
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
import Blog from "../Page/Blog/Blog";
import BlogDetails from "../Page/Blog/BlogDetails";

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
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: 'portfolio',
                element: <AdminPortfolio></AdminPortfolio>
            },
            {
                path: 'add-portfolio',
                element: <AddProject></AddProject>
            },
            {
                path: 'edit-portfolio/:id',
                element: <EditPortfolio></EditPortfolio>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/portfolio/${params.id}`).then(res => res.json())
            },
            {
                path: 'service',
                element: <Services />
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
                element: <BlogList />
            },
            {
                path: 'add-blog',
                element: <AddBlog />
            },
            {
                path: 'edit-blog/:id',
                element: <EditBlog />,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blog/${params.id}`).then(res => res.json())
            },
            //? team page
            {
                path: 'team',
                element: <TeamTable></TeamTable>,
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
                path: 'profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },

        ]
    }

]);
export default Router