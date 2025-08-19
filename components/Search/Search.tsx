type SearchProps = {
    action: string;
    query?: string;
};

export default function Search({ action, query }: SearchProps) {
    return (
        <form action={action}>
            <label className="input my-6 w-full">
                <input
                    name="search"
                    value={query}
                    type="search"
                    className="grow"
                    placeholder="Search"
                />
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
            </label>
        </form>
    );
}
