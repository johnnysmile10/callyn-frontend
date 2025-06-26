
import { FC } from "react";
import { pricingPlans as pricingTiers, addOns, faqData } from "./pricing/pricingPlansData";
import { paymentTerms } from "./pricing/newPricingData";
import { transformTierToPlan } from "./pricing/pricingUtils";
import EnhancedPricingCard from "./pricing/EnhancedPricingCard";
import FeatureMatrix from "./pricing/FeatureMatrix";
import FAQSection from "./pricing/FAQSection";
import FreeTrialHook from "./pricing/FreeTrialHook";
import PsychologicalFraming from "./pricing/PsychologicalFraming";
import AddOnsSection from "./pricing/AddOnsSection";
import HybridModeExplainer from "./pricing/HybridModeExplainer";

const PricingTable: FC = () => {
  // Transform pricing tiers to pricing plans using monthly payment term
  const monthlyTerm = paymentTerms.find(term => term.id === 'monthly') || paymentTerms[0];
  const pricingPlans = pricingTiers.map(tier => transformTierToPlan(tier, monthlyTerm));

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Free Trial Hook */}
        <FreeTrialHook />
        
        {/* Psychological Framing */}
        <PsychologicalFraming />
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Callyn helps you follow up, qualify, and book 24/7 — so you never miss a close. 
            Every plan includes AI voice calls, SMS follow-ups, and transcripts.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <EnhancedPricingCard key={index} plan={plan} />
          ))}
        </div>
        
        {/* Upgrade/Cancel Anytime text */}
        <div className="text-center mb-8 text-gray-600">
          <p className="text-lg">✓ Upgrade or cancel anytime • ✓ No long-term contracts • ✓ 45-minute free trial</p>
        </div>
        
        {/* Feature Matrix */}
        <FeatureMatrix plans={pricingPlans} />
        
        {/* Hybrid Mode Explainer */}
        <HybridModeExplainer />

        {/* Add-ons section */}
        <AddOnsSection addOns={addOns} />
        
        {/* FAQ Section */}
        <FAQSection faqs={faqData} />
      </div>
    </section>
  );
};

export default PricingTable;
