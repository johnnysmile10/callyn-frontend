
import { useState } from "react";
import PhoneNumberProvisioningCard from "./phone-setup/PhoneNumberProvisioningCard";
import CurrentPhoneNumberCard from "./phone-setup/CurrentPhoneNumberCard";

const PhoneNumberSetup = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Mock available numbers
  const availableNumbers = [
    { number: "+1 (555) 123-4567", location: "New York, NY", price: "$1.00/month" },
    { number: "+1 (555) 234-5678", location: "New York, NY", price: "$1.00/month" },
    { number: "+1 (555) 345-6789", location: "New York, NY", price: "$1.00/month" },
    { number: "+1 (555) 456-7890", location: "New York, NY", price: "$1.00/month" },
  ];

  const areaCodes = [
    { code: "212", location: "New York, NY" },
    { code: "213", location: "Los Angeles, CA" },
    { code: "312", location: "Chicago, IL" },
    { code: "415", location: "San Francisco, CA" },
    { code: "617", location: "Boston, MA" },
  ];

  const handleProvisionNumber = async () => {
    setIsProvisioning(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProvisioning(false);
    // In real implementation, this would provision the number
    console.log(`Provisioning number: ${selectedNumber}`);
  };

  return (
    <div className="space-y-6">
      <PhoneNumberProvisioningCard
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        selectedAreaCode={selectedAreaCode}
        onAreaCodeChange={setSelectedAreaCode}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedNumber={selectedNumber}
        onNumberSelect={setSelectedNumber}
        isProvisioning={isProvisioning}
        onProvision={handleProvisionNumber}
        availableNumbers={availableNumbers}
        areaCodes={areaCodes}
      />

      <CurrentPhoneNumberCard />
    </div>
  );
};

export default PhoneNumberSetup;
