"use client";

import PlaidLinkButton from "@/components/Plaid/PlaidLinkButton";
import DonationTypeSelection from "./DonationTypeSelection";
import AmountSelection from "./AmountSelection";
import PaymentMethodSelection from "./PaymentMethodSelection";
import PaymentDetails from "./PaymentDetails";
import BillingAddress from "./BillingAddress";
import RecurringOptions from "./RecurringOptions";
import { useState } from "react";

export default function DonationForm() {
    const [selectedOption, setSelectedOption] = useState<string>("manual");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("card");
    const [isRecurring, setIsRecurring] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<string>("monthly");
    const [formData, setFormData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        addressLine1: "",
        addressLine2: "",
        country: "United States",
        city: "",
        state: "",
        zip: "",
    });

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount("");
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const getSelectedAmountValue = () => {
        if (customAmount) return parseFloat(customAmount) || 0;
        return selectedAmount || 0;
    };

    return (
        <div className="max-w-md mx-auto py-6 space-y-6">
            <DonationTypeSelection
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
            />

            {selectedOption === "plaid" && <PlaidLinkButton />}

            {selectedOption === "manual" && (
                <form className="space-y-6">
                    <AmountSelection
                        selectedAmount={selectedAmount}
                        customAmount={customAmount}
                        onAmountSelect={handleAmountSelect}
                        onCustomAmountChange={handleCustomAmountChange}
                    />

                    <PaymentMethodSelection
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                    />

                    {paymentMethod === "card" && (
                        <PaymentDetails
                            formData={formData}
                            onInputChange={handleInputChange}
                        />
                    )}

                    <BillingAddress
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    <RecurringOptions
                        isRecurring={isRecurring}
                        frequency={frequency}
                        onRecurringChange={setIsRecurring}
                        onFrequencyChange={setFrequency}
                    />

                    {/* Summary */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-900">Summary</h3>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Total:</span>
                                <span className="font-medium">
                                    ${getSelectedAmountValue()}
                                </span>
                            </div>
                            {isRecurring && (
                                <div className="flex justify-between text-sm">
                                    <span>Recurring:</span>
                                    <span className="font-medium capitalize">
                                        {frequency}
                                    </span>
                                </div>
                            )}
                        </div>

                        <p className="text-xs text-gray-500">
                            We process payments with our trusted payment
                            partner, we guarantee that your data is safe.
                        </p>

                        <p className="text-xs text-gray-500">
                            Check their Privacy Policy and Terms and Conditions.
                        </p>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Donate ${getSelectedAmountValue()}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
