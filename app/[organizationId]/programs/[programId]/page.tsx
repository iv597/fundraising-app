import BackButtonClient from "@/components/BackButtonClient/BackButtonClient";
import DonationForm from "@/components/DonationForm";
import ReadMoreTextComponent from "@/components/ReadMoreTextComponent";
import prisma from "@/lib/prisma";

export default async function ProgramPage({
    params,
}: {
    params: Promise<{ programId: string }>;
}) {
    const { programId } = await params;

    const program = await prisma.program.findUnique({
        where: { id: parseInt(programId) },
    });
    return (
        <>
            <BackButtonClient />
            <h1 className="flex gap-4 mt-6">{program?.name}</h1>
            <div className="mt-6">{program?.shortDescription}</div>
            {program?.description && (
                <ReadMoreTextComponent
                    text={program.description}
                    initialLines={4}
                />
            )}
            <h2 className="text-gray-600 pt-6">
                How would you like to support?
            </h2>
            <p className="text-gray-400">
                Your support will significantly help this fundraiser.
            </p>
            <DonationForm />
        </>
    );
}
