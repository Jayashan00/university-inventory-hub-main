import { Department, UserRole, DepartmentCode } from './types';

// Import local images directly to ensure Vite handles paths correctly
import imgEEE from '@/assets/images/dept_eee.jpg';
import imgCE from '@/assets/images/dept_ce.jpg';
import imgCVE from '@/assets/images/dept_cve.jpg';
import imgIDS from '@/assets/images/dept_ids.jpg';
import imgME from '@/assets/images/dept_me.jpg';
import imgAdmin from '@/assets/images/admin_block.jpg';

// Updated Departments List using local images
export const DEPARTMENTS: Department[] = [
  {
    id: '1',
    code: 'EEE',
    name: 'Electrical & Electronics',
    fullName: 'Electrical and Electronics Engineering',
    description: 'Power systems, electronics, and communication technologies.',
    totalEquipment: 245,
    totalFurniture: 120,
    image: imgEEE
  },
  {
    id: '2',
    code: 'CE',
    name: 'Computer Engineering',
    fullName: 'Computer Engineering',
    description: 'Software development, networks, and computing systems.',
    totalEquipment: 312,
    totalFurniture: 95,
    image: imgCE
  },
  {
    id: '3',
    code: 'CVE',
    name: 'Civil Engineering',
    fullName: 'Civil Engineering',
    description: 'Structural, environmental, and construction engineering.',
    totalEquipment: 198,
    totalFurniture: 110,
    image: imgCVE
  },
  {
    id: '4',
    code: 'IDS',
    name: 'Interdisciplinary',
    fullName: 'Interdisciplinary Studies',
    description: 'Mathematics, management, and integrated engineering solutions.',
    totalEquipment: 85,
    totalFurniture: 65,
    image: imgIDS
  },
  {
    id: '5',
    code: 'ME',
    name: 'Mechanical Engineering',
    fullName: 'Mechanical Engineering',
    description: 'Thermodynamics, machine design, and manufacturing.',
    totalEquipment: 276,
    totalFurniture: 105,
    image: imgME
  },
  {
    id: '6',
    code: 'ADMIN',
    name: 'Administration',
    fullName: 'Administration',
    description: 'Faculty administration and resource management.',
    totalEquipment: 45,
    totalFurniture: 180,
    image: imgAdmin
  },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Inventory Management Officer',
  hod: 'Head of Department',
  lab_incharge: 'Lab In-Charge',
  ma: 'Management Assistant',
  lab_to: 'Technical Officer',
};

// Colors for Department Cards
export const DEPARTMENT_COLORS: Record<DepartmentCode, string> = {
  EEE: 'bg-blue-600',
  CE: 'bg-purple-600',
  CVE: 'bg-orange-600',
  IDS: 'bg-teal-600',
  ME: 'bg-red-600',
  ADMIN: 'bg-slate-600',
};

// Status Badge Colors
export const STATUS_COLORS = {
  available: 'badge-success',
  in_use: 'badge-info',
  maintenance: 'badge-warning',
  damaged: 'badge-destructive',
  disposed: 'bg-muted text-muted-foreground',
  pending: 'badge-warning',
  approved: 'badge-success',
  rejected: 'badge-destructive',
  completed: 'badge-info',
};

// Navigation Items
export const NAV_ITEMS = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'Package' },
    { label: 'Departments', path: '/admin/departments', icon: 'Building2' },
    { label: 'Users', path: '/admin/users', icon: 'Users' },
    { label: 'Requests', path: '/admin/requests', icon: 'FileText' },
    { label: 'Notifications', path: '/admin/notifications', icon: 'Bell' },
    { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
  ],
  hod: [
    { label: 'Dashboard', path: '/hod/dashboard', icon: 'LayoutDashboard' },
    { label: 'Department Inventory', path: '/hod/inventory', icon: 'Package' },
    { label: 'Approvals', path: '/hod/requests', icon: 'FileText' },
  ],
  lab_incharge: [
    { label: 'Dashboard', path: '/lab-incharge/dashboard', icon: 'LayoutDashboard' },
    { label: 'Lab Inventory', path: '/lab-incharge/inventory', icon: 'Package' },
    { label: 'Approvals', path: '/lab-incharge/requests', icon: 'FileText' },
  ],
  ma: [
    { label: 'Dashboard', path: '/ma/dashboard', icon: 'LayoutDashboard' },
    { label: 'Purchases', path: '/ma/purchases', icon: 'ShoppingCart' },
    { label: 'Stock-In', path: '/ma/stock-in', icon: 'PackagePlus' },
  ],
  lab_to: [
    { label: 'Dashboard', path: '/lab-to/dashboard', icon: 'LayoutDashboard' },
    { label: 'Issue Items', path: '/lab-to/issue', icon: 'ArrowRightLeft' },
    { label: 'Lab Inventory', path: '/lab-to/inventory', icon: 'Package' },
    { label: 'Create Request', path: '/lab-to/create-request', icon: 'Plus' },
  ],
};