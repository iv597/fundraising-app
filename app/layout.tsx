import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
    title: "Fundraising App",
    description: "A fundraising application with Clerk authentication",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <Navbar />
                    <main className="max-w-7xl mx-auto p-4">{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}
