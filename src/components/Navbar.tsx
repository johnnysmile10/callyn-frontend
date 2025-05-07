
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 md:px-10 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <span className="text-3xl font-bold text-callyn-darkBlue">CALLYN</span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-700 hover:text-callyn-blue">Features</a>
        <a href="#" className="text-gray-700 hover:text-callyn-blue">Solutions</a>
        <a href="#" className="text-gray-700 hover:text-callyn-blue">Pricing</a>
        <a href="#" className="text-gray-700 hover:text-callyn-blue">Login</a>
      </div>
        
      <div className="hidden md:flex items-center gap-4">
        <Button variant="outline" className="rounded-full border-callyn-darkBlue text-callyn-darkBlue hover:text-white hover:bg-callyn-darkBlue">
          <Phone size={16} className="mr-2" />
          <span>Contact Sales</span>
        </Button>
        <Button className="rounded-full bg-callyn-darkBlue hover:bg-callyn-blue text-white">
          Get Started
        </Button>
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
