
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhoneCountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const PhoneCountrySelector = ({ selectedCountry, onCountryChange }: PhoneCountrySelectorProps) => {
  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="phone-country">Country</Label>
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PhoneCountrySelector;
