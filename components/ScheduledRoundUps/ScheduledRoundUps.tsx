import FundraiserCardItem from "@/components/FundraiserCardItem";
import SectionHeader from "@/components/SectionHeader";

type ScheduledRoundUpItem = {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: string;
};

type Props = {
    scheduledRoundUps: ScheduledRoundUpItem[];
};

export default function ScheduledRoundUps({ scheduledRoundUps }: Props) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <SectionHeader
                title="Scheduled Round-ups"
                count={scheduledRoundUps.length}
            />

            <div className="space-y-4">
                {scheduledRoundUps.map((item) => (
                    <FundraiserCardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        amount={item.amount}
                        date={item.date}
                    />
                ))}
            </div>
        </div>
    );
}
