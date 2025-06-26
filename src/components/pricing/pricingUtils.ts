
import { PricingTier, PaymentTerm, PricingPlan } from './types';

export const calculatePrice = (basePrice: number, term: PaymentTerm): number => {
  const discountedPrice = basePrice * (1 - term.discount);
  return Math.round(discountedPrice);
};

export const calculateSavings = (basePrice: number, term: PaymentTerm): string | undefined => {
  if (term.discount === 0) return undefined;
  
  const monthlyTotal = basePrice * term.months;
  const discountedTotal = calculatePrice(basePrice, term) * term.months;
  const savings = monthlyTotal - discountedTotal;
  
  return `Save $${savings}`;
};

export const formatPrice = (price: number): string => {
  return `$${price}`;
};

export const transformTierToPlan = (tier: PricingTier, term: PaymentTerm): PricingPlan => {
  const calculatedPrice = calculatePrice(tier.basePrice, term);
  const savings = calculateSavings(tier.basePrice, term);
  
  return {
    ...tier,
    price: formatPrice(calculatedPrice),
    savings
  };
};
