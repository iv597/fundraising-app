import { Program } from "@/generated/prisma";
import Link from "next/link";

type Props = {
    program: Program;
};

export default function ProgramCard({ program }: Props) {
    const { image, name, id, shortDescription, organizationId } = program;
    return (
        <div className="card bg-base-100 w-full shadow-sm mb-4">
            <Link href={`${organizationId}/programs/${id}`}>
                <figure>
                    <img src={image} alt={shortDescription} />
                </figure>
            </Link>
            <div className="card-body">
                <p>Category</p>
                <h2 className="card-title">{name}</h2>
                <p>{shortDescription}</p>
                <div className="card-actions">
                    <Link
                        href={`${organizationId}/programs/${id}`}
                        className="btn-block"
                    >
                        <button className="btn btn-primary btn-block">
                            Donate
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
