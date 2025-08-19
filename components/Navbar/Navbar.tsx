import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import styles from "./Navbar.module.css";

export default async function Navbar() {
    return (
        <header className={"border-b " + styles.header}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Fundraising App</h1>
                <nav>
                    <SignedOut>
                        <div className="space-x-4">
                            <SignInButton mode="modal">
                                <button className="btn">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="btn btn-primary">
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
