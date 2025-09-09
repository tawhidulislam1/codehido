

import About from "../components/AboutSection";
import Portfolio from "../components/Portfolio";
import Service from "../components/Service";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";
import Hero from "./components/Hero";


const Home = () => {
    return (
        <div className="flex flex-col gap-16">
            <Hero />
            <Service />
            <TeamSection />
            <About />
            <Portfolio />
            <Testimonials />

        </div>

    );
};

export default Home;