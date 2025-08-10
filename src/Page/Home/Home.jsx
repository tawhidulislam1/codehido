import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Service from "./components/Service";
import Testimonials from "./components/Testimonials";


const Home = () => {
    return (
        <div className="flex flex-col gap-16">
            <Hero />
            <Service />
            <About />
            <Portfolio />
            <Testimonials />
               
        </div>

    );
};

export default Home;