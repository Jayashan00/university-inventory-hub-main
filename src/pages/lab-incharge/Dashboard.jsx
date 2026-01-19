import React from 'react';
import { motion } from 'framer-motion';
import { Package, Wrench, AlertTriangle, Clock } from 'lucide-react';
import { mockInventoryItems, mockActivities, mockMaintenanceLogs } from '@/lib/mockData';
import StatsCard from '@/components/common/StatsCard';
import ActivityFeed from '@/components/common/ActivityFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LabInchargeDashboard = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Lab In-Charge Dashboard</h1>
        <p className="text-muted-foreground">Manage lab equipment and approve requests</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Lab Equipment" value={mockInventoryItems.length} icon={Package} variant="primary" />
        <StatsCard title="Pending Requests" value={2} icon={Clock} variant="warning" />
        <StatsCard title="In Maintenance" value={mockMaintenanceLogs.length} icon={Wrench} variant="destructive" />
        <StatsCard title="Low Stock Alerts" value={3} icon={AlertTriangle} />
      </div>
      <Card>
        <CardHeader><CardTitle className="font-serif">Recent Activity</CardTitle></CardHeader>
        <CardContent><ActivityFeed activities={mockActivities} maxItems={5} /></CardContent>
      </Card>
    </motion.div>
  );
};

export default LabInchargeDashboard;