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
        <button
            onClick={(e) => {
                e.preventDefault();
                open();
            }}
            disabled={!ready || !linkToken}
            className="btn btn-primary btn-block"
        >
            Connect Bank Account
        </button>
    );
}
