"use client";

import { useState } from "react";

type ReadMoreProps = {
    text: string;
    initialLines?: number;
    className?: string;
};

export default function ReadMoreTextComponent({
    text,
    initialLines = 5,
}: ReadMoreProps) {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => setExpanded(!expanded);
    const maxHeight = `${initialLines * 2}rem`;

    return (
        <div>
            <div
                className="pt-6 overflow-hidden transition-all duration-300"
                style={{ maxHeight: expanded ? "none" : maxHeight }}
                dangerouslySetInnerHTML={{ __html: text }}
            ></div>
            <div className="card-actions mt-2 justify-start">
                <button className="btn-link" onClick={toggle}>
                    {expanded ? "Read Less" : "Read More"}
                </button>
            </div>
        </div>
    );
}
