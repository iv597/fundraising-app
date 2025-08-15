import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fundraising App",
  description: "A modern fundraising platform with Clerk authentication",
};

// Check if Clerk keys are properly configured
const isClerkConfigured = () => {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return publishableKey && 
         publishableKey !== 'undefined' &&
         publishableKey !== 'your_publishable_key_here' &&
         publishableKey.startsWith('pk_') &&
         !publishableKey.includes('placeholder') &&
         !publishableKey.includes('example');
};

function ClerkSetupNotice() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-4 my-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Clerk Setup Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              To enable authentication, please set up your Clerk keys in{" "}
              <code className="bg-yellow-100 px-1 rounded">.env.local</code>:
            </p>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>Create a free account at <a href="https://clerk.com" className="underline">clerk.com</a></li>
              <li>Create a new application in your Clerk dashboard</li>
              <li>Copy your publishable key and secret key</li>
              <li>Update the values in <code className="bg-yellow-100 px-1 rounded">.env.local</code></li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkConfigured = isClerkConfigured();
  
  const LayoutContent = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
      <body className="antialiased">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    Fundraising App
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  {clerkConfigured ? (
                    <>
                      <SignedOut>
                        <SignInButton>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Sign In
                          </button>
                        </SignInButton>
                        <SignUpButton>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium border transition-colors">
                            Sign Up
                          </button>
                        </SignUpButton>
                      </SignedOut>
                      <SignedIn>
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "h-10 w-10"
                            }
                          }}
                        />
                      </SignedIn>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Setup Required
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          {!clerkConfigured && <ClerkSetupNotice />}
          <main className="min-h-screen">
            {children}
          </main>
        </body>
      </html>
  );

  return clerkConfigured ? (
    <ClerkProvider>
      <LayoutContent>{children}</LayoutContent>
    </ClerkProvider>
  ) : (
    <LayoutContent>{children}</LayoutContent>
  );
}