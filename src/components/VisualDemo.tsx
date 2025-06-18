
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Users, MessageSquare, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const VisualDemo = () => {
  const steps = [
    {
      step: "1",
      title: "Upload Your Lead List",
      description: "Import your contacts via CSV or integrate with your CRM. Callyn automatically formats and validates your lead data.",
      icon: <Users className="w-8 h-8 text-callyn-blue" />,
      image: "/lovable-uploads/c1bf6c33-6c5c-4279-a6b1-53004666eb3c.png"
    },
    {
      step: "2", 
      title: "AI Makes the Call",
      description: "Your AI agent dials leads automatically, speaks in 20+ languages, and follows your exact pitch script with natural conversation.",
      icon: <Phone className="w-8 h-8 text-callyn-blue" />,
      image: "/lovable-uploads/7ef44233-156c-4bad-a3b0-c950117e25ba.png"
    },
    {
      step: "3",
      title: "Real-Time Qualification", 
      description: "Callyn qualifies prospects, handles objections, and adapts the conversation based on lead responses and behavior.",
      icon: <MessageSquare className="w-8 h-8 text-callyn-blue" />,
      image: "/lovable-uploads/678b295d-febe-47ba-ab83-b7a0cd897548.png"
    },
    {
      step: "4",
      title: "Automatic Booking",
      description: "Qualified leads get booked directly into your calendar. You get detailed transcripts and lead scoring for every call.",
      icon: <Calendar className="w-8 h-8 text-callyn-blue" />,
      image: "/lovable-uploads/61cfe4eb-6a50-461f-b2ab-a358715e242c.png"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            See How Callyn Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From lead upload to booked meetings — watch how Callyn automates your entire sales process in 4 simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:border-callyn-blue/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-callyn-blue/10 rounded-full flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-callyn-blue text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Mock Screenshot */}
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                      <img 
                        src={step.image} 
                        alt={`${step.title} interface preview`}
                        className="w-full h-32 object-cover rounded opacity-70"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-r from-callyn-blue to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            The Result? More Qualified Meetings, Less Manual Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">5x</div>
              <div className="text-blue-100">More Calls Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-blue-100">Always Working</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">85%</div>
              <div className="text-blue-100">Time Saved</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to See It in Action?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Start your free trial and watch Callyn transform your sales process in minutes.
          </p>
          <Button 
            size="lg" 
            className="bg-callyn-blue hover:bg-callyn-darkBlue text-white text-lg py-6 px-12 rounded-full font-bold"
            asChild
          >
            <Link to="/onboarding">
              Start Free Trial — 45 Minutes Free →
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Setup in 6 minutes • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisualDemo;
