
import { CallRecord } from "./types";

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const getOutcomeBadgeClass = (outcome: string): string => {
  const colors = {
    answered: "bg-blue-100 text-blue-800",
    voicemail: "bg-yellow-100 text-yellow-800", 
    "no-answer": "bg-gray-100 text-gray-800",
    busy: "bg-orange-100 text-orange-800",
    failed: "bg-red-100 text-red-800",
    booked: "bg-green-100 text-green-800",
    interested: "bg-purple-100 text-purple-800",
    "not-interested": "bg-red-100 text-red-800"
  };
  
  return colors[outcome as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const exportCallsToCSV = (calls: CallRecord[]): void => {
  const csvContent = [
    // CSV headers
    "Timestamp,Contact,Phone,Company,Duration,Outcome,Campaign,Cost,Notes",
    // CSV rows
    ...calls.map(call => 
      `${call.timestamp},"${call.contactName}","${call.contactPhone}","${call.contactCompany || ''}",${call.duration},"${call.outcome}","${call.campaign || ''}","${call.cost}","${call.notes || ''}"`
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `call-log-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
