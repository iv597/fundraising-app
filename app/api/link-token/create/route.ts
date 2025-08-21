import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { CountryCode, Products } from "plaid";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Not authorized" },
                { status: 401 }
            );
        }
        const response = await plaidClient.linkTokenCreate({
            user: { client_user_id: userId },
            client_name: process.env.PLAID_APP_NAME || "Fundraising App",
            products: [Products.Auth, Products.Transactions],
            country_codes: [CountryCode.Us],
            language: process.env.PLAID_LANGUAGE || "en",
        });

        return NextResponse.json({ link_token: response.data.link_token });
    } catch (error) {
        console.error("Error creating link token:", error);
        return NextResponse.json(
            { error: "Failed to create link token" },
            { status: 500 }
        );
    }
}
