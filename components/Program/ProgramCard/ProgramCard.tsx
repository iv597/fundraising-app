import { Program } from "@/generated/prisma";

type Props = {
    program: Program;
};

export default function Search({ program }: Props) {
    const { image, name, shortDescription } = program;
    return (
        <div className="card bg-base-100 w-full shadow-sm mb-4">
            <figure>
                <img src={image} alt="program_image" />
            </figure>
            <div className="card-body">
                <p>Category</p>
                <h2 className="card-title">{name}</h2>
                <p>{shortDescription}</p>
                <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                        Donate
                    </button>
                </div>
            </div>
        </div>
    );
}
