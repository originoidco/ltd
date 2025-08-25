import Hero from "./components/nav/hero";
import { Projects } from "./components/nav/projects";
import { Vision } from "./components/nav/vision";
import { Socials } from "./components/nav/socials";
import { Stats } from "./components/nav/stats";
import { Footer } from "./components/nav/footer";
import { Team } from "./components/nav/team";
import PillNav from "./components/nav/nav";

export default function Home() {
    return (
        <div>
            <PillNav
                logo={"/originoid-dark.svg"}
                logoAlt="logo"
                items={[
                    { label: "Projects", href: "/#projects" },
                    {
                        label: "Vision",
                        href: "/#vision",
                    },
                    {
                        label: "Team",
                        href: "/#team",
                    },
                ]}
                activeHref="/"
                className="custom-nav"
                ease="power2.easeOut"
                initialLoadAnimation={false}
            />
            <Hero />
            <Stats />
            <Projects />
            <Vision />
            <Team />
            <Socials />
            <Footer />
        </div>
    );
}
