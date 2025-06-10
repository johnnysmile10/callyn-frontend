
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Target, Users, ArrowRight, ArrowLeft, Lightbulb, Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/components/dashboard/language/languageConfig";

interface NewStep2BusinessSetupProps {
  handleNext: () => void;
  handleBack: () => void;
  onDataUpdate: (data: any) => void;
  initialData: any;
}

const NewStep2BusinessSetup = ({ handleNext, handleBack, onDataUpdate, initialData }: NewStep2BusinessSetupProps) => {
  const [formData, setFormData] = useState({
    businessName: initialData.businessName || "",
    industry: initialData.industry || "",
    targetAudience: initialData.targetAudience || "",
    mainGoal: initialData.mainGoal || "",
    primaryLanguage: initialData.primaryLanguage || "en",
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    "Real Estate",
    "Insurance", 
    "SaaS/Technology",
    "Healthcare",
    "Financial Services",
    "Education",
    "Retail/E-commerce",
    "Consulting",
    "Legal Services",
    "Other"
  ];

  const goals = [
    "Lead qualification & scoring",
    "Appointment booking",
    "Product demos scheduling", 
    "Customer support & FAQ",
    "Sales follow-up calls",
    "Market research surveys"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.industry) newErrors.industry = "Please select your industry";
    if (!formData.targetAudience.trim()) newErrors.targetAudience = "Target audience is required";
    if (!formData.mainGoal) newErrors.mainGoal = "Please select your main goal";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onDataUpdate(formData);
      handleNext();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === formData.primaryLanguage);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building className="h-6 w-6 text-blue-600" />
            Tell Callyn About Your Business
          </CardTitle>
          <CardDescription className="text-lg">
            This helps your AI agent understand your industry and speak like an expert to your prospects.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-base font-medium">
                Business Name *
              </Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="e.g., Smith Real Estate Group"
                className={`h-12 ${errors.businessName ? "border-red-500" : ""}`}
              />
              {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger className={`h-12 ${errors.industry ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience" className="text-base font-medium">
              Who are you trying to reach? *
            </Label>
            <Textarea
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange("targetAudience", e.target.value)}
              placeholder="e.g., First-time homebuyers in Austin, Small business owners looking for insurance, CTOs at 50-500 person companies..."
              className={`min-h-20 ${errors.targetAudience ? "border-red-500" : ""}`}
            />
            {errors.targetAudience && <p className="text-sm text-red-500">{errors.targetAudience}</p>}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
              <span>Be specific! This helps Callyn speak their language and address their pain points.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">Primary Goal for Your AI Agent *</Label>
              <Select value={formData.mainGoal} onValueChange={(value) => handleInputChange("mainGoal", value)}>
                <SelectTrigger className={`h-12 ${errors.mainGoal ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="What should your agent focus on?" />
                </SelectTrigger>
                <SelectContent>
                  {goals.map((goal) => (
                    <SelectItem key={goal} value={goal.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.mainGoal && <p className="text-sm text-red-500">{errors.mainGoal}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                Primary Language
              </Label>
              <Select value={formData.primaryLanguage} onValueChange={(value) => handleInputChange("primaryLanguage", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select primary language" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        <span className="text-sm text-gray-500">({lang.nativeName})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Your agent will primarily communicate in this language
              </p>
            </div>
          </div>

          {/* Preview Box */}
          {formData.businessName && formData.targetAudience && selectedLanguage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <span>{selectedLanguage.flag}</span>
                ✨ Preview: How Callyn will introduce your business
              </h4>
              <p className="text-blue-800 text-sm italic">
                {selectedLanguage.code === 'es' && 
                  `"Hola, llamo de ${formData.businessName}. Nos especializamos en ayudar a ${formData.targetAudience.toLowerCase()}..."`
                }
                {selectedLanguage.code === 'fr' && 
                  `"Bonjour, j'appelle de ${formData.businessName}. Nous nous spécialisons dans l'aide aux ${formData.targetAudience.toLowerCase()}..."`
                }
                {selectedLanguage.code === 'de' && 
                  `"Hallo, ich rufe von ${formData.businessName} an. Wir spezialisieren uns darauf, ${formData.targetAudience.toLowerCase()} zu helfen..."`
                }
                {selectedLanguage.code === 'en' && 
                  `"Hi, I'm calling from ${formData.businessName}. We specialize in helping ${formData.targetAudience.toLowerCase()}..."`
                }
                {!['en', 'es', 'fr', 'de'].includes(selectedLanguage.code) && 
                  `"Hi, I'm calling from ${formData.businessName}. We specialize in helping ${formData.targetAudience.toLowerCase()}..."`
                }
              </p>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleBack} size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleSubmit} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Continue to Script Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewStep2BusinessSetup;
