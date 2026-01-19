import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowRightLeft, Wrench, AlertTriangle, Plus } from 'lucide-react';
import { mockInventoryItems, mockMaintenanceLogs } from '@/lib/mockData';
import StatsCard from '@/components/common/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LabTODashboard: React.FC = () => {
  const navigate = useNavigate();
  // Filter items for current Lab TO (Mock logic assumes Lab TO belongs to CE Dept)
  const myLabItems = mockInventoryItems.filter(i => i.department === 'CE');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">Lab Operations</h1>
          <p className="text-muted-foreground">Computer Engineering Lab 01</p>
        </div>
        <Button className="btn-primary-gradient" onClick={() => navigate('/lab-to/create-request')}>
          <Plus className="w-4 h-4 mr-2" /> Request New Equipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Lab Equipment" value={myLabItems.length} icon={Package} variant="primary" />
        <StatsCard title="Currently Issued" value={12} icon={ArrowRightLeft} variant="warning" />
        <StatsCard title="Maintenance Needed" value={3} icon={Wrench} variant="destructive" />
        <StatsCard title="Low Stock Alerts" value={2} icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/lab-to/issue')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              Issue & Return
            </CardTitle>
            <CardDescription>Manage equipment lending to students/staff</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">Go to Issue Counter</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/lab-to/maintenance')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-destructive" />
              Maintenance Logs
            </CardTitle>
            <CardDescription>Report repairs and track service status</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">Log Maintenance</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
export default LabTODashboard;