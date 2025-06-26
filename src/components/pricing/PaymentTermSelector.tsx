
import { PaymentTerm } from "./types";
import { Badge } from "@/components/ui/badge";

interface PaymentTermSelectorProps {
  terms: PaymentTerm[];
  selectedTerm: string;
  onTermChange: (termId: string) => void;
}

const PaymentTermSelector = ({ terms, selectedTerm, onTermChange }: PaymentTermSelectorProps) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-gray-100 p-2 rounded-xl inline-flex gap-1">
        {terms.map((term) => (
          <button
            key={term.id}
            onClick={() => onTermChange(term.id)}
            className={`relative px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              selectedTerm === term.id
                ? 'bg-white text-callyn-blue shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>{term.label}</span>
              {term.discount > 0 && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  Save {Math.round(term.discount * 100)}%
                </Badge>
              )}
              {term.popular && (
                <Badge className="text-xs bg-callyn-blue text-white">
                  Best Value
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentTermSelector;
