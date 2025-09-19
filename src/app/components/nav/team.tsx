"use client";

import { Spotlight } from "~/app/components/motion/spotlight";
import { Tilt } from "~/app/components/motion/tilt";
import Image from "next/image";
import { useState } from "react";

type TeamMember = {
    firstName?: string;
    lastName?: string;
    nickname: string;
    role: string;
    // THIS IS FOR TESTING.
    hasImg?: boolean;
    description: string;
};

const team = [
    {
        firstName: "Marcel",
        lastName: "Elias",
        nickname: "dromzeh",
        role: "Founder, Lead Developer",
        description:
            "Programming since consciousness. Handles all development and overall project direction.",
        hasImg: true,
    },
    // {
    //     firstName: "Em",
    //     nickname: "detectve",
    //     role: "Software Engineer Intern",
    //     hasImg: true,
    //     description:
    //         "Makes unspeakable clutches when it comes to Uno. Frontend Software Engineer Intern for Originoid's Website.",
    // },
    {
        nickname: "ambre",
        role: "Advisor, Community Moderator",
        description:
            "Cranked at arsenal. Community Moderator also known as Originoid's unofficial official Discord log watcher.",
        hasImg: true,
    },
    {
        firstName: "Val",
        nickname: "Ceewe",
        role: "Advisor, Moderator",
        hasImg: true,
        description:
            "Used to draw with just one finger on a 5 year old phone that had a cracked screen. Community & Platform Mod.",
    },
    {
        nickname: "77",
        role: "Platform Moderator",
        hasImg: true,
        description:
            "Moderately passionate over Umamusume. Quit LoL to become a Founding Platform Moderator for Originoid.",
    },
];

export function Team() {
    return (
        <div
            className="w-full bg-[#0C0A09] py-16 selection:bg-[#F8F8F8] selection:text-[#0C0A09]"
            id="team"
        >
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-instrument-serif text-[#F8F8F8] mb-8">
                        Who We Are
                    </h2>
                    <div className="max-w-5xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 justify-items-center place-items-center mx-auto max-w-fit">
                            {team.map((member, index) => (
                                <TeamCard key={index} member={member} />
                            ))}
                            {/* <HiringCard /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HiringCard() {
    return (
        <div className="max-w-[250px] text-left">
            <div className="mb-4">
                <Tilt
                    rotationFactor={6}
                    isRevese
                    style={{
                        transformOrigin: "center center",
                    }}
                    springOptions={{
                        stiffness: 26.7,
                        damping: 4.1,
                        mass: 0.2,
                    }}
                    className="group relative rounded-lg"
                >
                    <Spotlight
                        className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
                        size={248}
                        springOptions={{
                            stiffness: 26.7,
                            damping: 4.1,
                            mass: 0.2,
                        }}
                    />
                    <Image
                        src={`/team/hiring-placeholder.png`}
                        alt="placeholder"
                        width={400}
                        height={400}
                        className="w-[250px] object-cover rounded-lg saturate-50 duration-700 group-hover:saturate-100"
                    />
                </Tilt>
            </div>
            <h3 className="text-lg text-[#F8F8F8] font-instrument-serif">
                Could be you!
            </h3>
            <h4 className="text-sm text-[#F8F8F8]">We're hiring</h4>
            <p className="text-[#F8F8F8]/70 text-sm mt-2">
                We're looking for Platform Moderators and Hono/Expo/Next.js
                Developers. Email careers@originoid.co.
            </p>
        </div>
    );
}

function TeamCard({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="max-w-[250px] text-left">
            <div className="mb-4">
                <Tilt
                    rotationFactor={6}
                    isRevese
                    style={{
                        transformOrigin: "center center",
                    }}
                    springOptions={{
                        stiffness: 26.7,
                        damping: 4.1,
                        mass: 0.2,
                    }}
                    className="group relative rounded-lg"
                >
                    <Spotlight
                        className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
                        size={248}
                        springOptions={{
                            stiffness: 26.7,
                            damping: 4.1,
                            mass: 0.2,
                        }}
                    />
                    <Image
                        src={
                            member.hasImg
                                ? `/team/${member.nickname.toLowerCase()}-icon.png`
                                : // placeholder..
                                  `/team/hiring-placeholder.png`
                        }
                        alt={`${member.firstName} ${member.lastName} (${member.nickname})`}
                        width={400}
                        height={400}
                        className="w-[250px] object-cover rounded-lg saturate-50 duration-700 group-hover:saturate-100"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </Tilt>
            </div>
            <h3 className="text-lg text-[#F8F8F8] font-instrument-serif">
                {member.firstName && member.lastName ? (
                    <>
                        {member.firstName}{" "}
                        <span className="text-[#F8F8F8]/70">
                            "{member.nickname}"
                        </span>{" "}
                        {member.lastName}
                    </>
                ) : member.firstName ? (
                    <>
                        {member.firstName}{" "}
                        <span className="text-[#F8F8F8]/70">aka</span>{" "}
                        <span className="text-[#F8F8F8]/70">
                            "{member.nickname}"
                        </span>
                    </>
                ) : (
                    <span className="text-[#F8F8F8]/70">
                        "{member.nickname}"
                    </span>
                )}
            </h3>
            <h4 className="text-sm text-[#F8F8F8]">{member.role}</h4>
            <p className="text-[#F8F8F8]/70 text-sm mt-2">
                {member.description}
            </p>
        </div>
    );
}
