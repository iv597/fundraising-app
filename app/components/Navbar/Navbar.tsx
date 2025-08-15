import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
    return (
        <header className="p-4 border-b">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Fundraising App</h1>
                <nav>
                    <SignedOut>
                        <div className="space-x-4">
                            <SignInButton mode="modal">
                                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </nav>
            </div>
        </header>
    );
}
