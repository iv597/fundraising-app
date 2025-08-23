"use client";

import { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function PlaidLinkButton() {
    const [linkToken, setLinkToken] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/link-token/create")
            .then((res) => res.json())
            .then((data) => setLinkToken(data.link_token));
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken || "",
        onSuccess: async (public_token: string) => {
            await fetch("/api/link-token/exchange", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ public_token }),
            });
        },
    });

    return (
        <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                How it Works?
            </h2>

            <div className="space-y-1">
                <div>
                    <p className="text-gray-700 font-semibold mb-2">
                        1. Link your bank account
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Link your credit card accounts to track the round up
                        amounts.
                    </p>
                </div>

                <div>
                    <p className="text-gray-700 font-semibold mb-2">
                        2. Use your card normally
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        We will automatically track your purchases with linked
                        accounts for the round ups.
                    </p>
                </div>

                <div>
                    <p className="text-gray-700 font-semibold mb-2">
                        3. Donate your spare
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        At the end of each week we will donate total collected
                        round ups to your desired non-profits using the payment
                        on file.
                    </p>
                </div>
            </div>

            <p className="text-gray-500 text-sm italic mt-6">
                *You can manage your Round Up donations in Dashboard anytime.
            </p>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    open();
                }}
                disabled={!ready || !linkToken}
                className="btn btn-primary w-full mt-6"
            >
                Connect Bank Account
            </button>
        </div>
    );
}
