import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import ProgramCard from "@/components/Program/ProgramCard";
import { Program } from "@/generated/prisma";

export default async function OrganizationPage({
    params,
}: {
    params: Promise<{ organizationId: string }>;
}) {
    const { organizationId } = await params;
    const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: {
            programs: true, // include all related programs
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
            <div className="pt-4">
                <h2 className="text-center">Fundraiser programs</h2>
                <Search action={`/${organizationId}`} />
            </div>

            {organization?.programs.map((program: Program) => (
                <ProgramCard key={program.id} program={program} />
            ))}
        </>
    );
}
