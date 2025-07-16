
import { useState, useMemo, useEffect } from "react";
import PhoneNumberSourceSelector from "./phone-setup/PhoneNumberSourceSelector";
import PhoneNumberProvisioningCard from "./phone-setup/PhoneNumberProvisioningCard";
import BYODSetup from "./phone-setup/BYODSetup";
import PhoneNumberManagement from "./phone-setup/PhoneNumberManagement";
import { COUNTRY_PHONE_DATA } from "./phone-setup/phoneDataConfig";
import ApiService from "@/context/services/apiService";
import { toast } from "sonner";

const PhoneNumberSetup = () => {
  const [phoneNumberSource, setPhoneNumberSource] = useState<"provision" | "byod">("provision");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [purchasedNumbers, setPurchasedNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);

  // Mock check if user has existing numbers
  const hasExistingNumbers = true; // In real app, this would come from backend

  // Get dynamic data based on selected country
  const countryData = COUNTRY_PHONE_DATA[selectedCountry];

  // Filter numbers based on area code and search term
  const filteredNumbers = useMemo(() => {
    let numbers = (availableNumbers || []).map(item => ({
      number: item.phone_number,
      location: item.locality,
      price: "$1.00/month"
    }));

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
  }, [availableNumbers, selectedAreaCode, searchTerm]);

  const loadPhoneNumbers = async () => {
    const { purchased_numbers, available_numbers } =
      await ApiService.get('/phone', { country: selectedCountry })
    setPurchasedNumbers(purchased_numbers);
    setAvailableNumbers(available_numbers);
  }

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedAreaCode(""); // Reset area code when country changes
    setSelectedNumber(""); // Reset selected number
  };

  const handleProvisionNumber = async () => {
    setIsProvisioning(true);
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      await ApiService.post('/phone', {
        phoneNumber: selectedNumber
      });

      await loadPhoneNumbers();

      toast.success(`${selectedNumber} provisioned successfully!`);
    } catch (err) {
    }

    setIsProvisioning(false);
    // In real implementation, this would provision the number
  };

  useEffect(() => {
    loadPhoneNumbers();
  }, [selectedCountry]);

  return (
    <div className="space-y-6">
      {/* Show existing numbers if user has any */}
      {hasExistingNumbers && (
        <PhoneNumberManagement numbers={purchasedNumbers} />
      )}

      {/* Source Selection */}
      <PhoneNumberSourceSelector
        selectedSource={phoneNumberSource}
        onSourceChange={setPhoneNumberSource}
      />

      {/* Conditional Content Based on Source */}
      {phoneNumberSource === "provision" ? (
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
      ) : (
        <BYODSetup />
      )}
    </div>
  );
};

export default PhoneNumberSetup;
