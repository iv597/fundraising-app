import { SignedIn, SignedOut } from "@clerk/nextjs";

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

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Fundraising App
        </h1>
        
        {!isClerkConfigured() && (
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              A modern platform for managing and supporting fundraising campaigns. 
              Configure Clerk authentication to get started with user management.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Configure
              </h2>
              <p className="text-gray-700">
                This app is set up with Next.js App Router and Clerk authentication.
                Follow the setup instructions above to enable user sign-in and sign-up.
              </p>
            </div>
          </div>
        )}
        
        {isClerkConfigured() && (
          <>
            <SignedOut>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              A modern platform for managing and supporting fundraising campaigns. 
              Sign in to get started or create an account to join our community.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Get Started
              </h2>
              <p className="text-blue-700">
                Click the &ldquo;Sign In&rdquo; or &ldquo;Sign Up&rdquo; buttons in the header to authenticate 
                with Clerk and access the full application.
              </p>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              Welcome back! You&rsquo;re successfully authenticated with Clerk.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-green-900 mb-2">
                  Create Campaign
                </h2>
                <p className="text-green-700 mb-4">
                  Start a new fundraising campaign and reach your goals.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Create Campaign
                </button>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-purple-900 mb-2">
                  Browse Campaigns
                </h2>
                <p className="text-purple-700 mb-4">
                  Discover and support amazing fundraising initiatives.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Browse Campaigns
                </button>
              </div>
            </div>
          </div>
        </SignedIn>
          </>
        )}
      </div>
    </div>
  );
}