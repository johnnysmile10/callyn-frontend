
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, ArrowRight, CheckCircle, Clock, User, Bot } from "lucide-react";
import { useAuth } from "@/context";

interface NewUserWelcomeProps {
  onStartQuickSetup: () => void;
}

const NewUserWelcome = ({ onStartQuickSetup }: NewUserWelcomeProps) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Bot className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Callyn, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Let's get your AI calling agent set up in just 6 minutes
          </p>
        </div>
      </div>

      {/* Quick Setup CTA */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Rocket className="h-6 w-6 text-blue-600" />
            Quick Start Setup
          </CardTitle>
          <CardDescription className="text-lg">
            The fastest way to get started with your first AI agent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium">Business Setup</p>
                <p className="text-sm text-gray-600">Tell us about your business</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <p className="font-medium">Choose Voice</p>
                <p className="text-sm text-gray-600">Select your AI agent's voice</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <div>
                <p className="font-medium">Create Script</p>
                <p className="text-sm text-gray-600">Generate your call script</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium mb-3">What you'll get:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">AI agent ready to call</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Custom voice & personality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Optimized call script</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Lead management system</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              onClick={onStartQuickSetup}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start 6-Minute Setup
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              No credit card required • Setup takes 6 minutes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Browse Dashboard</CardTitle>
            <CardDescription>
              Explore the interface first before setting up your agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Take a look around the dashboard to understand how Callyn works. You can start the setup anytime.
            </p>
            <Button variant="outline" className="w-full">
              Explore Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Watch Demo</CardTitle>
            <CardDescription>
              See how AI agents work with a quick video demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Watch a 3-minute demo to see how Callyn AI agents handle real sales calls.
            </p>
            <Button variant="outline" className="w-full">
              Watch Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewUserWelcome;
