
import { FC } from "react";
import { PricingProvider, usePricing } from "./PricingContext";
import NewEnhancedPricingCard from "./NewEnhancedPricingCard";
import PaymentTermSelector from "./PaymentTermSelector";
import FeatureMatrix from "./FeatureMatrix";
import FAQSection from "./FAQSection";
import FreeTrialHook from "./FreeTrialHook";
import PsychologicalFraming from "./PsychologicalFraming";
import AddOnsSection from "./AddOnsSection";
import HybridModeExplainer from "./HybridModeExplainer";
import { addOns, faqData } from "./newPricingData";

const PricingTableContent = () => {
  const { selectedTerm, setSelectedTerm, pricingPlans, paymentTerms } = usePricing();

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

        {/* Payment Term Selector */}
        <PaymentTermSelector 
          terms={paymentTerms}
          selectedTerm={selectedTerm.id}
          onTermChange={setSelectedTerm}
        />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <NewEnhancedPricingCard 
              key={`${plan.id}-${selectedTerm.id}`} 
              plan={plan} 
              selectedTerm={selectedTerm}
            />
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

const NewPricingTable: FC = () => {
  return (
    <PricingProvider>
      <PricingTableContent />
    </PricingProvider>
  );
};

export default NewPricingTable;
