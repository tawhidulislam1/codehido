import { useQuery } from "@tanstack/react-query";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";
import MissionVision from "./Components/MissionVision";
import WhyUs from "./Components/WhyUs";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const fallbackAbout = {
    title: "Why Choose CodeHido?",
    subtitle: "Built for ambitious brands.",
    text: "At CodeHido, we are committed to delivering innovative, scalable, and visually stunning digital solutions that empower your business to thrive in the competitive digital era.",
};

const About = () => {
    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ["content-about"],
        queryFn: async () => {
            const res = await axiosPublic.get("/content/about");
            return res.data;
        },
        retry: false,
    });

    const aboutContent = data && typeof data === "object" ? data : fallbackAbout;

    return (
        <div>
            <AboutSection content={aboutContent} />
            <MissionVision></MissionVision>
            <TeamSection></TeamSection>
            <WhyUs></WhyUs>
            <Testimonials></Testimonials>
        </div>
    );
};

export default About;