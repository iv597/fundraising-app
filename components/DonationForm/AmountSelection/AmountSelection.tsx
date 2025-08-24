import { Program } from "@/generated/prisma";

type Props = {
    selectedAmount: number | null;
    customAmount: string;
    onAmountSelect: (amount: number) => void;
    onCustomAmountChange: (value: string) => void;
    program: Program | null;
};

export default function AmountSelection({
    selectedAmount,
    customAmount,
    onAmountSelect,
    onCustomAmountChange,
    program,
}: Props) {
    const presetAmounts = [150, 125, 100, 75, 50, 25];

    let recommendedAmounts: number[] | undefined =
        program?.recommendedAmounts as number[] | undefined;

    recommendedAmounts = recommendedAmounts || presetAmounts;

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Select amount</h3>
            <p className="text-sm text-gray-600">
                Remember that you can donate more to help the Organizer reach
                their goal even faster!
            </p>

            <div className="grid grid-cols-3 gap-3">
                {recommendedAmounts.map((amount, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onAmountSelect(amount)}
                        className={`btn btn-outline ${
                            selectedAmount === amount
                                ? "btn-primary"
                                : "btn-ghost"
                        } border-gray-300 hover:border-primary`}
                    >
                        ${amount}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Other amount
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                    </span>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => onCustomAmountChange(e.target.value)}
                        className="input input-bordered w-full pl-8"
                    />
                </div>
            </div>
        </div>
    );
}
