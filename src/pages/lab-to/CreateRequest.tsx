import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FilePlus, Package, DollarSign, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const CreateRequest: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Request Submitted",
        description: "Your capital item request has been sent to the Lab In-Charge for approval.",
        className: "bg-green-50 border-green-200"
      });
      navigate('/lab-to/dashboard');
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">New Equipment Request</h1>
        <p className="text-muted-foreground">Submit a requisition for new lab equipment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-primary" />
            Request Details
          </CardTitle>
          <CardDescription>
            This request will be forwarded to the Lab In-Charge, then HOD, and finally Administration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Item Name</Label>
                <Input placeholder="e.g. Digital Oscilloscope" required />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="lab_equipment" disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab_equipment">Lab Equipment</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Lab TOs can only request equipment.</p>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" min="1" placeholder="1" required />
              </div>

              <div className="space-y-2">
                <Label>Estimated Unit Price (Rs.)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="number" className="pl-9" placeholder="0.00" required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Justification</Label>
              <Textarea
                placeholder="Why is this equipment needed? (e.g. For new curriculum, replacing broken unit)"
                required
                className="h-24"
              />
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Future Requirement</SelectItem>
                  <SelectItem value="medium">Medium - Needed for next semester</SelectItem>
                  <SelectItem value="high">High - Urgent Requirement</SelectItem>
                  <SelectItem value="urgent">Urgent - Lab Halted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
               <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
               <div className="text-sm text-yellow-800">
                 <strong>Note:</strong> Requests over Rs. 500,000 require additional approval from the Faculty Board.
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/lab-to/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary-gradient w-40" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateRequest;