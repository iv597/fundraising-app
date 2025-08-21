import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";

export async function POST(req: Request) {
    try {
        const { public_token } = await req.json();
        const response = await plaidClient.itemPublicTokenExchange({
            public_token,
        });

        return NextResponse.json({ access_token: response.data.access_token });
    } catch (error) {
        console.error("Error exchanging public token:", error);
        return NextResponse.json(
            { error: "Failed to exchange public token" },
            { status: 500 }
        );
    }
}
