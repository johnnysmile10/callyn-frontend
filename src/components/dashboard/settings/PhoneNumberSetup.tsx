
import { useState, useMemo } from "react";
import PhoneNumberProvisioningCard from "./phone-setup/PhoneNumberProvisioningCard";
import CurrentPhoneNumberCard from "./phone-setup/CurrentPhoneNumberCard";
import { COUNTRY_PHONE_DATA } from "./phone-setup/phoneDataConfig";

const PhoneNumberSetup = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Get dynamic data based on selected country
  const countryData = COUNTRY_PHONE_DATA[selectedCountry];
  
  // Filter numbers based on area code and search term
  const filteredNumbers = useMemo(() => {
    let numbers = countryData?.sampleNumbers || [];
    
    // Filter by area code if selected
    if (selectedAreaCode) {
      numbers = numbers.filter(number => 
        number.number.includes(`(${selectedAreaCode})`) || 
        number.number.includes(` ${selectedAreaCode} `) ||
        number.location.toLowerCase().includes(selectedAreaCode.toLowerCase())
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      numbers = numbers.filter(number => 
        number.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        number.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return numbers;
  }, [countryData, selectedAreaCode, searchTerm]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedAreaCode(""); // Reset area code when country changes
    setSelectedNumber(""); // Reset selected number
  };

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
        onCountryChange={handleCountryChange}
        selectedAreaCode={selectedAreaCode}
        onAreaCodeChange={setSelectedAreaCode}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedNumber={selectedNumber}
        onNumberSelect={setSelectedNumber}
        isProvisioning={isProvisioning}
        onProvision={handleProvisionNumber}
        availableNumbers={filteredNumbers}
        areaCodes={countryData?.areaCodes || []}
      />

      <CurrentPhoneNumberCard />
    </div>
  );
};

export default PhoneNumberSetup;
