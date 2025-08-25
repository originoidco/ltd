import Hero from "./components/nav/hero";
import { Projects } from "./components/nav/projects";
import { Vision } from "./components/nav/vision";
import { Socials } from "./components/nav/socials";
import { Stats } from "./components/nav/stats";
import { Footer } from "./components/nav/footer";
import { Team } from "./components/nav/team";

export default function Home() {
    return (
        <div>
            {" "}
            <Hero />
            <Stats />
            <Projects />
            <Vision />
            <Team />
            <Socials />
            <Footer />{" "}
        </div>
    );
}
