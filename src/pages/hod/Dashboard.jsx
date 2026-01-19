import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, CheckCircle2, TrendingUp, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockInventoryItems, mockRequests, mockActivities } from '@/lib/mockData';
import StatsCard from '@/components/common/StatsCard';
import ActivityFeed from '@/components/common/ActivityFeed';
import StatusBadge from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const HODDashboard = () => {
  const { user } = useAuth();
  const deptItems = mockInventoryItems.filter(i => i.department === user?.department);
  const pendingRequests = mockRequests.filter(r => r.status === 'pending' || r.status === 'approved_by_lab_incharge');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Welcome, {user?.name?.split(' ')[0]}</h1>
        <p className="text-muted-foreground">Department: {user?.department} - Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Department Items" value={deptItems.length} icon={Package} variant="primary" delay={0} />
        <StatsCard title="Pending Approvals" value={pendingRequests.length} icon={Clock} variant="warning" delay={0.1} />
        <StatsCard title="Approved This Month" value={12} icon={CheckCircle2} variant="success" delay={0.2} />
        <StatsCard title="Total Value" value="Rs. 4.2M" icon={TrendingUp} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Pending Approvals</CardTitle>
            <CardDescription>Requests awaiting your action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRequests.slice(0, 3).map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{req.requestNumber}</p>
                    <p className="text-sm text-muted-foreground">{req.items.length} items</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={req.status} />
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed activities={mockActivities} maxItems={5} />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default HODDashboard;