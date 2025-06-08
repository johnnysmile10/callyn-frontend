
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { TargetAudience } from "../types";

interface Step1TargetAudienceProps {
  data: TargetAudience;
  onUpdate: (data: TargetAudience) => void;
}

const Step1TargetAudience = ({ data, onUpdate }: Step1TargetAudienceProps) => {
  const [newIndustry, setNewIndustry] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const addItem = (category: keyof TargetAudience, value: string) => {
    if (value.trim()) {
      const currentList = data[category] as string[];
      onUpdate({
        ...data,
        [category]: [...currentList, value.trim()]
      });
    }
  };

  const removeItem = (category: keyof TargetAudience, index: number) => {
    const currentList = data[category] as string[];
    onUpdate({
      ...data,
      [category]: currentList.filter((_, i) => i !== index)
    });
  };

  const companySizes = [
    "1-10 employees",
    "11-50 employees", 
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Define Your Target Audience</CardTitle>
        <CardDescription>
          Specify who your ideal prospects are to ensure your AI agent reaches the right people
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Industries */}
        <div>
          <Label className="text-base font-medium">Target Industries</Label>
          <div className="flex gap-2 mt-2 mb-3">
            <Input
              placeholder="e.g., SaaS, Healthcare, Real Estate"
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addItem('industry', newIndustry);
                  setNewIndustry("");
                }
              }}
            />
            <Button 
              onClick={() => {
                addItem('industry', newIndustry);
                setNewIndustry("");
              }}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.industry?.map((industry, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {industry}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem('industry', index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Company Size */}
        <div>
          <Label className="text-base font-medium">Company Size</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {companySizes.map((size) => (
              <Button
                key={size}
                variant={data.companySize?.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const currentSizes = data.companySize || [];
                  if (currentSizes.includes(size)) {
                    onUpdate({
                      ...data,
                      companySize: currentSizes.filter(s => s !== size)
                    });
                  } else {
                    onUpdate({
                      ...data,
                      companySize: [...currentSizes, size]
                    });
                  }
                }}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Titles */}
        <div>
          <Label className="text-base font-medium">Target Job Titles</Label>
          <div className="flex gap-2 mt-2 mb-3">
            <Input
              placeholder="e.g., CEO, Marketing Director, Sales Manager"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addItem('jobTitles', newJobTitle);
                  setNewJobTitle("");
                }
              }}
            />
            <Button 
              onClick={() => {
                addItem('jobTitles', newJobTitle);
                setNewJobTitle("");
              }}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.jobTitles?.map((title, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {title}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem('jobTitles', index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <Label className="text-base font-medium">Target Locations</Label>
          <div className="flex gap-2 mt-2 mb-3">
            <Input
              placeholder="e.g., United States, California, New York City"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addItem('location', newLocation);
                  setNewLocation("");
                }
              }}
            />
            <Button 
              onClick={() => {
                addItem('location', newLocation);
                setNewLocation("");
              }}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.location?.map((loc, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {loc}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem('location', index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Custom Criteria */}
        <div>
          <Label htmlFor="customCriteria" className="text-base font-medium">
            Additional Criteria (Optional)
          </Label>
          <Textarea
            id="customCriteria"
            placeholder="Any specific requirements or characteristics of your ideal prospects..."
            value={data.customCriteria || ""}
            onChange={(e) => onUpdate({ ...data, customCriteria: e.target.value })}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1TargetAudience;
