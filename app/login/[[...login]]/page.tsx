import { SignIn } from "@clerk/nextjs";

export default async function LogInPage() {
    return (
        <main className="max-w-150 mx-auto">
            <SignIn
                fallbackRedirectUrl="/redirect"
                signUpUrl="/signup"
                appearance={{
                    elements: {
                        rootBox: "!w-full",
                        cardBox:
                            "!shadow-none !rounded-none !w-full !max-w-none",
                        card: "!px-4 !py-8 !rounded-none",
                    },
                }}
            />
        </main>
    );
}
