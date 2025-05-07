
import { Building, PhoneCall, MessageSquare, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComparisonColumns = () => {
  const industries = [
    "Services",
    "Clinics",
    "Agencies",
    "Law Firms",
    "Real Estate",
    "Contractors"
  ];
  
  const comparisons = [
    { voicemail: "Missed calls go to voicemail", callyn: "Every call answered instantly" },
    { voicemail: "80% hang up", callyn: "Human-like engagement" }
  ];
  
  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-16">
          Never miss an opportunity because you can't answer the phone.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Industries Served */}
          <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 bg-rosie-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-rosie-darkPurple text-xl">Built for businesses like yours</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {industries.map((industry, index) => (
                  <span 
                    key={index} 
                    className="bg-rosie-lightPurple text-rosie-darkPurple px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Column 2: Call Comparison */}
          <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 bg-callyn-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-rosie-darkPurple text-xl">Voicemail vs Callyn</CardTitle>
            </CardHeader>
            <CardContent>
              {comparisons.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-rose-500">✕</span>
                    <span className="text-sm text-gray-600">{item.voicemail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-callyn-blue">✓</span>
                    <span className="text-sm font-medium">{item.callyn}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Column 3: Core Advantage */}
          <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 bg-rosie-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-rosie-darkPurple text-xl">Core Advantage</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-medium text-rosie-darkPurple">
                No more hangups.
              </p>
              <p className="mt-2 text-gray-600">
                Callyn talks to every lead, day or night, capturing information and booking appointments.
              </p>
            </CardContent>
          </Card>
          
          {/* Column 4: Cost Block */}
          <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 bg-callyn-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-rosie-darkPurple text-xl">Cost Effective</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-medium text-rosie-darkPurple">
                10x cheaper
              </p>
              <p className="mt-2 text-gray-600">
                than hiring or outsourcing calls to an answering service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonColumns;
