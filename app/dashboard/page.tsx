import TotalDonatedCard from "@/components/TotalDonatedCard";
import RoundUps from "@/components/RoundUps";
import ScheduledRoundUps from "@/components/ScheduledRoundUps";
import ScheduledDonations from "@/components/ScheduledDonations";
import RecentDonations from "@/components/RecentDonations";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { formatDateShort } from "@/lib/utils";
import React from "react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/login");
    }

    const member = await prisma.member.findUnique({
        where: { id: userId },
        include: {
            donations: {
                include: {
                    program: {
                        include: {
                            organization: true,
                            category: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 2,
            },
            subscriptions: {
                include: {
                    program: true,
                },
                where: {
                    status: "ACTIVE",
                },
            },
        },
    });

    if (!member) {
        return <div>Member not found.</div>;
    }

    const totalAmount = Math.round(member.donationsTotalAmount / 100);

    const mockRoundUps = [
        {
            id: 1,
            title: "Fundraiser title",
            category: "Category | Goal Info",
            amount: 7.5,
            date: formatDateShort(new Date()),
        },
        {
            id: 2,
            title: "Fundraiser title",
            category: "Category",
            amount: 7.5,
            date: formatDateShort(new Date()),
        },
    ];

    const mockScheduledRoundUps = [
        {
            id: 1,
            title: "Fundraiser title",
            category: "Category",
            amount: 17.5,
            date: "08.31.2025",
        },
        {
            id: 2,
            title: "Fundraiser title",
            category: "Category",
            amount: 5.5,
            date: "09.15.2025",
        },
    ];

    const mockScheduledDonations = [
        {
            id: 1,
            title: "Fundraiser title",
            category: "Category",
            amount: 18.34,
            frequency: "round up",
            date: "08.31.2025",
        },
        {
            id: 2,
            title: "Fundraiser title",
            category: "Category",
            amount: 25.0,
            frequency: "monthly",
            date: "08.31.2025",
        },
        {
            id: 3,
            title: "Fundraiser title",
            category: "Category",
            amount: 10.0,
            frequency: "weekly",
            date: "09.15.2025",
        },
    ];

    return (
        <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4">
            <TotalDonatedCard amount={totalAmount} />

            <RoundUps
                roundUps={mockRoundUps}
                totalAmount={15.0}
                upcomingDate="08.31.2025"
            />

            <ScheduledRoundUps scheduledRoundUps={mockScheduledRoundUps} />

            <ScheduledDonations scheduledDonations={mockScheduledDonations} />

            <RecentDonations donations={member.donations} />
        </div>
    );
}
