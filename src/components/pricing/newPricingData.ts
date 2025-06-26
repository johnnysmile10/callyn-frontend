
import { PricingTier, PaymentTerm, AddOn } from './types';

export const paymentTerms: PaymentTerm[] = [
  { id: 'monthly', label: 'Monthly', months: 1, discount: 0 },
  { id: 'quarterly', label: '3 Months', months: 3, discount: 0.10, popular: true },
  { id: 'biannual', label: '6 Months', months: 6, discount: 0.15 },
  { id: 'annual', label: '12 Months', months: 12, discount: 0.20 }
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'lite',
    name: "Lite",
    basePrice: 49,
    minutes: "500",
    features: {
      inboundCalls: true,
      customScriptSupport: true,
      textTranscripts: true,
      calendarIntegration: false,
      smartRouting: false,
      prioritySupport: false,
      hybridMode: false
    },
    audience: "Perfect for solopreneurs and small teams starting with AI calling",
    popular: false,
  },
  {
    id: 'pro',
    name: "Pro",
    basePrice: 97,
    minutes: "1,500",
    features: {
      inboundCalls: true,
      customScriptSupport: true,
      textTranscripts: true,
      calendarIntegration: true,
      smartRouting: true,
      prioritySupport: false,
      hybridMode: true
    },
    audience: "Ideal for growing sales teams and appointment setters",
    popular: true,
  },
  {
    id: 'elite',
    name: "Elite",
    basePrice: 197,
    minutes: "5,000",
    features: {
      inboundCalls: true,
      customScriptSupport: true,
      textTranscripts: true,
      calendarIntegration: true,
      smartRouting: true,
      prioritySupport: true,
      hybridMode: true
    },
    audience: "Built for high-volume closers and enterprise sales teams",
    popular: false,
  }
];

export const addOns: AddOn[] = [
  { minutes: "500", price: "$39" },
  { minutes: "1,000", price: "$69" },
  { minutes: "2,500", price: "$149" },
];

export const faqData = [
  {
    question: "How does the 45-minute free trial work?",
    answer: "You get 45 minutes of free calling time when you sign up. No credit card required. Test Callyn with your real prospects and see the results firsthand."
  },
  {
    question: "What happens if I exceed my monthly minutes?",
    answer: "Your calls will pause automatically. You can purchase additional minute packages or upgrade your plan instantly to continue calling."
  },
  {
    question: "Can I change plans or payment terms anytime?",
    answer: "Yes! Upgrade, downgrade, or switch payment terms anytime. Changes take effect immediately, and we'll prorate any billing differences."
  },
  {
    question: "What is Hybrid Mode?",
    answer: "Hybrid Mode lets you jump into any AI call live. Perfect for closing high-value prospects or handling complex objections personally."
  },
  {
    question: "Do longer payment terms really save money?",
    answer: "Absolutely! You save 10% with quarterly billing, 15% with 6-month plans, and 20% with annual plans. All plans include the same features and minute allocations."
  },
  {
    question: "What if I don't close any deals?",
    answer: "While we can't guarantee specific results, most users see improved lead qualification and booking rates within the first week. Our 45-minute free trial lets you test risk-free."
  }
];
