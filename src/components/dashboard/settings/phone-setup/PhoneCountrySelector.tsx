
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PHONE_COUNTRIES } from "./phoneCountryConfig";

interface PhoneCountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

const PhoneCountrySelector = ({ selectedCountry, onCountryChange }: PhoneCountrySelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Country</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
        {PHONE_COUNTRIES.map((country) => (
          <Button
            key={country.code}
            variant={selectedCountry === country.code ? "default" : "outline"}
            className="justify-start h-auto p-3"
            onClick={() => onCountryChange(country.code)}
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-lg">{country.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{country.name}</span>
                <span className="text-xs opacity-70">{country.dialCode}</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PhoneCountrySelector;
