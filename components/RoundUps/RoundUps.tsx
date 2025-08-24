import FundraiserCardItem from "@/components/FundraiserCardItem";
import SectionHeader from "@/components/SectionHeader";

type RoundUpItem = {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: string;
};

type Props = {
    roundUps: RoundUpItem[];
    totalAmount: number;
    upcomingDate: string;
};

export default function RoundUps({
    roundUps,
    totalAmount,
    upcomingDate,
}: Props) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <SectionHeader
                title="Round-ups"
                count={roundUps.length}
                upcomingDonations={{
                    amount: totalAmount.toFixed(2),
                    date: upcomingDate,
                }}
            />

            <div className="space-y-4">
                {roundUps.map((item) => (
                    <FundraiserCardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        amount={item.amount}
                        frequency="Round Up"
                    />
                ))}
            </div>
        </div>
    );
}
