"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { searchPrograms } from "@/app/[organizationId]/actions";
import Search from "@/components/Search";
import { Program } from "@/generated/prisma";
import ProgramCard from "@/components/Program/ProgramCard";
import OrganizationProgramsSkeleton from "./OrganizationProgramsSkeleton";

export default function OrganizationPrograms({
    orgId,
    initialPrograms,
    initialQuery,
}: {
    orgId: string;
    initialPrograms: any[];
    initialQuery?: string;
}) {
    const [programs, setPrograms] = useState(initialPrograms);
    const [q, setQ] = useState(initialQuery || "");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSearch = (formData: FormData) => {
        startTransition(async () => {
            // Call server action
            const data = await searchPrograms(orgId, q);
            setPrograms(data);

            // Update URL with query param
            const url = q ? `?q=${encodeURIComponent(q)}` : "";
            router.replace(url, { scroll: false });
        });
    };

    return (
        <div>
            <div className="pt-4">
                <h2 className="text-center">Fundraiser programs</h2>
                <Search
                    action={handleSearch}
                    query={q}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQ(e.target.value)
                    }
                />
            </div>

            {isPending ? (
                <OrganizationProgramsSkeleton />
            ) : (
                programs.map((program: Program) => (
                    <ProgramCard key={program.id} program={program} />
                ))
            )}
        </div>
    );
}
