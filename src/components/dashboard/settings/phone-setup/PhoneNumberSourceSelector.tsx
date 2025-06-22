
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Download } from "lucide-react";

interface PhoneNumberSourceSelectorProps {
  selectedSource: "provision" | "byod";
  onSourceChange: (source: "provision" | "byod") => void;
}

const PhoneNumberSourceSelector = ({ selectedSource, onSourceChange }: PhoneNumberSourceSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Phone Number Option</CardTitle>
        <CardDescription>
          Select how you want to get a phone number for your AI agent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={selectedSource === "provision" ? "default" : "outline"}
            className="h-auto p-6 flex flex-col items-center gap-3"
            onClick={() => onSourceChange("provision")}
          >
            <Phone className="h-8 w-8" />
            <div className="text-center">
              <div className="font-semibold">Get New Number</div>
              <div className="text-sm opacity-75">
                Choose from available numbers
              </div>
            </div>
          </Button>

          <Button
            variant={selectedSource === "byod" ? "default" : "outline"}
            className="h-auto p-6 flex flex-col items-center gap-3"
            onClick={() => onSourceChange("byod")}
          >
            <Download className="h-8 w-8" />
            <div className="text-center">
              <div className="font-semibold">Bring Your Own Number</div>
              <div className="text-sm opacity-75">
                Port your existing number
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneNumberSourceSelector;
