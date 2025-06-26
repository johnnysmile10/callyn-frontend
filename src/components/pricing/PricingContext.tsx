
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaymentTerm, PricingPlan } from './types';
import { pricingTiers, paymentTerms } from './newPricingData';
import { transformTierToPlan } from './pricingUtils';

interface PricingContextType {
  selectedTerm: PaymentTerm;
  setSelectedTerm: (termId: string) => void;
  pricingPlans: PricingPlan[];
  paymentTerms: PaymentTerm[];
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider = ({ children }: PricingProviderProps) => {
  const [selectedTerm, setSelectedTermState] = useState<PaymentTerm>(
    paymentTerms.find(term => term.popular) || paymentTerms[0]
  );

  const setSelectedTerm = (termId: string) => {
    const term = paymentTerms.find(t => t.id === termId);
    if (term) {
      setSelectedTermState(term);
    }
  };

  const pricingPlans = pricingTiers.map(tier => 
    transformTierToPlan(tier, selectedTerm)
  );

  return (
    <PricingContext.Provider value={{
      selectedTerm,
      setSelectedTerm,
      pricingPlans,
      paymentTerms
    }}>
      {children}
    </PricingContext.Provider>
  );
};
