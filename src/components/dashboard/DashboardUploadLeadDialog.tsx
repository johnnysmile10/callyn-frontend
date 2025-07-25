import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CSVLeadImporter from "./shared/CSVLeadImporter";

interface DashboardUploadLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const DashboardUploadLeadDialog = ({
  isOpen,
  onClose,
}: DashboardUploadLeadDialogProps) => {
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your agent profile has been updated successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Upload Leads
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <CSVLeadImporter onLeadsImported={() => { }} />
        </div>

        {/* <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default DashboardUploadLeadDialog;
