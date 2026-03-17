import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';
import RequestActionDialog from '@/components/common/RequestActionDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { requests as mockRequestsApi } from '@/lib/mockApi';

const HODApprovals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const all = await mockRequestsApi.getAll();
      setRequests(Array.isArray(all) ? all : []);
    } catch (err) {
      console.error('Failed to load requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Logic: HOD sees Furniture (from MA) and Equipment (from Lab In-charge)
  // Lab in-charge sees Equipment (from Lab TO)
  const pendingRequests = requests.filter(req => {
    if (user?.role === 'hod') {
      // For HOD: furniture requests pending, or equipment approved by lab_incharge
      return (req.status === 'pending' && req.category === 'furniture') ||
             (req.status === 'approved_by_lab_incharge' && req.category === 'lab_equipment') ||
             (req.status === 'pending' && req.category === 'lab_equipment' && req.approvalChain?.[0]?.role === 'hod');
    }
    if (user?.role === 'lab_incharge') {
      return req.status === 'pending' && req.category === 'lab_equipment';
    }
    return false;
  });

  const handleAction = async (id, action, remarks) => {
    try {
      if (!user) throw new Error('Not authenticated');
      if (action === 'approve') {
        await mockRequestsApi.approve(id, user.role, { id: user.id, name: user.name });
        toast({ title: 'Request Approved', description: `Request ${id} approved by ${user.role}` });
      } else {
        await mockRequestsApi.reject(id, user.role, { id: user.id, name: user.name }, remarks);
        toast({ title: 'Request Rejected', description: `Request ${id} rejected by ${user.role}`, variant: 'destructive' });
      }
      // refresh
      await loadRequests();
    } catch (err) {
      console.error('Action failed', err);
      toast({ title: 'Error', description: err.message || 'Failed to process request', variant: 'destructive' });
    }
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
                   Requester: {req.requestedBy?.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => setSelectedRequest(req)}>Review</Button>
              </div>
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