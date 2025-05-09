
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Play, Pause, Google, Link as LinkIcon, Upload, FilePdf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

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

const ScenarioCard = ({ scenario, onSelect }: { scenario: ScenarioProps; onSelect: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    // In a real implementation, this would actually play/pause audio
    setIsPlaying(!isPlaying);
    console.log(`${isPlaying ? "Paused" : "Playing"} scenario: ${scenario.title}`);
  };

  return (
    <Card className="h-full flex flex-col cursor-pointer transition-all hover:border-callyn-blue" onClick={onSelect}>
      <CardHeader>
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 italic">"{scenario.script}"</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            togglePlay();
          }}
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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioProps | null>(null);
  const [trainingMethod, setTrainingMethod] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleScenarioSelect = (scenario: ScenarioProps) => {
    setSelectedScenario(scenario);
    setCurrentStep(3);
  };

  // Calculate the progress percentage based on current step
  const progressPercentage = (currentStep / 3) * 100;

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
            
            {/* Progress bar */}
            <div className="mt-8 max-w-md mx-auto">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">Step {currentStep} of 3</p>
            </div>
          </div>
          
          {/* Step 1: Choose Your Role */}
          {currentStep === 1 && (
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
                
                <div className="mt-12 text-center">
                  <Button 
                    onClick={handleNext}
                    className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium"
                  >
                    Next Step
                  </Button>
                </div>
              </Tabs>
            </div>
          )}
          
          {/* Step 2: Pick Industry Scenario */}
          {currentStep === 2 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
                STEP 2: Pick Industry Scenario + Hear Voice
              </h2>
              
              <div className="mt-6">
                {selectedTab === "sales" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {salesScenarios.map((scenario, index) => (
                      <ScenarioCard 
                        key={index} 
                        scenario={scenario} 
                        onSelect={() => handleScenarioSelect(scenario)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessScenarios.map((scenario, index) => (
                      <ScenarioCard 
                        key={index} 
                        scenario={scenario} 
                        onSelect={() => handleScenarioSelect(scenario)}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleBack}
                  variant="outline"
                  className="rounded-full px-8 py-2 text-lg font-medium mr-4"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Train Callyn with Your Business Info */}
          {currentStep === 3 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-callyn-darkBlue mb-6 text-center">
                STEP 3: Train Callyn with Your Business Info
              </h2>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-center text-gray-600 mb-8">
                  Choose how you want to train your AI agent, even if you don't have a public website.
                </p>
                
                <RadioGroup value={trainingMethod || ""} onValueChange={setTrainingMethod} className="grid gap-6">
                  {/* Google Business Profile Option */}
                  <Label 
                    htmlFor="google-business"
                    className={`flex p-4 border ${trainingMethod === 'google-business' ? 'border-callyn-blue bg-callyn-blue/5' : 'border-gray-200'} rounded-lg cursor-pointer hover:border-callyn-blue hover:bg-callyn-blue/5 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="google-business" id="google-business" className="mt-1" />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <Google className="h-5 w-5 text-callyn-blue" />
                          <h3 className="font-medium">Google Business Profile</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Search by business name and scan public Google data to train Callyn with your business information.
                        </p>
                      </div>
                    </div>
                  </Label>
                  
                  {/* Website URL Option */}
                  <Label 
                    htmlFor="website-url"
                    className={`flex p-4 border ${trainingMethod === 'website-url' ? 'border-callyn-blue bg-callyn-blue/5' : 'border-gray-200'} rounded-lg cursor-pointer hover:border-callyn-blue hover:bg-callyn-blue/5 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="website-url" id="website-url" className="mt-1" />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <LinkIcon className="h-5 w-5 text-callyn-blue" />
                          <h3 className="font-medium">Website URL</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Enter your domain and we'll crawl your site to train Callyn with your business content.
                        </p>
                        
                        {trainingMethod === 'website-url' && (
                          <div className="mt-3">
                            <Input
                              type="url"
                              placeholder="https://www.yourbusiness.com"
                              value={websiteUrl}
                              onChange={(e) => setWebsiteUrl(e.target.value)}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Label>
                  
                  {/* Upload PDF Option */}
                  <Label 
                    htmlFor="upload-pdf"
                    className={`flex p-4 border ${trainingMethod === 'upload-pdf' ? 'border-callyn-blue bg-callyn-blue/5' : 'border-gray-200'} rounded-lg cursor-pointer hover:border-callyn-blue hover:bg-callyn-blue/5 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="upload-pdf" id="upload-pdf" className="mt-1" />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <FilePdf className="h-5 w-5 text-callyn-blue" />
                          <h3 className="font-medium">Upload a PDF</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Upload a pitch deck, sales script, lead gen doc, or product PDF to train Callyn with your content.
                        </p>
                        
                        {trainingMethod === 'upload-pdf' && (
                          <div className="mt-3 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <div className="flex justify-center mb-2">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-sm mb-2">
                              {file ? file.name : "Drag & drop your PDF here, or click to browse"}
                            </p>
                            <Input
                              type="file"
                              id="pdf-upload"
                              className="hidden"
                              accept=".pdf"
                              onChange={handleFileChange}
                            />
                            <Button 
                              variant="outline"
                              className="mt-2"
                              onClick={() => document.getElementById('pdf-upload')?.click()}
                            >
                              Browse Files
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Label>
                </RadioGroup>
                
                <div className="mt-12 text-center">
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    className="rounded-full px-8 py-2 text-lg font-medium mr-4"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)} // Proceed to the final step
                    disabled={!trainingMethod || (trainingMethod === 'website-url' && !websiteUrl) || (trainingMethod === 'upload-pdf' && !file)}
                    className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Final CTA */}
          {currentStep === 4 && (
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
