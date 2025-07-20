import { useState, MouseEvent } from "react";
import { toast } from "sonner";
import { Phone, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import ApiService from "@/context/services/apiService";
import { REQUIRED_FIELDS } from "../shared/csv-importer/constants";

const fieldMappings = ['name', 'email', 'number'];

const ContactRow = ({ contact, onDelete }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleContactDelete = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      setIsDeleting(true);
      const message = await ApiService.delete(`/contact/${contact.id}`);
      onDelete();
      toast.success(message);
    } catch (err) {
      toast.error(err.response.data);
    }
    setIsDeleting(false);
  }

  const handleContactCall = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      setIsCalling(true);
      const message = await ApiService.post(`/call/${contact.id}`, {});
      toast.success(message);
    } catch (err) {
      toast.error(err.response.data);
    }
    setIsCalling(false);
  }

  return <TableRow>
    {REQUIRED_FIELDS.filter(f =>
      fieldMappings.some(m => m === f.id)
    ).map(field => {
      const mapping = fieldMappings.find(m => m === field.id);
      return (
        <TableCell key={field.id}>
          {mapping ? contact[mapping] : ''}
        </TableCell>
      );
    })}
    <TableCell className="flex items-center gap-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleContactCall}
        disabled={isCalling}
      >
        <Phone className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleContactDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TableCell>
  </TableRow>
}

export default ContactRow;