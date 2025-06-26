
import { PricingTier, AddOn } from './types';

export const pricingPlans: PricingTier[] = [
  {
    id: 'starter',
    name: "Starter",
    basePrice: 49,
    minutes: "250",
    features: {
      inboundCalls: true,
      customScriptSupport: true,
      textTranscripts: true,
      calendarIntegration: false,
      smartRouting: false,
      prioritySupport: false,
      hybridMode: false
    },
    audience: "Perfect for solo sales reps testing Callyn",
    popular: false,
  },
  {
    id: 'pro',
    name: "Pro",
    basePrice: 97,
    minutes: "500",
    features: {
      inboundCalls: true,
      customScriptSupport: true,
      textTranscripts: true,
      calendarIntegration: true,
      smartRouting: true,
      prioritySupport: false,
      hybridMode: true
    },
    audience: "Best for growing sales teams",
    popular: true,
  },
  {
    id: 'closer',
    name: "Closer",
    basePrice: 197,
    minutes: "1,500",
    features: {
      inboundCalls: true,
      customScriptSupport: true,
      textTranscripts: true,
      calendarIntegration: true,
      smartRouting: true,
      prioritySupport: true,
      hybridMode: true
    },
    audience: "Best for high-volume individual closers",
    popular: false,
  }
];

export const addOns: AddOn[] = [
  { minutes: "500", price: "$59" },
  { minutes: "1,000", price: "$99" },
  { minutes: "2,000", price: "$179" },
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
    question: "Can I change plans anytime?",
    answer: "Yes! Upgrade or downgrade your plan anytime. Changes take effect immediately, and we'll prorate any billing differences."
  },
  {
    question: "What is Hybrid Mode?",
    answer: "Hybrid Mode lets you jump into any AI call live. Perfect for closing high-value prospects or handling complex objections personally."
  },
  {
    question: "What if I don't close any deals?",
    answer: "While we can't guarantee specific results, most users see improved lead qualification and booking rates within the first week. Our 45-minute free trial lets you test risk-free."
  }
];
