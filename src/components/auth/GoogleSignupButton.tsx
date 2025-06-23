
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useAuth } from "@/context";

const GoogleSignupButton = () => {
  const [loading, setLoading] = useState(false);
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Signed in with Google successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignup}
      className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-full py-6 text-base font-medium flex items-center justify-center gap-3"
      disabled={loading}
    >
      <LogIn className="h-5 w-5" />
      {loading ? "Signing in..." : "Sign up with Google"}
    </Button>
  );
};

export default GoogleSignupButton;
