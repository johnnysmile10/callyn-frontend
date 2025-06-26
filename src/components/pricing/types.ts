
export interface PlanFeatures {
  inboundCalls: boolean;
  customScriptSupport: boolean;
  textTranscripts: boolean;
  calendarIntegration: boolean;
  smartRouting: boolean;
  prioritySupport: boolean;
  hybridMode: boolean;
}

export interface PaymentTerm {
  id: string;
  label: string;
  months: number;
  discount: number;
  popular?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  basePrice: number; // Monthly base price
  minutes: string;
  features: PlanFeatures;
  audience: string;
  popular: boolean;
  isCustomPlan?: boolean;
}

export interface PricingPlan extends PricingTier {
  price: string; // Calculated price based on selected term
  savings?: string; // Savings text for discounted terms
}

export interface AddOn {
  minutes: string;
  price: string;
}
