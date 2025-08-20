"use server";

import prisma from "@/lib/prisma";

export async function searchPrograms(orgId: string, query: string) {
    return prisma.program.findMany({
        where: {
            organizationId: orgId,
            name: { contains: query, mode: "insensitive" },
        },
    });
}
