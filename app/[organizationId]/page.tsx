import OrganizationPrograms from "@/components/Organization/OrganizationPrograms";
import prisma from "@/lib/prisma";

export default async function OrganizationPage({
    params,
    searchParams,
}: {
    params: Promise<{ organizationId: string }>;
    searchParams: { q?: string };
}) {
    const { organizationId } = await params;
    const { q } = await searchParams;

    const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: {
            programs: {
                where: q ? { name: { contains: q, mode: "insensitive" } } : {},
            },
        },
    });
    return (
        <>
            <div className="flex gap-4">
                <div className="w-32 rounded">
                    <img src="https://placehold.co/192x192" />
                </div>
                <h1 className="py-12 font-bold text-xl">
                    {organization?.name}
                </h1>
            </div>
            <div className="divider"></div>

            <OrganizationPrograms
                orgId={organizationId}
                initialPrograms={organization?.programs || []}
                initialQuery={q}
            />
        </>
    );
}
