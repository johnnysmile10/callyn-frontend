
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-callyn-darkBlue text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-callyn-blue rounded-full flex items-center justify-center text-white font-bold">
                <span className="text-xl">c</span>
              </div>
              <span className="text-2xl font-bold">callyn</span>
            </div>
            <p className="text-gray-300">
              AI-powered answering service for small businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white">Features</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Use Cases</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Getting Started Guide</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white">About Callyn</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© 2025 Callyn AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
