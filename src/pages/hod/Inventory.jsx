import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Armchair,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';

import { mockInventoryItems } from '@/lib/mockData';
import { DEPARTMENTS } from '@/lib/constants';
import DataTable from '@/components/common/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { inventory as mockInventoryApi } from '@/lib/mockApi';

const AdminInventory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [items, setItems] = useState(mockInventoryItems);

  const initialFormData = {
    name: '',
    category: '',
    department: '',
    quantity: '',
    unitPrice: '',
    minStockLevel: '',
    description: '',
    location: '',
    supplier: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesDepartment =
      selectedDepartment === 'all' || item.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesCategory &&
      matchesDepartment &&
      matchesStatus &&
      matchesSearch
    );
  });

  const equipmentCount = items.filter(
    (i) => i.category === 'lab_equipment'
  ).length;
  const furnitureCount = items.filter((i) => i.category === 'furniture').length;

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || '',
      department: item.department || '',
      quantity: String(item.quantity ?? ''),
      unitPrice: String(item.unitPrice ?? ''),
      minStockLevel: String(item.minStockLevel ?? ''),
      description: item.description || '',
      location: item.location || '',
      supplier: item.supplier || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await mockInventoryApi.delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });

      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete item.',
        variant: 'destructive',
      });
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.department ||
      !formData.quantity
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const itemData = {
        name: formData.name,
        category: formData.category,
        department: formData.department,
        quantity: parseInt(formData.quantity, 10),
        availableQuantity: parseInt(formData.quantity, 10),
        unitPrice: parseInt(formData.unitPrice, 10) || 0,
        minStockLevel: parseInt(formData.minStockLevel, 10) || 5,
        description: formData.description,
        location: formData.location,
        supplier: formData.supplier,
        status: 'available',
        condition: 'good',
      };

      itemData.totalValue = (itemData.quantity || 0) * (itemData.unitPrice || 0);

      if (editingItem) {
        const updated = await mockInventoryApi.update(editingItem.id, itemData);
        updated.totalValue =
          updated.totalValue ??
          (updated.quantity || 0) * (updated.unitPrice || 0);

        setItems((prev) =>
          prev.map((i) => (i.id === updated.id ? updated : i))
        );

        toast({
          title: 'Success',
          description: 'Item updated successfully',
        });
      } else {
        const created = await mockInventoryApi.create(itemData);
        created.totalValue =
          created.totalValue ??
          (created.quantity || 0) * (created.unitPrice || 0);

        setItems((prev) => [created, ...prev]);

        toast({
          title: 'Success',
          description: 'Item added successfully to inventory',
        });
      }

      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save item. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Item Name',
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              item.category === 'lab_equipment'
                ? 'bg-primary/10 text-primary'
                : 'bg-accent/50 text-accent-foreground'
            )}
          >
            {item.category === 'lab_equipment' ? (
              <Package className="w-5 h-5" />
            ) : (
              <Armchair className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
              {item.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      cell: (item) => <Badge variant="outline">{item.department}</Badge>,
    },
    {
      key: 'quantity',
      header: 'Stock',
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'font-medium',
              item.availableQuantity <= item.minStockLevel && 'text-destructive'
            )}
          >
            {item.availableQuantity}/{item.quantity}
          </span>
          {item.availableQuantity <= item.minStockLevel && (
            <AlertTriangle className="w-4 h-4 text-warning" />
          )}
        </div>
      ),
    },
    {
      key: 'totalValue',
      header: 'Value',
      sortable: true,
      cell: (item) => (
        <span className="font-medium">
          Rs. {Number(item.totalValue || 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedItem(item)}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => openEditDialog(item)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Item
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage all laboratory equipment and furniture items
          </p>
        </div>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="btn-primary-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? 'Update the details of the selected item'
                  : 'Fill in the details to add a new item to the inventory'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddItem}>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter item name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab_equipment">Lab Equipment</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleSelectChange('department', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept.code} value={dept.code}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Unit Price (Rs.)</Label>
                  <Input
                    name="unitPrice"
                    type="number"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Minimum Stock Level</Label>
                  <Input
                    name="minStockLevel"
                    type="number"
                    value={formData.minStockLevel}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter item description"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Building, Room number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supplier</Label>
                  <Input
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    placeholder="Supplier name"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="btn-primary-gradient"
                  disabled={isLoading}
                >
                  {isLoading
                    ? editingItem
                      ? 'Saving...'
                      : 'Adding...'
                    : editingItem
                    ? 'Save Changes'
                    : 'Add Item'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-card">
              All Items ({items.length})
            </TabsTrigger>
            <TabsTrigger
              value="lab_equipment"
              className="data-[state=active]:bg-card"
            >
              <Package className="w-4 h-4 mr-2" />
              Equipment ({equipmentCount})
            </TabsTrigger>
            <TabsTrigger
              value="furniture"
              className="data-[state=active]:bg-card"
            >
              <Armchair className="w-4 h-4 mr-2" />
              Furniture ({furnitureCount})
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept.code} value={dept.code}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in_use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredItems}
                columns={columns}
                searchPlaceholder="Search items..."
                onSearch={setSearchQuery}
                onExport={() => console.log('Export')}
                emptyMessage="No inventory items found"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif">
                  {selectedItem.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge variant="outline">
                    {selectedItem.category === 'lab_equipment'
                      ? 'Lab Equipment'
                      : 'Furniture'}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <Badge variant="outline">{selectedItem.department}</Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Available / Total</p>
                  <p className="font-medium">
                    {selectedItem.availableQuantity} / {selectedItem.quantity}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="font-medium">
                    Rs. {Number(selectedItem.totalValue || 0).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedItem.status} />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <Badge variant="outline" className="capitalize">
                    {selectedItem.condition}
                  </Badge>
                </div>

                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedItem.location}</p>
                </div>

                {selectedItem.supplier && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Supplier</p>
                    <p className="font-medium">{selectedItem.supplier}</p>
                  </div>
                )}

                {selectedItem.serialNumber && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Serial Number</p>
                    <p className="font-medium">{selectedItem.serialNumber}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Close
                </Button>
                <Button
                  className="btn-primary-gradient"
                  onClick={() => {
                    setSelectedItem(null);
                    openEditDialog(selectedItem);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Item
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminInventory;