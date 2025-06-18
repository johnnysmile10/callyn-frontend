
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CSVRow } from './types';
import { REQUIRED_FIELDS } from './constants';

interface UploadStepProps {
  onCSVParsed: (headers: string[], data: CSVRow[]) => void;
}

const UploadStep = ({ onCSVParsed }: UploadStepProps) => {
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

    onCSVParsed(headers, rows);

    toast({
      title: "CSV Uploaded Successfully",
      description: `Found ${rows.length} records with ${headers.length} fields.`,
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

  return (
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
  );
};

export default UploadStep;
