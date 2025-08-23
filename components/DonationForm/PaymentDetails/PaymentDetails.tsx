type FormData = {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
};

type Props = {
    formData: FormData;
    onInputChange: (field: string, value: string) => void;
};

export default function PaymentDetails({ formData, onInputChange }: Props) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Payment details</h3>

            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Name on Card"
                    value={formData.cardName}
                    onChange={(e) => onInputChange("cardName", e.target.value)}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                        onInputChange("cardNumber", e.target.value)
                    }
                    className="input input-bordered w-full"
                />

                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        placeholder="mm/yy"
                        value={formData.expiry}
                        onChange={(e) =>
                            onInputChange("expiry", e.target.value)
                        }
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="CCV"
                        value={formData.cvv}
                        onChange={(e) => onInputChange("cvv", e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>
        </div>
    );
}
