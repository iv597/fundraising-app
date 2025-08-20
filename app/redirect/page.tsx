import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function RedirectPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    // Fetch member and organization directly via Prisma
    const member = await prisma.member.findUnique({
        where: { id: userId },
        select: { organizationId: true },
    });

    if (member?.organizationId) {
        redirect(`/${member.organizationId}`);
    } else {
        redirect("/setup");
    }
}
