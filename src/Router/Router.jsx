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
                path: '/contact',
                element: <Connect />
            },
            {
                path: '/memberDetails',
                element: <TeamMemberPage />
            },
            {
                path: '/servicesDetals',
                element: <ServicesDetails />
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
                path: "*",
                element: <NotfoundPage />,
            },
        ]


    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    }

]);
export default Router