import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white py-4 px-6 md:px-10 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-bold text-callyn-darkBlue">CALLYN</Link>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <Link to="/#features" className="text-gray-700 hover:text-callyn-blue">Features</Link>
        <Link to="/#solutions" className="text-gray-700 hover:text-callyn-blue">Solutions</Link>
        <Link to="/#pricing" className="text-gray-700 hover:text-callyn-blue">Pricing</Link>
        {!!user ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-callyn-blue">Dashboard</Link>
            <button onClick={logout} className="text-gray-700 hover:text-callyn-blue">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-callyn-blue">Login</Link>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Button variant="outline" className="rounded-full border-callyn-darkBlue text-callyn-darkBlue hover:text-white hover:bg-callyn-darkBlue">
          <Phone size={16} className="mr-2" />
          <span>Contact Sales</span>
        </Button>
        {!!user ? (
          <Button
            asChild
            className="rounded-full bg-callyn-darkBlue hover:bg-callyn-blue text-white"
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              <span>Dashboard</span>
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.photoURL} alt={user?.name || ""} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </Button>
        ) : (
          <Button asChild className="rounded-full bg-callyn-darkBlue hover:bg-callyn-blue text-white">
            <Link to="/onboarding">Get Started</Link>
          </Button>
        )}
      </div>

      <button className="md:hidden text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
