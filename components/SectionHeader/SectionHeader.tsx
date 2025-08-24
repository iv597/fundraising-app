type SectionHeaderProps = {
    title: string;
    subtitle?: string;
    count?: number;
    upcomingDonations?: {
        amount: string;
        date: string;
    };
};

export default function SectionHeader({
    title,
    subtitle = "Non-profits",
    count,
    upcomingDonations,
}: SectionHeaderProps) {
    return (
        <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {title}
                </h3>
                {count !== undefined && (
                    <>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                        <p className="text-sm text-gray-500">{count}</p>
                    </>
                )}
            </div>
            {upcomingDonations && (
                <div className="text-right">
                    <p className="text-sm text-gray-500">Upcoming Donations</p>
                    <p className="text-xl font-bold text-gray-900">
                        ${upcomingDonations.amount}
                    </p>
                    <p className="text-sm text-gray-500">Scheduled</p>
                    <p className="text-sm text-gray-500">
                        {upcomingDonations.date}
                    </p>
                </div>
            )}
        </div>
    );
}
