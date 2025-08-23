type Props = {
    isRecurring: boolean;
    frequency: number;
    options: { id: number; name: string }[];
    onRecurringChange: (isRecurring: boolean) => void;
    onFrequencyChange: (frequency: number) => void;
};

export default function RecurringOptions({
    isRecurring,
    frequency,
    options,
    onRecurringChange,
    onFrequencyChange,
}: Props) {
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
                        {options.map((option) => (
                            <button
                                key={option.id.toString()}
                                type="button"
                                onClick={() => onFrequencyChange(option.id)}
                                className={`btn btn-outline ${
                                    frequency === option.id
                                        ? "btn-primary"
                                        : "btn-ghost"
                                } border-gray-300 hover:border-primary`}
                            >
                                {option.name}
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
