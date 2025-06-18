
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context";
import { CSVRow, FieldMapping, ImportResult, ImportStep, CSVLeadImporterProps } from './csv-importer/types';
import { REQUIRED_FIELDS } from './csv-importer/constants';
import UploadStep from './csv-importer/UploadStep';
import MappingStep from './csv-importer/MappingStep';
import PreviewStep from './csv-importer/PreviewStep';
import CompleteStep from './csv-importer/CompleteStep';

const CSVLeadImporter = ({ onLeadsImported }: CSVLeadImporterProps) => {
  const { updateProgressState } = useAuth();
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [importStep, setImportStep] = useState<ImportStep>('upload');
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCSVParsed = (headers: string[], data: CSVRow[]) => {
    setCsvHeaders(headers);
    setCsvData(data);
    setImportStep('mapping');

    // Auto-map obvious fields
    const autoMappings: FieldMapping[] = [];
    REQUIRED_FIELDS.forEach(field => {
      const matchingHeader = headers.find(header => 
        header.toLowerCase().includes(field.id.toLowerCase()) ||
        (field.id === 'name' && (header.toLowerCase().includes('first') || header.toLowerCase().includes('last'))) ||
        (field.id === 'phone' && header.toLowerCase().includes('phone'))
      );
      if (matchingHeader) {
        autoMappings.push({ csvField: matchingHeader, callynField: field.id });
      }
    });
    setFieldMappings(autoMappings);
  };

  const updateFieldMapping = (callynField: string, csvField: string) => {
    setFieldMappings(prev => {
      const existing = prev.findIndex(m => m.callynField === callynField);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { csvField, callynField };
        return updated;
      } else {
        return [...prev, { csvField, callynField }];
      }
    });
  };

  const processImport = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const errors: string[] = [];
    let successful = 0;
    
    csvData.forEach((row, index) => {
      const nameMapping = fieldMappings.find(m => m.callynField === 'name');
      const phoneMapping = fieldMappings.find(m => m.callynField === 'phone');
      
      if (!nameMapping || !row[nameMapping.csvField]) {
        errors.push(`Row ${index + 1}: Missing name`);
      } else if (!phoneMapping || !row[phoneMapping.csvField]) {
        errors.push(`Row ${index + 1}: Missing phone number`);
      } else {
        successful++;
      }
    });

    const result: ImportResult = {
      total: csvData.length,
      successful,
      failed: csvData.length - successful,
      errors
    };

    setImportResult(result);
    setImportStep('complete');
    setIsProcessing(false);

    // Update progress state when leads are successfully imported
    if (successful > 0) {
      updateProgressState({ hasLeads: true });
    }

    // Call the callback to notify parent component
    if (onLeadsImported && successful > 0) {
      onLeadsImported(successful);
    }

    toast({
      title: "Import Complete",
      description: `Successfully imported ${successful} of ${csvData.length} leads.`,
    });
  };

  const resetImport = () => {
    setCsvData([]);
    setCsvHeaders([]);
    setFieldMappings([]);
    setImportStep('upload');
    setImportResult(null);
  };

  const proceedToPreview = () => {
    setImportStep('preview');
  };

  const backToMapping = () => {
    setImportStep('mapping');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            CSV Lead Importer
          </CardTitle>
          <CardDescription>
            Import your leads from a CSV file to start calling immediately
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {importStep === 'upload' && (
            <UploadStep onCSVParsed={handleCSVParsed} />
          )}

          {importStep === 'mapping' && (
            <MappingStep
              csvHeaders={csvHeaders}
              csvDataLength={csvData.length}
              fieldMappings={fieldMappings}
              onMappingUpdate={updateFieldMapping}
              onProceed={proceedToPreview}
              onReset={resetImport}
            />
          )}

          {importStep === 'preview' && (
            <PreviewStep
              csvData={csvData}
              fieldMappings={fieldMappings}
              isProcessing={isProcessing}
              onBackToMapping={backToMapping}
              onProcessImport={processImport}
            />
          )}

          {importStep === 'complete' && importResult && (
            <CompleteStep
              importedCount={importResult.successful}
              onStartOver={resetImport}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CSVLeadImporter;
