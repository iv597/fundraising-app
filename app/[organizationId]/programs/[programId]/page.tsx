import BackButtonClient from "@/components/BackButtonClient/BackButtonClient";
import PlaidLinkButton from "@/components/Plaid/PlaidLinkButton";
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
            <h2 className="text-gray-600">How would you like to support?</h2>
            <p className="text-gray-400">
                Your support will significantly help this fundraiser.
            </p>
            {/* Mozda ovo treba zasebno kao komponente da budu */}
            <form className="mt-4">
                <div className="card card-border border-gray-300 bg-base-100 w-full">
                    <div className="card-body flex flex-row items-center justify-between">
                        <div>
                            <p className="font-medium">Standard Donation</p>
                            <p>One time or monthly donation.</p>
                        </div>
                        <input
                            type="radio"
                            name="radio-1"
                            className="radio"
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="card card-border border-gray-300 bg-base-100 w-full mt-2">
                    <div className="card-body flex flex-row items-center justify-between">
                        <div>
                            <p className="font-medium">
                                Round Up Spare Change Donation
                            </p>
                            <p>
                                Roundup your purchases to the next dollar and
                                give your spare weekly.
                            </p>
                        </div>
                        <input type="radio" name="radio-1" className="radio" />
                    </div>
                </div>

                <PlaidLinkButton />
            </form>
        </>
    );
}
