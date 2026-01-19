// User Roles
export type UserRole = 'admin' | 'hod' | 'lab_incharge' | 'ma' | 'lab_to';

// Departments
export type DepartmentCode = 'EEE' | 'CE' | 'CVE' | 'IDS' | 'ME' | 'ADMIN';

export interface Department {
  id: string;
  code: DepartmentCode;
  name: string;
  fullName: string;
  description: string;
  hodName?: string;
  image?: string;
  totalEquipment: number;
  totalFurniture: number;
}

// Users
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: DepartmentCode;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// Inventory Item Types
export type ItemCategory = 'lab_equipment' | 'furniture';
export type ItemStatus = 'available' | 'in_use' | 'maintenance' | 'damaged' | 'disposed';
export type ItemCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  department: DepartmentCode;
  lab?: string;
  quantity: number;
  availableQuantity: number;
  unitPrice: number;
  totalValue: number;
  status: ItemStatus;
  condition: ItemCondition;
  location: string;
  supplier?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  minStockLevel: number;
  image?: string;
  serialNumber?: string;
  barcode?: string;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// Capital Item Requests
export type RequestStatus = 'pending' | 'approved_by_lab_incharge' | 'approved_by_hod' | 'approved' | 'rejected' | 'completed';
export type RequestPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CapitalItemRequest {
  id: string;
  requestNumber: string;
  requestedBy: User;
  department: DepartmentCode;
  category: ItemCategory;
  items: RequestItem[];
  justification: string;
  priority: RequestPriority;
  status: RequestStatus;
  totalEstimatedCost: number;
  remarks: RequestRemark[];
  approvalChain: ApprovalStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  estimatedUnitPrice: number;
  specifications?: string;
}

export interface RequestRemark {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  remark: string;
  createdAt: Date;
}

export interface ApprovalStep {
  role: UserRole;
  userId?: string;
  userName?: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  timestamp?: Date;
}

// Item Issue
export interface ItemIssue {
  id: string;
  item: InventoryItem;
  issuedTo: string;
  issuedBy: User;
  purpose: string;
  quantity: number;
  issueDate: Date;
  expectedReturnDate: Date;
  actualReturnDate?: Date;
  status: 'issued' | 'returned' | 'overdue' | 'lost';
  condition?: ItemCondition;
  remarks?: string;
}

// Maintenance Log
export type MaintenanceType = 'preventive' | 'corrective' | 'emergency';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface MaintenanceLog {
  id: string;
  item: InventoryItem;
  type: MaintenanceType;
  description: string;
  reportedBy: User;
  assignedTo?: string;
  status: MaintenanceStatus;
  scheduledDate: Date;
  completedDate?: Date;
  cost?: number;
  notes?: string;
  createdAt: Date;
}

// Purchase Record
export interface PurchaseRecord {
  id: string;
  request: CapitalItemRequest;
  purchaseOrderNumber: string;
  supplier: string;
  supplierContact?: string;
  items: PurchaseItem[];
  totalCost: number;
  purchaseDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  status: 'ordered' | 'shipped' | 'delivered' | 'received';
  invoiceNumber?: string;
  paymentStatus: 'pending' | 'partial' | 'completed';
  receivedBy?: User;
  remarks?: string;
}

export interface PurchaseItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
}

// Notifications
export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

// Stock Alert
export interface StockAlert {
  id: string;
  item: InventoryItem;
  alertType: 'low_stock' | 'out_of_stock' | 'expiring' | 'maintenance_due';
  message: string;
  isResolved: boolean;
  createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalItems: number;
  totalValue: number;
  pendingRequests: number;
  lowStockItems: number;
  itemsInMaintenance: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'issue' | 'return';
}

// Reports
export interface ReportFilters {
  startDate?: Date;
  endDate?: Date;
  department?: DepartmentCode;
  category?: ItemCategory;
  status?: string;
}

export interface InventoryReport {
  generatedAt: Date;
  generatedBy: User;
  filters: ReportFilters;
  summary: {
    totalItems: number;
    totalValue: number;
    byCategory: Record<ItemCategory, number>;
    byDepartment: Record<DepartmentCode, number>;
    byStatus: Record<ItemStatus, number>;
  };
  items: InventoryItem[];
}
