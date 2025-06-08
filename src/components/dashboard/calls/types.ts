
export interface CallRecord {
  id: string;
  timestamp: string;
  contactName: string;
  contactPhone: string;
  contactCompany?: string;
  duration: number;
  outcome: "answered" | "voicemail" | "no-answer" | "busy" | "failed" | "booked" | "interested" | "not-interested";
  campaign?: string;
  agent: string;
  cost: number;
  recording?: string;
  transcript?: string;
  notes?: string;
  tags: string[];
  leadScore?: number;
  followUpDate?: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface CallLogStats {
  total: number;
  answered: number;
  booked: number;
  totalDuration: number;
  totalCost: number;
  avgDuration: number;
  bookingRate: number;
}
