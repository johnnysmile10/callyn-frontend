
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { ImportResult } from './types';

interface CompleteStepProps {
  importResult: ImportResult;
  onReset: () => void;
}

const CompleteStep = ({ importResult, onReset }: CompleteStepProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center py-6">
        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
        <h3 className="text-xl font-semibold mb-2">Import Complete!</h3>
        <p className="text-gray-600">Your leads have been successfully imported</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{importResult.successful}</div>
            <div className="text-sm text-gray-600">Successful</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{importResult.failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{importResult.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
      </div>

      {importResult.errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Import Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-32 overflow-auto space-y-1">
              {importResult.errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">{error}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={onReset} className="w-full">
        Import Another File
      </Button>
    </div>
  );
};

export default CompleteStep;
