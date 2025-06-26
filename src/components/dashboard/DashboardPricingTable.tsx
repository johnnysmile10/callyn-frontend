
import { FC } from "react";
import { PricingProvider, usePricing } from "../pricing/PricingContext";
import NewEnhancedPricingCard from "../pricing/NewEnhancedPricingCard";
import PaymentTermSelector from "../pricing/PaymentTermSelector";
import FeatureMatrix from "../pricing/FeatureMatrix";
import FAQSection from "../pricing/FAQSection";
import PsychologicalFraming from "../pricing/PsychologicalFraming";
import AddOnsSection from "../pricing/AddOnsSection";
import HybridModeExplainer from "../pricing/HybridModeExplainer";
import { addOns, faqData } from "../pricing/newPricingData";

const DashboardPricingContent = () => {
  const { selectedTerm, setSelectedTerm, pricingPlans, paymentTerms } = usePricing();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Callyn helps you follow up, qualify, and book 24/7 — so you never miss a close. 
          Every plan includes AI voice calls, SMS follow-ups, and transcripts.
        </p>
      </div>

      {/* Psychological Framing */}
      <PsychologicalFraming />

      {/* Payment Term Selector */}
      <PaymentTermSelector 
        terms={paymentTerms}
        selectedTerm={selectedTerm.id}
        onTermChange={setSelectedTerm}
      />

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <NewEnhancedPricingCard 
            key={`${plan.id}-${selectedTerm.id}`} 
            plan={plan} 
            selectedTerm={selectedTerm}
          />
        ))}
      </div>
      
      {/* Upgrade/Cancel Anytime text */}
      <div className="text-center text-gray-600">
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
  );
};

const DashboardPricingTable: FC = () => {
  return (
    <PricingProvider>
      <DashboardPricingContent />
    </PricingProvider>
  );
};

export default DashboardPricingTable;
