// import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/auth/SignUpForm";
// import GoogleSignupButton from "@/components/auth/GoogleSignupButton";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  // const provider = searchParams.get("provider");
  const { onboardingData } = useAuth();

  // Effect to trigger Google sign-up if that's the selected provider
  // useEffect(() => {
  //   if (provider === "google") {
  //     document.getElementById("google-signup-btn")?.click();
  //   }
  // }, [provider]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-callyn-darkBlue mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                {onboardingData ?
                  "Your AI Sales Agent is ready to be activated" :
                  "Sign up to start using Callyn for your sales calls"}
              </p>
            </div>

            <div className="space-y-6">
              {/*<div id="google-signup-btn" className="hidden">
                <GoogleSignupButton />
              </div>

              <GoogleSignupButton />*/}

              <div className="flex items-center gap-4 my-6">
                <Separator className="flex-grow" />
                <span className="text-gray-400 text-sm">or</span>
                <Separator className="flex-grow" />
              </div>

              <SignUpForm />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                First 45 minutes completely free. No credit card required.
              </p>
            </div>

            <div className="mt-6 text-center border-t pt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-callyn-blue hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
