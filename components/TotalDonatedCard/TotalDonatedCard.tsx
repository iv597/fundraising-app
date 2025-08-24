type Props = {
    amount?: number;
};

export default function TotalDonatedCard({ amount }: Props) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
                Total Donated
            </h3>
            <div className="text-2xl font-bold text-gray-900">
                ${amount?.toFixed(2) || "0.00"}
            </div>
        </div>
    );
}
