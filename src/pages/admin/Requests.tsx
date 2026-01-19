import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Package, Armchair, CheckCircle2, XCircle, Clock,
  MessageSquare, ChevronRight, Eye, Filter
} from 'lucide-react';
import { mockRequests } from '@/lib/mockData';
import { DEPARTMENTS } from '@/lib/constants';
import { CapitalItemRequest, RequestStatus } from '@/lib/types';
import DataTable from '@/components/common/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const AdminRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedRequest, setSelectedRequest] = useState<CapitalItemRequest | null>(null);
  const [remarks, setRemarks] = useState('');

  const filteredRequests = mockRequests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return request.status === 'pending' || request.status === 'approved_by_lab_incharge' || request.status === 'approved_by_hod';
    if (activeTab === 'approved') return request.status === 'approved' || request.status === 'completed';
    if (activeTab === 'rejected') return request.status === 'rejected';
    return true;
  });

  const pendingCount = mockRequests.filter(r => 
    r.status === 'pending' || r.status === 'approved_by_lab_incharge' || r.status === 'approved_by_hod'
  ).length;

  const columns = [
    {
      key: 'requestNumber',
      header: 'Request #',
      sortable: true,
      cell: (request: CapitalItemRequest) => (
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            request.category === 'lab_equipment' 
              ? "bg-primary/10 text-primary" 
              : "bg-accent/50 text-accent-foreground"
          )}>
            {request.category === 'lab_equipment' ? (
              <Package className="w-5 h-5" />
            ) : (
              <Armchair className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="font-medium">{request.requestNumber}</p>
            <p className="text-xs text-muted-foreground">
              {request.items.length} item(s)
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'requestedBy',
      header: 'Requested By',
      cell: (request: CapitalItemRequest) => (
        <div>
          <p className="font-medium">{request.requestedBy.name}</p>
          <p className="text-xs text-muted-foreground">{request.department}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      cell: (request: CapitalItemRequest) => (
        <Badge variant="outline">
          {request.category === 'lab_equipment' ? 'Lab Equipment' : 'Furniture'}
        </Badge>
      ),
    },
    {
      key: 'totalEstimatedCost',
      header: 'Estimated Cost',
      sortable: true,
      cell: (request: CapitalItemRequest) => (
        <span className="font-medium">Rs. {request.totalEstimatedCost.toLocaleString()}</span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      cell: (request: CapitalItemRequest) => {
        const priorityColors = {
          low: 'bg-slate-100 text-slate-700',
          medium: 'bg-blue-100 text-blue-700',
          high: 'bg-orange-100 text-orange-700',
          urgent: 'bg-red-100 text-red-700',
        };
        return (
          <Badge variant="outline" className={priorityColors[request.priority]}>
            {request.priority}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      cell: (request: CapitalItemRequest) => <StatusBadge status={request.status} />,
    },
    {
      key: 'createdAt',
      header: 'Date',
      sortable: true,
      cell: (request: CapitalItemRequest) => (
        <span className="text-sm text-muted-foreground">
          {format(request.createdAt, 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      cell: (request: CapitalItemRequest) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSelectedRequest(request)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">Capital Item Requests</h1>
        <p className="text-muted-foreground">
          Review and approve capital item requests from departments
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-card">
            All Requests
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-card">
            <Clock className="w-4 h-4 mr-2" />
            Pending ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-card">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-card">
            <XCircle className="w-4 h-4 mr-2" />
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredRequests}
                columns={columns}
                searchPlaceholder="Search requests..."
                emptyMessage="No requests found"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-serif text-xl">
                    {selectedRequest.requestNumber}
                  </DialogTitle>
                  <StatusBadge status={selectedRequest.status} />
                </div>
                <DialogDescription>
                  Submitted on {format(selectedRequest.createdAt, 'MMMM d, yyyy')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Request Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Requested By</p>
                    <p className="font-medium">{selectedRequest.requestedBy.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Department</p>
                    <Badge variant="outline">{selectedRequest.department}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Category</p>
                    <Badge variant="outline">
                      {selectedRequest.category === 'lab_equipment' ? 'Lab Equipment' : 'Furniture'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <Badge variant="outline" className="capitalize">{selectedRequest.priority}</Badge>
                  </div>
                </div>

                <Separator />

                {/* Items */}
                <div>
                  <h4 className="font-medium mb-3">Requested Items</h4>
                  <div className="space-y-3">
                    {selectedRequest.items.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Rs. {(item.quantity * item.estimatedUnitPrice).toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × Rs. {item.estimatedUnitPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <span className="font-semibold">Total Estimated Cost</span>
                      <span className="font-bold text-lg">
                        Rs. {selectedRequest.totalEstimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Justification */}
                <div>
                  <h4 className="font-medium mb-2">Justification</h4>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    {selectedRequest.justification}
                  </p>
                </div>

                {/* Approval Chain */}
                <div>
                  <h4 className="font-medium mb-3">Approval Chain</h4>
                  <div className="flex items-center gap-2">
                    {selectedRequest.approvalChain.map((step, index) => (
                      <React.Fragment key={index}>
                        <div className={cn(
                          "px-3 py-2 rounded-lg text-sm flex items-center gap-2",
                          step.status === 'approved' && "bg-success/10 text-success",
                          step.status === 'rejected' && "bg-destructive/10 text-destructive",
                          step.status === 'pending' && "bg-muted text-muted-foreground"
                        )}>
                          {step.status === 'approved' && <CheckCircle2 className="w-4 h-4" />}
                          {step.status === 'rejected' && <XCircle className="w-4 h-4" />}
                          {step.status === 'pending' && <Clock className="w-4 h-4" />}
                          {step.role.replace('_', ' ').toUpperCase()}
                        </div>
                        {index < selectedRequest.approvalChain.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Remarks */}
                {selectedRequest.remarks.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Remarks</h4>
                    <div className="space-y-3">
                      {selectedRequest.remarks.map((remark) => (
                        <div key={remark.id} className="p-3 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{remark.userName}</span>
                            <Badge variant="outline" className="text-xs">{remark.userRole}</Badge>
                          </div>
                          <p className="text-sm">{remark.remark}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(remark.createdAt, 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Remarks & Actions */}
                {selectedRequest.status !== 'approved' && selectedRequest.status !== 'rejected' && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="space-y-2">
                      <Label>Add Remarks</Label>
                      <Textarea
                        placeholder="Enter your remarks or comments..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  Close
                </Button>
                {selectedRequest.status !== 'approved' && selectedRequest.status !== 'rejected' && (
                  <>
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button className="btn-primary-gradient">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminRequests;
