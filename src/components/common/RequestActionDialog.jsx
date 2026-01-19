import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RequestActionDialog = ({
  isOpen, onClose, request, userRole, onAction
}) => {
  const [remarks, setRemarks] = useState('');
  const { toast } = useToast();

  if (!request) return null;

  const handleAction = (action) => {
    if (action === 'reject' && !remarks.trim()) {
      toast({
        title: "Remarks Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }
    onAction(request.id, action, remarks);
    setRemarks('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Review Request: {request.requestNumber}</DialogTitle>
          <DialogDescription>
            Requested by {request.requestedBy.name} for {request.department}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted p-3 rounded-lg text-sm space-y-2">
             <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <Badge variant="outline">{request.category}</Badge>
             </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Total Cost:</span>
                <span className="font-semibold">Rs. {request.totalEstimatedCost.toLocaleString()}</span>
             </div>
             <div>
                <span className="text-muted-foreground block mb-1">Justification:</span>
                <p className="italic">{request.justification}</p>
             </div>
          </div>

          <div className="space-y-2">
            <Label>
              {userRole === 'lab_incharge' ? 'Technical Remarks' : 'HOD Remarks'}
            </Label>
            <Textarea
              placeholder="Add your comments here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleAction('reject')}>
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button className="btn-primary-gradient" onClick={() => handleAction('approve')}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve & Forward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestActionDialog;