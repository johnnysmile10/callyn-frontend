
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Mic, Type, FileText } from "lucide-react";
import { AgentData } from "@/pages/CreateAgent";

interface Step4Props {
  data: AgentData;
  updateData: (updates: Partial<AgentData>) => void;
  onNext: () => void;
}

const Step4TrainingMethod = ({ data, updateData, onNext }: Step4Props) => {
  const [selectedMethod, setSelectedMethod] = useState<"upload" | "record" | "type" | null>(data.trainingMethod);
  const [typedScript, setTypedScript] = useState(data.typedScript || "");
  const [isRecording, setIsRecording] = useState(false);

  const handleMethodSelect = (method: "upload" | "record" | "type") => {
    setSelectedMethod(method);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateData({ uploadedFiles: files });
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, you would start audio recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real implementation, you would stop recording and save the audio blob
  };

  const handleNext = () => {
    updateData({
      trainingMethod: selectedMethod,
      typedScript: selectedMethod === "type" ? typedScript : undefined
    });
    onNext();
  };

  const canProceed = selectedMethod && (
    selectedMethod !== "type" || typedScript.trim().length > 0
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">How do you want to train your agent?</h2>
        <p className="text-gray-600">Choose the best method to teach your agent how to communicate</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMethod === "upload" ? "ring-2 ring-callyn-blue" : ""
          }`}
          onClick={() => handleMethodSelect("upload")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Upload Files</CardTitle>
            <CardDescription className="text-sm">
              Upload existing scripts, documents, or training materials
            </CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMethod === "record" ? "ring-2 ring-callyn-blue" : ""
          }`}
          onClick={() => handleMethodSelect("record")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Mic className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-lg">Record Yourself</CardTitle>
            <CardDescription className="text-sm">
              Record sample conversations or practice your pitch
            </CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMethod === "type" ? "ring-2 ring-callyn-blue" : ""
          }`}
          onClick={() => handleMethodSelect("type")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Type className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Type Script</CardTitle>
            <CardDescription className="text-sm">
              Write your sales script or conversation guidelines
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Method-specific content */}
      {selectedMethod === "upload" && (
        <Card className="p-6">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Training Files</h3>
            <p className="text-gray-600 mb-4">
              Upload PDFs, Word documents, or text files containing your scripts and training materials
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </Card>
      )}

      {selectedMethod === "record" && (
        <Card className="p-6">
          <div className="text-center">
            <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Record Training Audio</h3>
            <p className="text-gray-600 mb-4">
              Record yourself giving your sales pitch or handling common scenarios
            </p>
            <Button 
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>
        </Card>
      )}

      {selectedMethod === "type" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Enter Your Script</h3>
          <Textarea
            value={typedScript}
            onChange={(e) => setTypedScript(e.target.value)}
            placeholder="Enter your sales script, conversation guidelines, or key talking points here..."
            className="min-h-40"
          />
          <p className="text-sm text-gray-500 mt-2">
            Include key messages, common objections and responses, and your call-to-action
          </p>
        </Card>
      )}

      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="px-8 py-3 bg-callyn-blue hover:bg-callyn-darkBlue"
        >
          Continue to Call Behavior
        </Button>
      </div>
    </div>
  );
};

export default Step4TrainingMethod;
