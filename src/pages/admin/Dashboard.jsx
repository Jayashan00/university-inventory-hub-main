import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Armchair, FileText, AlertTriangle, TrendingUp,
  Building2, CheckCircle2, XCircle, BarChart3, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DEPARTMENTS } from '@/lib/constants';
import { mockRequests, mockActivities, mockStockAlerts } from '@/lib/mockData';
import { inventory as mockInventoryApi } from '@/lib/mockApi';
import StatsCard from '@/components/common/StatsCard';
import ActivityFeed from '@/components/common/ActivityFeed';
import DepartmentCard from '@/components/common/DepartmentCard';
import StatusBadge from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await mockInventoryApi.getAll();
        if (mounted) setItems(Array.isArray(all) ? all : []);
      } catch (err) {
        console.error('Failed to load inventory', err);
      }
    })();
    return () => { mounted = false };
  }, []);

  const totalEquipment = items.filter(i => i.category === 'lab_equipment').length;
  const totalFurniture = items.filter(i => i.category === 'furniture').length;
  const totalValue = items.reduce((sum, i) => sum + (i.totalValue || 0), 0);
  const pendingRequests = mockRequests.filter(r => r.status === 'pending').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your inventory management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/reports')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button className="btn-primary-gradient" onClick={() => navigate('/admin/inventory')}>
            <Package className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Lab Equipment"
          value={totalEquipment}
          subtitle="Total items"
          icon={Package}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatsCard
          title="Furniture Items"
          value={totalFurniture}
          subtitle="Total items"
          icon={Armchair}
          variant="success"
          trend={{ value: 5, isPositive: true }}
          delay={0.1}
        />
        <StatsCard
          title="Pending Requests"
          value={pendingRequests}
          subtitle="Awaiting approval"
          icon={FileText}
          variant="warning"
          delay={0.2}
        />
        <StatsCard
          title="Total Asset Value"
          value={`Rs. ${(totalValue / 1000000).toFixed(1)}M`}
          subtitle="Across all departments"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="font-serif">Pending Approvals</CardTitle>
              <CardDescription>Capital item requests awaiting your action</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/requests')}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRequests.slice(0, 3).map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      request.category === 'lab_equipment'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/50 text-accent-foreground'
                    }`}>
                      {request.category === 'lab_equipment' ? (
                        <Package className="w-5 h-5" />
                      ) : (
                        <Armchair className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{request.requestNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.items.length} items • Rs. {request.totalEstimatedCost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={request.status} />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-success hover:bg-success/10">
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-serif">Recent Activity</CardTitle>
            <CardDescription>Latest system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed activities={mockActivities} maxItems={5} />
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-serif flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Stock Alerts
            </CardTitle>
            <CardDescription>Items below minimum threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStockAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-warning/5 border border-warning/20"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{alert.item.name}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Inventory Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif">Department Overview</CardTitle>
            <CardDescription>Inventory distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DEPARTMENTS.slice(0, 4).map((dept, index) => {
                const total = dept.totalEquipment + dept.totalFurniture;
                const maxTotal = Math.max(...DEPARTMENTS.map(d => d.totalEquipment + d.totalFurniture));
                const percentage = (total / maxTotal) * 100;

                return (
                  <motion.div
                    key={dept.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{dept.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{total} items</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-semibold">Departments</h2>
          <Button variant="ghost" onClick={() => navigate('/admin/departments')}>
            View All Departments
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.slice(0, 3).map((dept, index) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              delay={index * 0.1}
              onClick={() => navigate(`/admin/departments/${dept.code}`)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

