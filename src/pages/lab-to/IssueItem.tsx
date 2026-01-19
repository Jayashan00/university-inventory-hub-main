import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInventoryItems } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft } from 'lucide-react';

const IssueItem: React.FC = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState('');
  const [studentId, setStudentId] = useState('');

  // Filter only available lab equipment
  const availableItems = mockInventoryItems.filter(
    i => i.category === 'lab_equipment' && i.status === 'available'
  );

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Issued Successfully",
      description: `Item issued to ${studentId}. Due back in 24 hours.`,
      className: "bg-green-50 border-green-200"
    });
    setStudentId('');
    setSelectedItem('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold">Issue Equipment</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" /> New Issue Record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleIssue} className="space-y-4">
            <div className="space-y-2">
              <Label>Select Equipment</Label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Search equipment..." />
                </SelectTrigger>
                <SelectContent>
                  {availableItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} (SN: {item.serialNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Student / Staff Reg No</Label>
              <Input
                placeholder="e.g. 2020/E/001"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Return Date</Label>
              <Input type="date" required />
            </div>

            <Button type="submit" className="w-full btn-primary-gradient">
              Issue Item
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default IssueItem;