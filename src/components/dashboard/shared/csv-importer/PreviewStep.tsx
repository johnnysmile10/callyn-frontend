
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CSVRow, FieldMapping } from './types';
import { REQUIRED_FIELDS } from './constants';

interface PreviewStepProps {
  csvData: CSVRow[];
  fieldMappings: FieldMapping[];
  isProcessing: boolean;
  onBackToMapping: () => void;
  onProcessImport: () => void;
}

const PreviewStep = ({ 
  csvData, 
  fieldMappings, 
  isProcessing, 
  onBackToMapping, 
  onProcessImport 
}: PreviewStepProps) => {
  return (
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
        <Button variant="outline" onClick={onBackToMapping}>
          Back to Mapping
        </Button>
        <Button 
          onClick={onProcessImport} 
          disabled={isProcessing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? 'Processing...' : 'Import Leads'}
        </Button>
      </div>
    </div>
  );
};

export default PreviewStep;
