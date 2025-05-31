interface SectionHeaderProps {
    children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
    return (
        <h2 className="text-2xl md:text-3xl text-white font-instrument-serif mb-8">
            {children}
        </h2>
    );
}
