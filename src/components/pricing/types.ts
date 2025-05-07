
export interface PlanFeatures {
  inboundCalls: boolean;
  customizedAnswers: boolean;
  textTranscripts: boolean;
  calendarIntegration: boolean;
  advancedRouting: boolean;
  apiAccess: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  minutes: string;
  features: PlanFeatures;
  audience: string;
  popular: boolean;
}

export interface AddOn {
  minutes: string;
  price: string;
}
