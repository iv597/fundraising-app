type Props = {
    paymentMethod: string;
    onPaymentMethodChange: (method: string) => void;
};

export default function PaymentMethodSelection({
    paymentMethod,
    onPaymentMethodChange,
}: Props) {
    const paymentMethods = [
        { id: "card", label: "Visa or Mastercard" },
        { id: "ach", label: "ACH" },
        { id: "googlepay", label: "Google Pay" },
        { id: "applepay", label: "Apple Pay" },
    ];

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">
                Select payment method
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        type="button"
                        onClick={() => onPaymentMethodChange(method.id)}
                        className={`btn btn-outline ${
                            paymentMethod === method.id
                                ? "btn-primary"
                                : "btn-ghost"
                        } border-gray-300 hover:border-primary text-sm`}
                    >
                        {method.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
