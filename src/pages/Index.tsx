
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VisualDemo from "@/components/VisualDemo";
import ComparisonTable from "@/components/ComparisonTable";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PricingPlans from "@/components/PricingPlans";
import { Separator } from "@/components/ui/separator";
import ContactForm from "@/components/ContactForm";
import ComparisonColumns from "@/components/ComparisonColumns";
import ComparisonZigZag from "@/components/ComparisonZigZag";
import PricingTable from "@/components/PricingTable";
import PricingAudienceTabs from "@/components/pricing/PricingAudienceTabs";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Visual Demo Section - NEW */}
      <VisualDemo />
      
      {/* Moved PricingPlans section here based on user's request */}
      <PricingPlans />
      
      {/* New Zig-Zag Comparison Layout */}
      <ComparisonZigZag />
      
      {/* Enhanced Pricing Table - Now the main pricing section */}
      <PricingTable />
      
      <HowItWorks />
      
      {/* Contact Form */}
      <ContactForm />
      
      {/* CTA Section */}
      <section className="bg-callyn-background py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-callyn-darkBlue mb-8">
            Ready to close more deals with AI?
          </h2>
          <div className="flex flex-col items-center">
            <Button className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-lg py-6 px-8" asChild>
              <Link to="/onboarding">Get Started for Free</Link>
            </Button>
            <p className="mt-4 text-gray-500">
              First 45 minutes completely free. No credit card required.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-14 w-14 rounded-full bg-callyn-blue hover:bg-callyn-darkBlue flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Index;
