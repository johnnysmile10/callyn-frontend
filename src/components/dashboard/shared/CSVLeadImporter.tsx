
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CSVRow {
  [key: string]: string;
}

interface FieldMapping {
  csvField: string;
  callynField: string;
}

interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
}

const REQUIRED_FIELDS = [
  { id: "name", label: "Contact Name", required: true },
  { id: "phone", label: "Phone Number", required: true },
  { id: "email", label: "Email Address", required: false },
  { id: "company", label: "Company", required: false },
  { id: "title", label: "Job Title", required: false },
  { id: "industry", label: "Industry", required: false },
  { id: "notes", label: "Notes", required: false },
];

const CSVLeadImporter = () => {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [importStep, setImportStep] = useState<'upload' | 'mapping' | 'preview' | 'complete'>('upload');
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      toast({
        title: "Invalid CSV",
        description: "CSV file must have at least a header row and one data row.",
        variant: "destructive",
      });
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: CSVRow = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }

    setCsvHeaders(headers);
    setCsvData(rows);
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

    toast({
      title: "CSV Uploaded Successfully",
      description: `Found ${rows.length} records with ${headers.length} fields.`,
    });
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

  const validateMappings = (): boolean => {
    const requiredFields = REQUIRED_FIELDS.filter(f => f.required);
    const mappedRequired = requiredFields.filter(field => 
      fieldMappings.some(mapping => mapping.callynField === field.id)
    );
    
    if (mappedRequired.length !== requiredFields.length) {
      toast({
        title: "Missing Required Fields",
        description: "Please map all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const proceedToPreview = () => {
    if (validateMappings()) {
      setImportStep('preview');
    }
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

    toast({
      title: "Import Complete",
      description: `Successfully imported ${successful} of ${csvData.length} leads.`,
    });
  };

  const downloadTemplate = () => {
    const headers = REQUIRED_FIELDS.map(f => f.label).join(',');
    const sampleData = [
      'John Doe,(555) 123-4567,john@example.com,Acme Corp,Sales Manager,Technology,Interested in solar solutions',
      'Jane Smith,(555) 987-6543,jane@sample.com,Sample LLC,CEO,Healthcare,Follow up next week'
    ].join('\n');
    
    const csvContent = headers + '\n' + sampleData;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'callyn_lead_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetImport = () => {
    setCsvData([]);
    setCsvHeaders([]);
    setFieldMappings([]);
    setImportStep('upload');
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
            <div className="space-y-4">
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Upload your CSV file</p>
                  <p className="text-sm text-gray-600">
                    Select a CSV file containing your lead information
                  </p>
                </div>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Choose CSV File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Need a template?</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadTemplate}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>
          )}

          {importStep === 'mapping' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Map Your Fields</h3>
                <Badge variant="outline">{csvData.length} records found</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REQUIRED_FIELDS.map(field => (
                  <div key={field.id} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      {field.label}
                      {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                    </Label>
                    <Select 
                      value={fieldMappings.find(m => m.callynField === field.id)?.csvField || ''}
                      onValueChange={(value) => value && updateFieldMapping(field.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select CSV column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">-- No mapping --</SelectItem>
                        {csvHeaders.map(header => (
                          <SelectItem key={header} value={header}>{header}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={resetImport}>
                  Start Over
                </Button>
                <Button onClick={proceedToPreview} className="bg-blue-600 hover:bg-blue-700">
                  Preview Import
                </Button>
              </div>
            </div>
          )}

          {importStep === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preview Import</h3>
                <Badge variant="outline">{csvData.length} records to import</Badge>
              </div>

              <div className="max-h-96 overflow-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {REQUIRED_FIELDS.filter(f => 
                        fieldMappings.some(m => m.callynField === f.id)
                      ).map(field => (
                        <TableHead key={field.id}>{field.label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.slice(0, 5).map((row, index) => (
                      <TableRow key={index}>
                        {REQUIRED_FIELDS.filter(f => 
                          fieldMappings.some(m => m.callynField === f.id)
                        ).map(field => {
                          const mapping = fieldMappings.find(m => m.callynField === field.id);
                          return (
                            <TableCell key={field.id}>
                              {mapping ? row[mapping.csvField] : ''}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {csvData.length > 5 && (
                <p className="text-sm text-gray-600 text-center">
                  Showing first 5 rows of {csvData.length} total records
                </p>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setImportStep('mapping')}>
                  Back to Mapping
                </Button>
                <Button 
                  onClick={processImport} 
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? 'Processing...' : 'Import Leads'}
                </Button>
              </div>
            </div>
          )}

          {importStep === 'complete' && importResult && (
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

              <Button onClick={resetImport} className="w-full">
                Import Another File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CSVLeadImporter;
