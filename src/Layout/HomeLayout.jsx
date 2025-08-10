import { Outlet } from "react-router-dom";
import Navbar from "../Page/SharedFile/Navbar";
import Footer from "../Page/SharedFile/Footer";


const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <main className="w-11/12 mx-auto max-w-7xl mt-24">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;