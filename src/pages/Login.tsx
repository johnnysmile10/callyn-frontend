
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
// import GoogleSignupButton from "@/components/auth/GoogleSignupButton";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-callyn-darkBlue mb-2">
                Log In to Your Account
              </h1>
              <p className="text-gray-600">
                Welcome back to Callyn, your AI sales agent
              </p>
            </div>

            <div className="space-y-6">
              {/* <GoogleSignupButton /> */}

              <div className="flex items-center gap-4 my-6">
                <Separator className="grow w-auto" />
                <span className="text-gray-400 text-sm">or</span>
                <Separator className="grow w-auto" />
              </div>

              <LoginForm />
            </div>

            <div className="mt-6 text-center border-t pt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-callyn-blue hover:underline font-medium">
                  Sign up
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

export default Login;
