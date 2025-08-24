import Hero from "./components/nav/hero";
import { Projects } from "./components/nav/projects";
import { Socials } from "./components/nav/socials";
import { Stats } from "./components/nav/stats";

export default function Home() {
    return (
        <div>
            {" "}
            <Hero />
            <Stats />
            <Projects />
            <Socials />{" "}
        </div>
    );
}
