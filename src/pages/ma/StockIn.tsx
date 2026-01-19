import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PackagePlus, FileCheck, Search, Calendar, MapPin, Hash
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MAStockIn: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleStockUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inventory Updated",
        description: "Items have been successfully added to stock.",
        className: "bg-green-50 border-green-200"
      });
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Stock-In Entry</h1>
        <p className="text-muted-foreground">Record received items and update main inventory</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entry Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackagePlus className="w-5 h-5 text-primary" />
                Goods Received Note (GRN)
              </CardTitle>
              <CardDescription>Enter details from the supplier's delivery note</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStockUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      Purchase Order No
                    </Label>
                    <Input placeholder="e.g. PO-2025-001" required />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      Invoice / GRN Number
                    </Label>
                    <Input placeholder="Supplier Invoice No" required />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Date Received
                    </Label>
                    <Input type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Supplier Name</Label>
                    <Input placeholder="e.g. Abans, Singer, Softlogic" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Item Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label>Item Name / Description</Label>
                      <Input placeholder="e.g. Office Chair - Ergonomic Black" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity Received</Label>
                      <Input type="number" min="1" placeholder="0" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Unit Cost (Rs.)</Label>
                      <Input type="number" min="0" placeholder="0.00" />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        Storage Location
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main_store">Main Stores</SelectItem>
                          <SelectItem value="admin_block">Admin Block</SelectItem>
                          <SelectItem value="civil_dept">Civil Dept Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select defaultValue="furniture">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="lab_equipment">Lab Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                   <Button type="button" variant="outline">Reset</Button>
                   <Button type="submit" className="btn-primary-gradient w-40" disabled={isLoading}>
                     {isLoading ? "Processing..." : (
                       <>
                         <FileCheck className="w-4 h-4 mr-2" />
                         Update Inventory
                       </>
                     )}
                   </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Receipts Side Panel */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Receipts</CardTitle>
              <CardDescription>Last 5 items added to stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-700 font-bold text-xs">
                      IN
                    </div>
                    <div>
                      <p className="font-medium text-sm">Steel Cupboard (x2)</p>
                      <p className="text-xs text-muted-foreground">PO-2025-00{8-i}</p>
                      <p className="text-xs text-muted-foreground mt-1">Received today</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default MAStockIn;