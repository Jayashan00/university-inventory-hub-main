import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockRequests } from '@/lib/mockData';
import { CapitalItemRequest } from '@/lib/types';
import StatusBadge from '@/components/common/StatusBadge';
import RequestActionDialog from '@/components/common/RequestActionDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const HODApprovals: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<CapitalItemRequest | null>(null);

  // Logic: HOD sees Furniture (from MA) and Equipment (from Lab In-charge)
  // Logic: Lab In-charge sees Equipment (from Lab TO)

  // Mock filter based on user role
  const pendingRequests = mockRequests.filter(req => {
     if (user?.role === 'hod') {
        return (req.status === 'pending' && req.category === 'furniture') ||
               (req.status === 'approved_by_lab_incharge' && req.category === 'lab_equipment');
     }
     if (user?.role === 'lab_incharge') {
        return req.status === 'pending' && req.category === 'lab_equipment';
     }
     return false;
  });

  const handleAction = (id: string, action: 'approve' | 'reject', remarks: string) => {
    // In a real app, API call here
    toast({
      title: action === 'approve' ? "Request Approved" : "Request Rejected",
      description: `Request ${id} has been processed successfully.`,
      className: action === 'approve' ? "bg-green-50" : "bg-red-50"
    });
    // Update local state would happen here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold">Pending Approvals</h1>

      <div className="grid gap-4">
        {pendingRequests.map(req => (
          <Card key={req.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="font-bold text-lg">{req.requestNumber}</h3>
                   <StatusBadge status={req.status} />
                </div>
                <p className="text-muted-foreground text-sm mb-1">
                   {req.items.length} Items • Total: Rs. {req.totalEstimatedCost.toLocaleString()}
                </p>
                <p className="text-xs bg-muted inline-block px-2 py-1 rounded">
                   Requester: {req.requestedBy.name}
                </p>
              </div>
              <Button onClick={() => setSelectedRequest(req)}>Review</Button>
            </CardContent>
          </Card>
        ))}

        {pendingRequests.length === 0 && (
           <div className="text-center py-10 text-muted-foreground">
              No pending requests for your approval.
           </div>
        )}
      </div>

      <RequestActionDialog
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        userRole={user?.role || 'hod'}
        onAction={handleAction}
      />
    </div>
  );
};
export default HODApprovals;