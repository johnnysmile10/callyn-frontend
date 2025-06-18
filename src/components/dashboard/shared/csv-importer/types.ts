
export interface CSVRow {
  [key: string]: string;
}

export interface FieldMapping {
  csvField: string;
  callynField: string;
}

export interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
}

export interface CSVLeadImporterProps {
  onLeadsImported?: (count: number) => void;
}

export type ImportStep = 'upload' | 'mapping' | 'preview' | 'complete';

export interface RequiredField {
  id: string;
  label: string;
  required: boolean;
}
