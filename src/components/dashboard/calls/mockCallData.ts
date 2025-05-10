
// Mock data for call activity
export const mockCallData = {
  calls: [
    { 
      id: 1, 
      name: "John Smith", 
      phoneNumber: "(555) 123-4567", 
      dateTime: "Today, 2:30 PM", 
      duration: "3:42", 
      outcome: "Booked", 
      objection: null, 
      notes: "Interested in premium plan, has team of 5", 
      bookingLink: "https://calendly.com/example/meeting",
      transcript: "Client expressed interest in the premium features. Concerned about implementation timeline.",
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      phoneNumber: "(555) 234-5678", 
      dateTime: "Today, 1:15 PM", 
      duration: "4:15", 
      outcome: "Not Interested", 
      objection: "Already using competitor", 
      notes: "Currently using ProductX, contract renewal in 6 months", 
      bookingLink: null,
      transcript: "Client mentioned they're locked into a contract with CompetitorX for another 6 months.",
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      phoneNumber: "(555) 345-6789", 
      dateTime: "Today, 11:30 AM", 
      duration: "0:45", 
      outcome: "No Answer", 
      objection: null, 
      notes: "Left voicemail", 
      bookingLink: null,
      transcript: null,
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      phoneNumber: "(555) 456-7890", 
      dateTime: "Yesterday, 3:45 PM", 
      duration: "5:20", 
      outcome: "Booked", 
      objection: "Price concerns", 
      notes: "Negotiated 10% discount, needs approval", 
      bookingLink: "https://calendly.com/example/meeting",
      transcript: "Discussed pricing options. Client requested discount for annual commitment.",
    },
    { 
      id: 5, 
      name: "David Wilson", 
      phoneNumber: "(555) 567-8901", 
      dateTime: "2 days ago, 10:15 AM", 
      duration: "2:30", 
      outcome: "Callback", 
      objection: "Needs to consult team", 
      notes: "Will follow up next week after team meeting", 
      bookingLink: null,
      transcript: "Client needs to discuss with their team before making a decision.",
    },
    { 
      id: 6, 
      name: "Jennifer Taylor", 
      phoneNumber: "(555) 678-9012", 
      dateTime: "3 days ago, 1:30 PM", 
      duration: "4:10", 
      outcome: "Booked", 
      objection: null, 
      notes: "Very enthusiastic, ready to start immediately", 
      bookingLink: "https://calendly.com/example/meeting",
      transcript: "Client was excited about features X, Y, and Z. Ready to start onboarding process.",
    },
    { 
      id: 7, 
      name: "Robert Anderson", 
      phoneNumber: "(555) 789-0123", 
      dateTime: "Last week, Monday", 
      duration: "3:55", 
      outcome: "Voicemail", 
      objection: null, 
      notes: "Left detailed message with call back info", 
      bookingLink: null,
      transcript: null,
    },
  ]
};

// Type definition for call data
export type CallData = {
  id: number;
  name: string;
  phoneNumber: string;
  dateTime: string;
  duration: string;
  outcome: string;
  objection: string | null;
  notes: string | null;
  bookingLink: string | null;
  transcript: string | null;
};
