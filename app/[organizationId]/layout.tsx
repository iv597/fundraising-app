import Navbar from "@/components/Navbar";

export default function OrganizationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto p-4">{children}</main>
        </>
    );
}
