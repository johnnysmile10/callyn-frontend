import { Phone } from "lucide-react";

interface LeadInfo {
  name: string;
  phone: string;
  note?: string;
}

interface LeadInfoPanelProps {
  lead: LeadInfo;
}

/**
 * LeadInfoPanel - displays current lead info.
 * If lead is null or loading, show a skeleton/fallback.
 */
const LeadInfoPanel = ({ lead }: LeadInfoPanelProps) => {
  if (!lead) {
    return (
      <div className="mb-5 rounded-lg bg-white border border-blue-100 p-4 shadow flex flex-col gap-2 animate-pulse min-h-[70px]" aria-busy="true" aria-label="Loading lead info" />
    );
  }

  return (
    <div className="mb-5 rounded-lg bg-white border border-blue-100 p-4 shadow flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Phone className="h-4 w-4 text-blue-700" />
        <span className="text-blue-900 font-bold text-lg">{lead.name}</span>
      </div>
      <div className="text-xs text-blue-900 mb-1">{lead.phone}</div>
      {lead.note && (
        <div className="px-2 py-1 rounded bg-blue-50 text-xs text-blue-800">
          {lead.note}
        </div>
      )}
    </div>
  );
};

export default LeadInfoPanel;
