
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComparisonTable from "@/components/ComparisonTable";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <ComparisonTable />
      <HowItWorks />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="bg-rosie-background py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-rosie-darkPurple mb-8">
            Ready to start answering every call?
          </h2>
          <Button className="rounded-full bg-rosie-purple hover:bg-rosie-darkPurple text-lg py-6 px-8">
            Get Started for Free
          </Button>
          <p className="mt-4 text-gray-500">
            First 25 minutes completely free. No credit card required.
          </p>
        </div>
      </section>
      
      <Footer />
      
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-14 w-14 rounded-full bg-rosie-purple hover:bg-rosie-darkPurple flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Index;
