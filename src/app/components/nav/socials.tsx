import FlowingMenu from "../motion/flow-menu";

const demoItems = [
    {
        link: "https://x.com/originoidco",
        text: "Twitter",
        secondaryText: "x.com/originoidco",
    },

    {
        link: "https://github.com/originoidco",
        text: "GitHub",
        secondaryText: "github.com/originoidco",
    },

    {
        link: "https://discord.gg/noid",
        text: "Discord",
        secondaryText: "discord.gg/noid",
    },

    {
        link: "mailto:marcel@originoid.co",
        text: "Contact",
        secondaryText: "send an email",
    },
];

export function Socials() {
    return (
        <div className="h-[500px] w-full bg-white" id="socials">
            <FlowingMenu items={demoItems} />
        </div>
    );
}
