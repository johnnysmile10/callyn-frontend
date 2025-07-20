
import { RequiredField } from './types';

export const REQUIRED_FIELDS: RequiredField[] = [
  { id: "name", label: "Contact Name", required: true },
  { id: "number", label: "Phone Number", required: true },
  { id: "email", label: "Email Address", required: false },
  { id: "company", label: "Company", required: false },
  { id: "title", label: "Job Title", required: false },
  { id: "industry", label: "Industry", required: false },
  { id: "notes", label: "Notes", required: false },
];
