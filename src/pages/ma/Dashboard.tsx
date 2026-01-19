import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, PackagePlus, FileText, TrendingUp } from 'lucide-react';
import { mockRequests, mockActivities } from '@/lib/mockData';
import StatsCard from '@/components/common/StatsCard';
import ActivityFeed from '@/components/common/ActivityFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MADashboard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Management Assistant Dashboard</h1>
        <p className="text-muted-foreground">Handle purchases and stock management</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Approved Requests" value={5} icon={FileText} variant="success" />
        <StatsCard title="Pending Purchases" value={3} icon={ShoppingCart} variant="warning" />
        <StatsCard title="Items to Receive" value={8} icon={PackagePlus} variant="primary" />
        <StatsCard title="This Month Spend" value="Rs. 850K" icon={TrendingUp} />
      </div>
      <Card>
        <CardHeader><CardTitle className="font-serif">Recent Activity</CardTitle></CardHeader>
        <CardContent><ActivityFeed activities={mockActivities} maxItems={5} /></CardContent>
      </Card>
    </motion.div>
  );
};

export default MADashboard;
