"use client";

import { useRouter } from "next/navigation";

type FundraiserCardItemProps = {
    id: number;
    title: string;
    category?: string;
    amount: number;
    date?: string;
    frequency?: string;
    showDonateButton?: boolean;
    programId?: number;
    organizationId?: string;
    amountPrefix?: string;
};

export default function FundraiserCardItem({
    id,
    title,
    category,
    amount,
    date,
    frequency,
    showDonateButton = false,
    programId,
    organizationId,
    amountPrefix,
}: FundraiserCardItemProps) {
    const router = useRouter();

    const handleDonateAgain = () => {
        if (programId && organizationId) {
            router.push(`/${organizationId}/programs/${programId}`);
        }
    };

    return (
        <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <img src="https://placehold.co/40x40" alt="" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {title}
                        </p>
                        {category && (
                            <p className="text-xs text-gray-500">{category}</p>
                        )}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                        {amountPrefix && `${amountPrefix}/ `}$
                        {amount.toFixed(2)}
                    </p>
                    {frequency && (
                        <p className="text-xs text-gray-500">{frequency}</p>
                    )}
                    {date && <p className="text-xs text-gray-500">{date}</p>}
                </div>
            </div>
            {showDonateButton && programId && organizationId && (
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleDonateAgain}
                        className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                        Donate again
                    </button>
                </div>
            )}
        </div>
    );
}
