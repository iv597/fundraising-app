type Props = {
    selectedOption: string;
    onOptionChange: (option: string) => void;
};

export default function DonationTypeSelection({
    selectedOption,
    onOptionChange,
}: Props) {
    return (
        <div className="space-y-3">
            <div
                className={`card card-border border-gray-900 bg-base-100 w-full mt-2 ${
                    selectedOption === "manual" ? "bg-gray-300 " : "bg-white "
                }`}
            >
                <div className="card-body flex flex-row items-center justify-between">
                    <div
                        className={`${
                            selectedOption === "manual"
                                ? "text-white"
                                : "text-gray-400"
                        }`}
                    >
                        <p
                            className={`font-medium font-semibold ${
                                selectedOption === "manual"
                                    ? "text-white"
                                    : "text-gray-500"
                            }`}
                        >
                            Standard Donation
                        </p>
                        <p>One time or monthly donation.</p>
                    </div>
                    <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        value="manual"
                        checked={selectedOption === "manual"}
                        onChange={(e) => onOptionChange(e.target.value)}
                    />
                </div>
            </div>

            <div
                className={`card card-border border-gray-900 bg-base-100 w-full mt-2 ${
                    selectedOption === "plaid" ? "bg-gray-300 " : "bg-white "
                }`}
            >
                <div className="card-body flex flex-row items-center justify-between">
                    <div
                        className={`${
                            selectedOption === "plaid"
                                ? "text-white"
                                : "text-gray-400"
                        }`}
                    >
                        <p
                            className={`font-medium font-semibold ${
                                selectedOption === "plaid"
                                    ? "text-white"
                                    : "text-gray-500"
                            }`}
                        >
                            Round Up Spare Change Donation
                        </p>
                        <p>
                            Roundup your purchases to the next dollar and give
                            your spare weekly.
                        </p>
                    </div>
                    <input
                        type="radio"
                        name="radio-1"
                        className="radio"
                        defaultChecked={false}
                        value="plaid"
                        onChange={(e) => onOptionChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
