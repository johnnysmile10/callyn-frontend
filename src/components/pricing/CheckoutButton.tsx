
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CheckoutButtonProps {
  planName: string;
  planPrice: string;
  isPopular?: boolean;
  className?: string;
}

const CheckoutButton = ({ planName, planPrice, isPopular, className }: CheckoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // For now, redirect to onboarding. In a real implementation, this would:
      // 1. Create a Stripe checkout session
      // 2. Redirect to Stripe checkout
      window.location.href = '/onboarding';
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full ${
        isPopular 
          ? 'bg-callyn-blue hover:bg-blue-700 text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        `Start ${planName} Plan`
      )}
    </Button>
  );
};

export default CheckoutButton;
