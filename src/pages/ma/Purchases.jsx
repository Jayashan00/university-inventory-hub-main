import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockRequests } from '@/lib/mockData';
import { ShoppingCart, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MAPurchases = () => {
  const navigate = useNavigate();

  // Filter approved furniture requests (Ready for Purchase)
  const approvedRequests = mockRequests.filter(
    r => r.category === 'furniture' && r.status === 'approved'
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">Procurement</h1>
          <p className="text-muted-foreground">Manage purchase orders for approved requests</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/ma/stock-in')}>
           Go to Stock-In
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Pending Purchase Orders
            </CardTitle>
            <CardDescription>
              These requests have been approved by the HOD and require a Purchase Order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvedRequests.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-xl text-muted-foreground">
                   No pending requests to purchase.
                </div>
              ) : (
                approvedRequests.map(req => (
                  <div
                    key={req.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <span className="font-bold text-lg">{req.requestNumber}</span>
                         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                           Approved
                         </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Requested by <span className="font-medium text-foreground">{req.requestedBy.name}</span> ({req.department})
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                         {req.items.map(i => (
                           <Badge key={i.id} variant="secondary">
                             {i.name} (Qty: {i.quantity})
                           </Badge>
                         ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:border-l md:pl-4">
                       <div className="text-right hidden md:block">
                          <p className="text-xs text-muted-foreground">Est. Value</p>
                          <p className="font-bold text-lg">Rs. {req.totalEstimatedCost.toLocaleString()}</p>
                       </div>
                       <Button className="btn-primary-gradient whitespace-nowrap">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate PO
                       </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Purchase History Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-sm text-muted-foreground">
                <div className="flex justify-between py-3 border-b">
                   <span>PO-2024-055 (Office Desks)</span>
                   <Badge variant="outline">Completed</Badge>
                </div>
                <div className="flex justify-between py-3 border-b">
                   <span>PO-2024-054 (Conference Chairs)</span>
                   <Badge variant="outline">Shipped</Badge>
                </div>
             </div>
             <Button variant="link" className="px-0 mt-2">View Full History</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default MAPurchases;