
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 md:px-10 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 bg-rosie-purple rounded-full flex items-center justify-center text-white font-bold">
          <span className="text-xl">r</span>
        </div>
        <span className="text-2xl font-bold text-rosie-darkPurple">rosie</span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-700 hover:text-rosie-purple">Resources</a>
        <a href="#" className="text-gray-700 hover:text-rosie-purple">Industries</a>
        <a href="#" className="text-gray-700 hover:text-rosie-purple">Pricing</a>
        <a href="#" className="text-gray-700 hover:text-rosie-purple">Login</a>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full border-rosie-purple text-rosie-purple hover:text-rosie-purple hover:bg-rosie-lightPurple">
            <Phone size={16} className="mr-2" />
            <span>412-569-0026</span>
          </Button>
          <Button className="rounded-full bg-rosie-purple hover:bg-rosie-darkPurple">
            Get Started for Free
          </Button>
        </div>
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
