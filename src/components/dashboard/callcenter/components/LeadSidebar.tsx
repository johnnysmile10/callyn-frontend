
import { Phone, Target } from "lucide-react";
import CallOutcomeButtons from "../Elite/CallOutcomeButtons";

interface Lead {
  name: string;
  phone: string;
  note?: string;
}

interface LeadSidebarProps {
  lead: Lead;
  agentInstructions: string;
  outcomeGoals: string;
  onOutcomeSelect: (outcome: string) => void;
}

const LeadSidebar = ({
  lead,
  agentInstructions,
  outcomeGoals,
  onOutcomeSelect
}: LeadSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Lead Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Current Lead</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-600">{lead.phone}</p>
          </div>
          
          {lead.note && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">{lead.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Agent Instructions */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Mission</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{agentInstructions}</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
              OUTCOME GOAL
            </h4>
            <p className="text-sm text-green-800">{outcomeGoals}</p>
          </div>
        </div>
      </div>

      {/* Outcome Buttons */}
      <div className="p-6 flex-1">
        <h3 className="font-semibold text-gray-900 mb-4">Log Call Outcome</h3>
        <CallOutcomeButtons onOutcomeSelect={onOutcomeSelect} />
      </div>
    </div>
  );
};

export default LeadSidebar;
