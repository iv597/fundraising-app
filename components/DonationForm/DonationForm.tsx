"use client";

import PlaidLinkButton from "@/components/Plaid/PlaidLinkButton";
import DonationTypeSelection from "./DonationTypeSelection";
import AmountSelection from "./AmountSelection";
import PaymentMethodSelection from "./PaymentMethodSelection";
import PaymentDetails from "./PaymentDetails";
import BillingAddress from "./BillingAddress";
import RecurringOptions from "./RecurringOptions";
import { useState, useTransition } from "react";
import { createDonation } from "@/app/[organizationId]/programs/[programId]/actions";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Program } from "@/generated/prisma";
import ProgramThankYou from "../Program/ProgramThankYou";

type Props = {
    frequencies: { id: number; name: string }[];
    program: Program | null;
};

export default function DonationForm({ frequencies, program }: Props) {
    const [showThankYou, setShowThankYou] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("manual");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("card");
    const [isRecurring, setIsRecurring] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<number>(2);
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

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { userId } = useAuth();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            alert("Please log in to make a donation.");
            return;
        }

        if (!program) {
            alert("Program not found.");
            return;
        }

        const amountValue = getSelectedAmountValue();
        if (amountValue <= 0) {
            alert("Please select a valid amount.");
            return;
        }

        startTransition(() => {
            createDonation({
                memberId: userId,
                programId: program.id,
                amount: amountValue,
                currency: "USD",
                paymentMethod,
                isRecurring,
                frequency: isRecurring ? frequency : undefined,
                cardName: formData.cardName,
                cardNumber: formData.cardNumber,
                expiry: formData.expiry,
                cvv: formData.cvv,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                country: formData.country,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
            })
                .then((result) => {
                    if (result.success) {
                        const type =
                            result.data?.type === "subscription"
                                ? "Subscription"
                                : "Donation";
                        // Show thank you popup
                        setShowThankYou(true);
                    } else {
                        alert(`Error: ${result.error}`);
                    }
                })
                .catch((error) => {
                    console.error("Error creating donation:", error);
                    alert("An unexpected error occurred. Please try again.");
                });
        });
    };

    return (
        <div className="mx-auto py-6 space-y-6">
            {program && (
                <ProgramThankYou
                    program={program}
                    isOpen={showThankYou}
                    onClose={() => router.push("/dashboard")}
                />
            )}
            <DonationTypeSelection
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
            />

            {selectedOption === "plaid" && <PlaidLinkButton />}

            {selectedOption === "manual" && (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        options={frequencies}
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
                            disabled={isPending || !userId}
                            className="btn btn-primary w-full"
                        >
                            {isPending
                                ? "Processing..."
                                : `Donate $${getSelectedAmountValue()}`}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
