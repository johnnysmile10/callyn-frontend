
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface LanguageSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const LanguageSearchBar = ({ searchTerm, onSearchChange }: LanguageSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search languages..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default LanguageSearchBar;
