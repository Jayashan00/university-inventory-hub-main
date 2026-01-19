import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockMaintenanceLogs, mockInventoryItems } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Maintenance: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [logs] = useState(mockMaintenanceLogs);

  const handleLogMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "Maintenance Logged",
      description: "The issue has been recorded and scheduled for review.",
      className: "bg-blue-50 border-blue-200"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">Maintenance Logs</h1>
          <p className="text-muted-foreground">Track equipment repairs and service history</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-destructive-gradient bg-destructive text-white hover:bg-destructive/90">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Maintenance Issue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogMaintenance} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Equipment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Search equipment..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInventoryItems.filter(i => i.department === 'EEE' || i.department === 'CE').map(item => (
                      <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Issue Type</Label>
                <Select defaultValue="corrective">
                  <SelectTrigger>
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrective">Breakdown / Repair</SelectItem>
                    <SelectItem value="preventive">Scheduled Service</SelectItem>
                    <SelectItem value="calibration">Calibration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description of Issue</Label>
                <Textarea placeholder="Describe the problem..." required />
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Submit Log</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {logs.map(log => (
           <Card key={log.id}>
             <CardHeader className="pb-2">
               <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{log.item.name}</CardTitle>
                    <CardDescription>Reported by {log.reportedBy.name}</CardDescription>
                  </div>
                  <Badge variant="outline" className={getStatusColor(log.status)}>
                    {log.status.replace('_', ' ').toUpperCase()}
                  </Badge>
               </div>
             </CardHeader>
             <CardContent>
                <p className="text-sm mb-4">{log.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Scheduled: {format(log.scheduledDate, 'MMM d, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3 h-3" /> Type: {log.type}
                  </span>
                </div>

                {log.status === 'in_progress' && (
                   <Button size="sm" variant="outline" className="mt-4 w-full sm:w-auto">
                     <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                     Mark as Completed
                   </Button>
                )}
             </CardContent>
           </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default Maintenance;