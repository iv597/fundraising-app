import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <main className="max-w-150 mx-auto">
            <SignUp
                fallbackRedirectUrl="/redirect"
                signInUrl="/login"
                appearance={{
                    elements: {
                        rootBox: "!w-full",
                        cardBox:
                            "!shadow-none !rounded-none !w-full !max-w-none",
                        card: "!rounded-none",
                    },
                }}
            />
        </main>
    );
}
