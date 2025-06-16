
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import PhoneCountrySelector from "./PhoneCountrySelector";
import AreaCodeSelector from "./AreaCodeSelector";
import NumberSearchInput from "./NumberSearchInput";
import AvailableNumbersList from "./AvailableNumbersList";
import ProvisionButton from "./ProvisionButton";

interface PhoneNumber {
  number: string;
  location: string;
  price: string;
}

interface AreaCode {
  code: string;
  location: string;
}

interface PhoneNumberProvisioningCardProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedAreaCode: string;
  onAreaCodeChange: (code: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedNumber: string;
  onNumberSelect: (number: string) => void;
  isProvisioning: boolean;
  onProvision: () => void;
  availableNumbers: PhoneNumber[];
  areaCodes: AreaCode[];
}

const PhoneNumberProvisioningCard = ({
  selectedCountry,
  onCountryChange,
  selectedAreaCode,
  onAreaCodeChange,
  searchTerm,
  onSearchChange,
  selectedNumber,
  onNumberSelect,
  isProvisioning,
  onProvision,
  availableNumbers,
  areaCodes
}: PhoneNumberProvisioningCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          Phone Number Setup
        </CardTitle>
        <CardDescription>
          Get a dedicated phone number for your AI agent to make and receive calls
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PhoneCountrySelector 
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AreaCodeSelector
            selectedAreaCode={selectedAreaCode}
            onAreaCodeChange={onAreaCodeChange}
            areaCodes={areaCodes}
          />

          <NumberSearchInput
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
        </div>

        <AvailableNumbersList
          numbers={availableNumbers}
          selectedNumber={selectedNumber}
          onNumberSelect={onNumberSelect}
        />

        <ProvisionButton
          selectedNumber={selectedNumber}
          isProvisioning={isProvisioning}
          onProvision={onProvision}
        />
      </CardContent>
    </Card>
  );
};

export default PhoneNumberProvisioningCard;
