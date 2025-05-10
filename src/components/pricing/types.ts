
export interface PlanFeatures {
  inboundCalls: boolean;
  customScriptSupport: boolean;
  textTranscripts: boolean;
  calendarIntegration: boolean;
  smartRouting: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  hybridMode: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  minutes: string;
  features: PlanFeatures;
  audience: string;
  popular: boolean;
  isCustomPlan?: boolean;
}

export interface AddOn {
  minutes: string;
  price: string;
}
