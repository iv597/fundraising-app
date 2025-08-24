import FundraiserCardItem from "@/components/FundraiserCardItem";
import SectionHeader from "@/components/SectionHeader";

type ScheduledDonationItem = {
    id: number;
    title: string;
    category: string;
    amount: number;
    frequency: string;
    date: string;
};

type Props = {
    scheduledDonations: ScheduledDonationItem[];
};

export default function ScheduledDonations({ scheduledDonations }: Props) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <SectionHeader
                title="Scheduled Donations"
                count={scheduledDonations.length}
            />

            <div className="space-y-4">
                {scheduledDonations.map((item) => (
                    <FundraiserCardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        amount={item.amount}
                        date={item.date}
                        amountPrefix={item.frequency}
                    />
                ))}
            </div>
        </div>
    );
}
