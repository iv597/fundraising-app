"use client";

import { Prisma } from "@/generated/prisma";
import { formatDateShort } from "@/lib/utils";
import { useRouter } from "next/navigation";
import FundraiserCardItem from "@/components/FundraiserCardItem";
import SectionHeader from "@/components/SectionHeader";

type Props = {
    donations: Prisma.DonationGetPayload<{
        include: {
            program: { include: { category: true; organization: true } };
        };
    }>[];
};

export default function RecentDonations({ donations }: Props) {
    const router = useRouter();

    const handleViewHistory = () => {
        router.push("/donation-history");
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <SectionHeader title="Recent Donations" />

            <div className="space-y-4">
                {donations.map((donation) => (
                    <FundraiserCardItem
                        key={donation.id}
                        id={donation.id}
                        title={donation.program.name}
                        category={donation.program.category?.name}
                        amount={donation.amount / 100}
                        date={formatDateShort(donation.createdAt)}
                        showDonateButton={true}
                        programId={donation.programId}
                        organizationId={donation.program.organization.id}
                    />
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                    onClick={handleViewHistory}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                >
                    View Donation History
                </button>
            </div>
        </div>
    );
}
