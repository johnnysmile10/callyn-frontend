
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

const countries = [
  { code: "US", name: "United States" },      // English
  { code: "CA", name: "Canada" },             // English, French
  { code: "GB", name: "United Kingdom" },     // English
  { code: "AU", name: "Australia" },          // English
  { code: "ES", name: "Spain" },              // Spanish
  { code: "MX", name: "Mexico" },             // Spanish
  { code: "AR", name: "Argentina" },          // Spanish
  { code: "CL", name: "Chile" },              // Spanish
  { code: "CO", name: "Colombia" },           // Spanish
  { code: "IT", name: "Italy" },              // Italian
  { code: "DE", name: "Germany" },            // German
  { code: "FR", name: "France" },             // French
  { code: "BE", name: "Belgium" },            // Dutch, French, German
  { code: "PT", name: "Portugal" },           // Portuguese
  { code: "BR", name: "Brazil" },             // Portuguese
  { code: "NL", name: "Netherlands" },        // Dutch
  { code: "PL", name: "Poland" },             // Polish
  { code: "IN", name: "India" },              // Hindi, English (official)
  { code: "DK", name: "Denmark" },            // Danish
  { code: "NO", name: "Norway" },             // Norwegian
  { code: "SE", name: "Sweden" },             // Swedish
  { code: "AE", name: "United Arab Emirates" }, // Arabic
  { code: "SA", name: "Saudi Arabia" },       // Arabic
  { code: "TR", name: "Turkey" },             // Turkish
  { code: "RU", name: "Russia" }              // Russian
];

const PhoneCountrySelector = ({ selectedCountry, onCountryChange }: PhoneCountrySelectorProps) => {

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
