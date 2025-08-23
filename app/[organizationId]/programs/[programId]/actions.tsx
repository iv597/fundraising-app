"use server";

import prisma from "@/lib/prisma";

// TypeScript interfaces for donation submission
interface DonationFormData {
    memberId: string;
    programId: number;
    amount: number;
    currency: string;
    paymentMethod: string;
    isRecurring: boolean;
    frequency?: number;
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    addressLine1?: string;
    addressLine2?: string;
    country?: string;
    city?: string;
    state?: string;
    zip?: string;
}

interface DonationResult {
    success: boolean;
    data?: {
        id: number;
        type: "donation" | "subscription";
    };
    error?: string;
}

export async function createDonation(
    data: DonationFormData
): Promise<DonationResult> {
    try {
        // Validate required fields
        if (
            !data.memberId ||
            !data.programId ||
            !data.amount ||
            !data.currency
        ) {
            return {
                success: false,
                error: "Missing required fields: memberId, programId, amount, or currency",
            };
        }

        // Validate amount is positive
        if (data.amount <= 0) {
            return {
                success: false,
                error: "Amount must be greater than 0",
            };
        }

        // Check if member exists
        const member = await prisma.member.findUnique({
            where: { id: data.memberId },
        });

        if (!member) {
            return {
                success: false,
                error: "Member not found",
            };
        }

        // Check if program exists
        const program = await prisma.program.findUnique({
            where: { id: data.programId },
        });

        if (!program) {
            return {
                success: false,
                error: "Program not found",
            };
        }

        if (program.organizationId !== member.organizationId) {
            return {
                success: false,
                error: "Program does not belong to member's organization",
            };
        }

        // If it's a recurring donation, create subscription
        if (data.isRecurring && data.frequency) {
            // Map frequency to subscription type

            // Find or create subscription type
            let subscriptionType = await prisma.subscriptionType.findFirst({
                where: { id: data.frequency },
            });

            if (!subscriptionType) {
                return {
                    success: false,
                    error: "Invalid frequency",
                };
            }

            // Create subscription
            const subscription = await prisma.subscription.create({
                data: {
                    memberId: data.memberId,
                    programId: data.programId,
                    typeId: subscriptionType.id,
                    amount: Math.round(data.amount * 100), // Convert to cents
                    currency: data.currency,
                    status: "ACTIVE",
                },
            });

            return {
                success: true,
                data: {
                    id: subscription.id,
                    type: "subscription",
                },
            };
        }

        // Create one-time donation
        const donation = await prisma.donation.create({
            data: {
                memberId: data.memberId,
                programId: data.programId,
                amount: Math.round(data.amount * 100), // Convert to cents
                currency: data.currency,
            },
        });

        return {
            success: true,
            data: {
                id: donation.id,
                type: "donation",
            },
        };
    } catch (error) {
        console.error("Error creating donation/subscription:", error);

        // Handle specific Prisma errors
        if (error && typeof error === "object" && "code" in error) {
            switch (error.code) {
                case "P2003":
                    return {
                        success: false,
                        error: "Invalid reference to member or program",
                    };
                case "P2025":
                    return {
                        success: false,
                        error: "Referenced record not found",
                    };
                default:
                    return {
                        success: false,
                        error: "Database error occurred",
                    };
            }
        }

        return {
            success: false,
            error: "An unexpected error occurred",
        };
    }
}
