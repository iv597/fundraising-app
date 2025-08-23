"use client";

import PlaidLinkButton from "@/components/Plaid/PlaidLinkButton";
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

    const presetAmounts = [150, 125, 100, 75, 50, 50];
    const paymentMethods = [
        { id: "card", label: "Visa or Mastercard" },
        { id: "ach", label: "ACH" },
        { id: "googlepay", label: "Google Pay" },
        { id: "applepay", label: "Apple Pay" },
    ];

    const frequencies = [
        { id: "weekly", label: "Weekly" },
        { id: "monthly", label: "Monthly" },
        { id: "quarterly", label: "Quarterly" },
        { id: "annually", label: "Annually" },
    ];

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
            {/* Donation Type Selection */}
            <div className="space-y-3">
                <div
                    className={`card card-border border-gray-900 bg-base-100 w-full mt-2 ${
                        selectedOption === "manual"
                            ? "bg-gray-300 "
                            : "bg-white "
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
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                    </div>
                </div>

                <div
                    className={`card card-border border-gray-900 bg-base-100 w-full mt-2 ${
                        selectedOption === "plaid"
                            ? "bg-gray-300 "
                            : "bg-white "
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
                                Roundup your purchases to the next dollar and
                                give your spare weekly.
                            </p>
                        </div>
                        <input
                            type="radio"
                            name="radio-1"
                            className="radio"
                            defaultChecked={false}
                            value="plaid"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {selectedOption === "plaid" && <PlaidLinkButton />}

            {selectedOption === "manual" && (
                <form className="space-y-6">
                    {/* Amount Selection */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
                            Select amount
                        </h3>
                        <p className="text-sm text-gray-600">
                            Remember that you can donate more to help the
                            Organizer reach their goal even faster!
                        </p>

                        <div className="grid grid-cols-3 gap-3">
                            {presetAmounts.map((amount, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAmountSelect(amount)}
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
                                    onChange={(e) =>
                                        handleCustomAmountChange(e.target.value)
                                    }
                                    className="input input-bordered w-full pl-8"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
                            Select payment method
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setPaymentMethod(method.id)}
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

                    {/* Payment Details */}
                    {paymentMethod === "card" && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">
                                Payment details
                            </h3>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Name on Card"
                                    value={formData.cardName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "cardName",
                                            e.target.value
                                        )
                                    }
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    value={formData.cardNumber}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "cardNumber",
                                            e.target.value
                                        )
                                    }
                                    className="input input-bordered w-full"
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="mm/yy"
                                        value={formData.expiry}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "expiry",
                                                e.target.value
                                            )
                                        }
                                        className="input input-bordered"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CCV"
                                        value={formData.cvv}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "cvv",
                                                e.target.value
                                            )
                                        }
                                        className="input input-bordered"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Billing Address */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
                            Billing address
                        </h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                value={formData.addressLine1}
                                onChange={(e) =>
                                    handleInputChange(
                                        "addressLine1",
                                        e.target.value
                                    )
                                }
                                className="input input-bordered w-full"
                            />

                            <input
                                type="text"
                                placeholder="Address Line 2"
                                value={formData.addressLine2}
                                onChange={(e) =>
                                    handleInputChange(
                                        "addressLine2",
                                        e.target.value
                                    )
                                }
                                className="input input-bordered w-full"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <select
                                    value={formData.country}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "country",
                                            e.target.value
                                        )
                                    }
                                    className="select select-bordered"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    <option>Other</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="ZIP"
                                    value={formData.zip}
                                    onChange={(e) =>
                                        handleInputChange("zip", e.target.value)
                                    }
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "city",
                                            e.target.value
                                        )
                                    }
                                    className="input input-bordered"
                                />

                                <input
                                    type="text"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "state",
                                            e.target.value
                                        )
                                    }
                                    className="input input-bordered"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recurring Options */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">
                            Contribute even more by making it recurring?
                        </h3>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsRecurring(true)}
                                className={`btn flex-1 ${
                                    isRecurring ? "btn-primary" : "btn-outline"
                                }`}
                            >
                                Make it recurring
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsRecurring(false)}
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
                                            onClick={() =>
                                                setFrequency(freq.id)
                                            }
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
                                    <span className="font-medium">
                                        07.20.2025
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

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
