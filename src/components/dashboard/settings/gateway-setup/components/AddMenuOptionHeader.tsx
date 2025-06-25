
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const AddMenuOptionHeader = () => {
  return (
    <>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          Add New Menu Option
        </CardTitle>
      </CardHeader>
      
      <Alert className="bg-blue-50 border-blue-200 mx-6 mb-4">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm">
          <strong>Quick Guide:</strong> Configure how your AI agent should respond to phone menu prompts. 
          Choose from common templates below or create a custom option. Each option tells the agent what to do 
          when it hears a specific prompt during a call.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default AddMenuOptionHeader;
