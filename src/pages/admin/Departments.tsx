import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS } from '@/lib/constants';
import DepartmentCard from '@/components/common/DepartmentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package, Armchair, TrendingUp, Building2 } from 'lucide-react';
import StatsCard from '@/components/common/StatsCard';

const AdminDepartments: React.FC = () => {
  const navigate = useNavigate();

  const totalEquipment = DEPARTMENTS.reduce((sum, d) => sum + d.totalEquipment, 0);
  const totalFurniture = DEPARTMENTS.reduce((sum, d) => sum + d.totalFurniture, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">Departments</h1>
        <p className="text-muted-foreground">
          View and manage inventory across all departments
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Departments"
          value={DEPARTMENTS.length}
          icon={Building2}
          variant="primary"
          delay={0}
        />
        <StatsCard
          title="Total Equipment"
          value={totalEquipment}
          icon={Package}
          variant="success"
          delay={0.1}
        />
        <StatsCard
          title="Total Furniture"
          value={totalFurniture}
          icon={Armchair}
          delay={0.2}
        />
        <StatsCard
          title="Total Items"
          value={totalEquipment + totalFurniture}
          icon={TrendingUp}
          variant="warning"
          delay={0.3}
        />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept, index) => (
          <DepartmentCard
            key={dept.id}
            department={dept}
            delay={index * 0.1}
            onClick={() => navigate(`/admin/inventory?department=${dept.code}`)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDepartments;
