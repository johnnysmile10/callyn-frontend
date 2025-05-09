
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, Link as LinkIcon, Upload, FileText } from "lucide-react";

interface Step3Props {
  trainingMethod: string | null;
  setTrainingMethod: (method: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  handleBack: () => void;
  handleNext: () => void;
}

const Step3TrainingMethod = ({
  trainingMethod,
  setTrainingMethod,
  websiteUrl,
  setWebsiteUrl,
  file,
  setFile,
  handleBack,
  handleNext,
}: Step3Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
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
                  <Building className="h-5 w-5 text-callyn-blue" />
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
                  <FileText className="h-5 w-5 text-callyn-blue" />
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
            onClick={handleNext}
            disabled={!trainingMethod || (trainingMethod === 'website-url' && !websiteUrl) || (trainingMethod === 'upload-pdf' && !file)}
            className="rounded-full bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-2 text-lg font-medium"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3TrainingMethod;
