import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";
import MissionVision from "./Components/MissionVision";
import WhyUs from "./Components/WhyUs";

const About = () => {
    return (
        <div>
            <AboutSection></AboutSection>
            <MissionVision></MissionVision>
            <TeamSection></TeamSection>
            <WhyUs></WhyUs>
            <Testimonials></Testimonials>
        </div>
    );
};

export default About;