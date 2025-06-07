
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, Globe, Wand2, ArrowRight, ArrowLeft, CheckCircle, Clock } from "lucide-react";

interface NewStep3QuickScriptProps {
  handleNext: () => void;
  handleBack: () => void;
  onDataUpdate: (data: any) => void;
  initialData: any;
  isProcessing: boolean;
  processingState: string;
}

const NewStep3QuickScript = ({ 
  handleNext, 
  handleBack, 
  onDataUpdate, 
  initialData,
  isProcessing,
  processingState 
}: NewStep3QuickScriptProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>(initialData.scriptMethod || "");
  const [websiteUrl, setWebsiteUrl] = useState(initialData.websiteUrl || "");
  const [uploadedFile, setUploadedFile] = useState<File | null>(initialData.uploadedFile || null);
  const [customScript, setCustomScript] = useState(initialData.customScript || "");

  const methods = [
    {
      id: "website",
      title: "Import from Website",
      description: "Callyn will scan your website for key selling points",
      icon: Globe,
      badge: "Fastest",
      time: "30 seconds"
    },
    {
      id: "upload",
      title: "Upload Sales Materials",
      description: "Upload brochures, scripts, or presentations", 
      icon: Upload,
      badge: "Most Accurate",
      time: "1 minute"
    },
    {
      id: "manual",
      title: "Quick Manual Input",
      description: "Type your key selling points directly",
      icon: FileText,
      badge: "Full Control", 
      time: "2 minutes"
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    const data = {
      scriptMethod: selectedMethod,
      websiteUrl: selectedMethod === "website" ? websiteUrl : "",
      uploadedFile: selectedMethod === "upload" ? uploadedFile : null,
      customScript: selectedMethod === "manual" ? customScript : ""
    };
    
    onDataUpdate(data);
    handleNext();
  };

  const isFormValid = () => {
    if (!selectedMethod) return false;
    
    switch (selectedMethod) {
      case "website":
        return websiteUrl.trim() !== "";
      case "upload":
        return uploadedFile !== null;
      case "manual":
        return customScript.trim() !== "";
      default:
        return false;
    }
  };

  if (isProcessing) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🧠 Callyn is Learning Your Business...
            </h3>
            <p className="text-gray-600 mb-4">{processingState}</p>
            <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                This usually takes 30-60 seconds. Callyn is analyzing your content to create personalized talking points.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Wand2 className="h-6 w-6 text-blue-600" />
            Quick Script Setup
          </CardTitle>
          <CardDescription className="text-lg">
            Choose how you'd like Callyn to learn about your products/services. You can always refine this later.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                  className={`p-6 rounded-lg border-2 transition-all text-left relative ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Badge className="absolute top-3 right-3 text-xs">
                    {method.badge}
                  </Badge>
                  <Icon className={`h-8 w-8 mb-3 ${
                    selectedMethod === method.id ? "text-blue-600" : "text-gray-600"
                  }`} />
                  <h3 className={`font-semibold mb-2 ${
                    selectedMethod === method.id ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {method.time}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Method-specific inputs */}
          {selectedMethod === "website" && (
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Website URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="text-sm text-gray-600">
                ✅ Callyn will automatically extract your key selling points, services, and pricing information.
              </div>
            </div>
          )}

          {selectedMethod === "upload" && (
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Sales Materials
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, TXT up to 10MB</p>
                </div>
                {uploadedFile && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    {uploadedFile.name} uploaded successfully
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedMethod === "manual" && (
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Selling Points & Services
                </label>
                <Textarea
                  value={customScript}
                  onChange={(e) => setCustomScript(e.target.value)}
                  placeholder="Tell Callyn about your main services, pricing, unique value propositions, common objections and responses, etc. The more detail you provide, the better Callyn will perform."
                  className="min-h-32"
                />
              </div>
              <div className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> Include pricing, common objections, competitor advantages, and success stories.
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleBack} size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleContinue} 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isFormValid()}
            >
              Process & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewStep3QuickScript;
