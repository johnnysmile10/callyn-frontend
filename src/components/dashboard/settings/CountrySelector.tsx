
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Country, SUPPORTED_COUNTRIES, getPopularCountries } from "./countryConfig";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

const CountrySelector = ({ selectedCountry, onCountryChange }: CountrySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllCountries, setShowAllCountries] = useState(false);

  const popularCountries = getPopularCountries();
  
  const getFilteredCountries = () => {
    const countriesToFilter = showAllCountries ? SUPPORTED_COUNTRIES : popularCountries;
    
    if (!searchTerm.trim()) {
      return countriesToFilter;
    }

    return countriesToFilter.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm)
    );
  };

  const filteredCountries = getFilteredCountries();
  const selectedCountryData = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Country</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Selected Country Display */}
      {selectedCountryData && (
        <div className="p-3 border rounded-lg bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCountryData.flag}</span>
            <div>
              <div className="font-medium">{selectedCountryData.name}</div>
              <div className="text-sm text-gray-600">{selectedCountryData.dialCode}</div>
            </div>
            <Badge variant="default" className="ml-auto">Selected</Badge>
          </div>
        </div>
      )}

      {/* Toggle between popular and all countries */}
      <div className="flex gap-2">
        <Button
          variant={!showAllCountries ? "default" : "outline"}
          size="sm"
          onClick={() => setShowAllCountries(false)}
        >
          Popular Countries
        </Button>
        <Button
          variant={showAllCountries ? "default" : "outline"}
          size="sm"
          onClick={() => setShowAllCountries(true)}
        >
          All Countries ({SUPPORTED_COUNTRIES.length})
        </Button>
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-80 overflow-y-auto border rounded-lg p-3">
        {filteredCountries.map((country) => (
          <Button
            key={country.code}
            variant={selectedCountry === country.code ? "default" : "outline"}
            className="justify-start h-auto p-3 text-left"
            onClick={() => onCountryChange(country.code)}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">{country.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{country.name}</div>
                <div className="text-xs opacity-70">{country.dialCode}</div>
              </div>
              {country.popular && !showAllCountries && (
                <Badge variant="secondary" className="text-xs">Popular</Badge>
              )}
            </div>
          </Button>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No countries found matching "{searchTerm}"</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => setSearchTerm("")}
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
