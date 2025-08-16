import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";
import MissionVision from "./Components/MissionVision";

const About = () => {
    return (
        <div>
            <AboutSection></AboutSection>
            <MissionVision></MissionVision>
            <TeamSection></TeamSection>
            <Testimonials></Testimonials>
        </div>
    );
};

export default About;