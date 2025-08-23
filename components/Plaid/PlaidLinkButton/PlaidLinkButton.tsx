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
        <>
            <h2 className="text-gray-600">How it Works?</h2>
            <p className="text-gray-600 font-semibold">
                1. Link your bank account
            </p>
            <p className="text-gray-400">
                Link your credit card accounts to track the round up amounts.
            </p>
            <p className="text-gray-600 font-semibold">
                2. Use your card normally
            </p>
            <p className="text-gray-400">
                We will automatically track your purchases with linked accounts
                for the round ups.
            </p>
            <p className="text-gray-600 font-semibold">3. Donate your spare</p>
            <p className="text-gray-400">
                At the end of each week we will donate total collected round ups
                to your desired non-profits using the payment on file.
            </p>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    open();
                }}
                disabled={!ready || !linkToken}
                className="btn btn-primary btn-block my-6"
            >
                Connect Bank Account
            </button>
        </>
    );
}
