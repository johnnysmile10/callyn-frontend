
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface NumberSearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const NumberSearchInput = ({ searchTerm, onSearchChange }: NumberSearchInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="number-search">Search Numbers</Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          id="number-search"
          placeholder="Search by number or location"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
};

export default NumberSearchInput;
