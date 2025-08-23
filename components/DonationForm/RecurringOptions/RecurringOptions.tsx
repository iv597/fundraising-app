type Props = {
    isRecurring: boolean;
    frequency: string;
    onRecurringChange: (isRecurring: boolean) => void;
    onFrequencyChange: (frequency: string) => void;
};

export default function RecurringOptions({
    isRecurring,
    frequency,
    onRecurringChange,
    onFrequencyChange,
}: Props) {
    const frequencies = [
        { id: "weekly", label: "Weekly" },
        { id: "monthly", label: "Monthly" },
        { id: "quarterly", label: "Quarterly" },
        { id: "annually", label: "Annually" },
    ];

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">
                Contribute even more by making it recurring?
            </h3>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => onRecurringChange(true)}
                    className={`btn flex-1 ${
                        isRecurring ? "btn-primary" : "btn-outline"
                    }`}
                >
                    Make it recurring
                </button>
                <button
                    type="button"
                    onClick={() => onRecurringChange(false)}
                    className={`btn flex-1 ${
                        !isRecurring ? "btn-primary" : "btn-outline"
                    }`}
                >
                    Once is enough
                </button>
            </div>

            {isRecurring && (
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                        Choose frequency
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {frequencies.map((freq) => (
                            <button
                                key={freq.id}
                                type="button"
                                onClick={() => onFrequencyChange(freq.id)}
                                className={`btn btn-outline ${
                                    frequency === freq.id
                                        ? "btn-primary"
                                        : "btn-ghost"
                                } border-gray-300 hover:border-primary`}
                            >
                                {freq.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">
                        Next payment on:{" "}
                        <span className="font-medium">07.20.2025</span>
                    </p>
                </div>
            )}
        </div>
    );
}
