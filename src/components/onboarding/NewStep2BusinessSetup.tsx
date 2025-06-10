
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Building, MapPin, Users, Globe } from "lucide-react";
import LanguagePreviewSystem from "../dashboard/language/LanguagePreviewSystem";
import { SUPPORTED_LANGUAGES, getDefaultVoiceForLanguage } from "../dashboard/language/languageConfig";

interface NewStep2BusinessSetupProps {
  handleNext: () => void;
  handleBack: () => void;
  onDataUpdate: (data: any) => void;
  initialData: any;
}

const NewStep2BusinessSetup = ({ handleNext, handleBack, onDataUpdate, initialData }: NewStep2BusinessSetupProps) => {
  const [businessName, setBusinessName] = useState(initialData.businessName || "");
  const [industry, setIndustry] = useState(initialData.industry || "");
  const [businessSize, setBusinessSize] = useState(initialData.businessSize || "");
  const [selectedLanguage, setSelectedLanguage] = useState(initialData.selectedLanguage || "en");
  const [selectedVoice, setSelectedVoice] = useState(initialData.selectedVoice || "");

  const industries = [
    "Technology", "Healthcare", "Finance", "Real Estate", "E-commerce", 
    "Education", "Manufacturing", "Consulting", "Marketing", "Legal",
    "Insurance", "Automotive", "Food & Beverage", "Travel", "Other"
  ];

  const businessSizes = [
    "Solo (Just me)", "Small (2-10 employees)", "Medium (11-50 employees)", 
    "Large (51-200 employees)", "Enterprise (200+ employees)"
  ];

  // Update selected voice when language changes
  useEffect(() => {
    if (selectedLanguage && !selectedVoice) {
      const defaultVoice = getDefaultVoiceForLanguage(selectedLanguage);
      setSelectedVoice(defaultVoice);
    }
  }, [selectedLanguage, selectedVoice]);

  // Update parent component when data changes
  useEffect(() => {
    onDataUpdate({
      businessName,
      industry,
      businessSize,
      selectedLanguage,
      selectedVoice
    });
  }, [businessName, industry, businessSize, selectedLanguage, selectedVoice, onDataUpdate]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const defaultVoice = getDefaultVoiceForLanguage(language);
    setSelectedVoice(defaultVoice);
  };

  const isFormValid = businessName.trim() && industry && businessSize && selectedLanguage;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Tell Us About Your Business
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Help us create an AI agent that perfectly represents your company
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Information */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Industry *
                </Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Business Size *
                </Label>
                <Select value={businessSize} onValueChange={setBusinessSize}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select business size" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Primary Language *
                </Label>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                          <span className="text-gray-500">({lang.nativeName})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language Preview */}
              {selectedLanguage && (
                <LanguagePreviewSystem 
                  selectedLanguage={selectedLanguage}
                  selectedVoice={selectedVoice}
                  onLanguageChange={handleLanguageChange}
                  onVoiceChange={setSelectedVoice}
                />
              )}
            </div>
          </div>

          {/* Business Summary Preview */}
          {isFormValid && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-900 mb-3">Business Profile Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">Company:</span>
                    <p className="text-green-900">{businessName}</p>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Industry:</span>
                    <p className="text-green-900">{industry}</p>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Size:</span>
                    <p className="text-green-900">{businessSize}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-green-700 font-medium">Language:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage)?.flag} {SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage)?.name}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!isFormValid}
              className="flex items-center gap-2"
            >
              Continue to Script Setup
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewStep2BusinessSetup;
