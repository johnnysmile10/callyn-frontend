
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Tag } from "lucide-react";
import { CallRecord } from "./types";
import { formatDuration, formatCurrency, getOutcomeBadgeClass } from "./callLogUtils";

interface CallDetailsModalProps {
  call: CallRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const CallDetailsModal = ({ call, isOpen, onClose }: CallDetailsModalProps) => {
  if (!call) return null;

  const getOutcomeBadge = (outcome: string) => {
    return (
      <Badge className={getOutcomeBadgeClass(outcome)}>
        {outcome.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Call Details</DialogTitle>
          <DialogDescription>
            Complete information about this call
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Call Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {call.contactName}</div>
                  <div><strong>Phone:</strong> {call.contactPhone}</div>
                  <div><strong>Company:</strong> {call.contactCompany || 'N/A'}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Call Details</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Date:</strong> {new Date(call.timestamp).toLocaleString()}</div>
                  <div><strong>Duration:</strong> {formatDuration(call.duration)}</div>
                  <div><strong>Outcome:</strong> {getOutcomeBadge(call.outcome)}</div>
                  <div><strong>Campaign:</strong> {call.campaign || 'N/A'}</div>
                  <div><strong>Cost:</strong> {formatCurrency(call.cost)}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Transcript */}
            {call.transcript && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Call Transcript
                </h3>
                <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {call.transcript}
                </div>
              </div>
            )}

            {/* Notes */}
            {call.notes && (
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  {call.notes}
                </div>
              </div>
            )}

            {/* Tags */}
            {call.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {call.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up */}
            {call.followUpDate && (
              <div>
                <h3 className="font-semibold mb-2">Follow-up Scheduled</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(call.followUpDate).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailsModal;
