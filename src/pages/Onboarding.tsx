
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Play, Pause } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ScenarioProps {
  title: string;
  script: string;
  audioSrc?: string; // In a real implementation, this would point to actual audio files
}

// Sales plan scenarios
const salesScenarios: ScenarioProps[] = [
  {
    title: "Telco",
    script: "Hey, I'm Callyn, I'm calling on behalf of Telia Company. Can I ask what kind of phone service you and your company use?"
  },
  {
    title: "Solar Appointment Setter",
    script: "Hi, this is Callyn. I'm with SunGrid Solar. We're reaching out to see if your home qualifies for reduced-cost solar — mind if I ask a few quick questions?"
  },
  {
    title: "Fitness Lead Gen",
    script: "Hey, I'm Callyn with FitZone Gym. We're giving away 10 free guest passes in your area. Want to grab one?"
  },
  {
    title: "Real Estate Outreach",
    script: "Hi, I'm Callyn calling for Westbrook Realty. Are you the property owner? We're seeing strong demand in your area and wondered if you've considered selling."
  },
  {
    title: "Insurance Qualifying",
    script: "Hey, I'm Callyn with Nordic Life. Just a quick question — are you currently paying more than $80/month for life insurance?"
  }
];

// Business plan scenarios
const businessScenarios: ScenarioProps[] = [
  {
    title: "Barber / Salon",
    script: "Hey, I'm Callyn, calling on behalf of John's Barber Shop. How can I help you today?"
  },
  {
    title: "Plumber / Electrician",
    script: "Hello, you've reached Bergen Plumbing. Would you like to book a service call or ask about availability?"
  },
  {
    title: "Restaurant / Takeout",
    script: "Thanks for calling Napoli Pizza! Would you like to place an order or make a reservation?"
  },
  {
    title: "Dental Clinic",
    script: "Hi, this is Callyn from Oslo Dental. Are you calling to book an appointment or speak to someone?"
  },
  {
    title: "Moving Company",
    script: "Hey there, Callyn from Viking Movers. Are you planning a move soon? I can help get you a quote in under a minute."
  }
];

const ScenarioCard = ({ scenario }: { scenario: ScenarioProps }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    // In a real implementation, this would actually play/pause audio
    setIsPlaying(!isPlaying);
    console.log(`${isPlaying ? "Paused" : "Playing"} scenario: ${scenario.title}`);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 italic">"{scenario.script}"</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={togglePlay} 
          variant="outline"
          className="gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Hear Callyn"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Onboarding = () => {
  const [selectedTab, setSelectedTab] = useState("sales");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
              Hear Callyn in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your role and choose an industry example to hear how Callyn can help your business.
            </p>
          </div>
          
          {/* Step 1: Choose Your Role */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
              STEP 1: Choose Your Role
            </h2>
            <Tabs 
              defaultValue="sales" 
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full max-w-2xl mx-auto"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="sales" className="flex gap-2 py-4">
                  <Users className="h-5 w-5" />
                  <span>Sales Plan</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex gap-2 py-4">
                  <Briefcase className="h-5 w-5" />
                  <span>Business Plan</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4 text-center">
                {selectedTab === "sales" ? (
                  <p className="text-gray-600">For Salespeople, Closers & Appointment Setters</p>
                ) : (
                  <p className="text-gray-600">For Business Owners & Managers</p>
                )}
              </div>
            
              {/* Step 2: Pick Industry Scenario + Hear Voice */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
                  STEP 2: Pick Industry Scenario + Hear Voice
                </h2>
                
                <TabsContent value="sales" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {salesScenarios.map((scenario, index) => (
                      <ScenarioCard key={index} scenario={scenario} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="business" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessScenarios.map((scenario, index) => (
                      <ScenarioCard key={index} scenario={scenario} />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Final CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6">
              Ready to get started with Callyn?
            </h2>
            <div className="flex flex-col items-center">
              <Button 
                className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-10 py-6 text-lg font-medium"
                asChild
              >
                <Link to="/signup">Get Started For Free</Link>
              </Button>
              <p className="mt-4 text-gray-500">
                First 45 minutes completely free. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
