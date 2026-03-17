// Mock data has been removed - all data is now fetched from MongoDB via the backend API
// These exports are kept as empty arrays to avoid import errors
// All components should be updated to fetch from backend API endpoints

export const mockUsers = [
	{
		id: 1,
		name: 'Inventory Officer',
		email: 'admin@eng.jfn.ac.lk',
		password: 'admin123',
		role: 'admin',
		department: 'ADMIN',
	},
	{
		id: 2,
		name: 'System Admin',
		email: 'sysadmin@eng.jfn.ac.lk',
		password: 'sysadmin123',
		role: 'system_admin',
		department: 'ADMIN',
	},
	{ id: 3, name: 'MA - Purchases', email: 'ma@eng.jfn.ac.lk', password: 'ma123', role: 'ma', department: 'ADMIN' },

	// HODs for 4 departments
	{
		id: 11,
		name: 'HOD - EEE',
		email: 'hod.eee@eng.jfn.ac.lk',
		password: 'hod123',
		role: 'hod',
		department: 'EEE',
	},
	{
		id: 12,
		name: 'HOD - CE',
		email: 'hod.ce@eng.jfn.ac.lk',
		password: 'hod123',
		role: 'hod',
		department: 'CE',
	},
	{
		id: 13,
		name: 'HOD - CVE',
		email: 'hod.cve@eng.jfn.ac.lk',
		password: 'hod123',
		role: 'hod',
		department: 'CVE',
	},
	{
		id: 14,
		name: 'HOD - ME',
		email: 'hod.me@eng.jfn.ac.lk',
		password: 'hod123',
		role: 'hod',
		department: 'ME',
	},

	// Lab In-Charges
	{
		id: 21,
		name: 'Lab In-Charge - EEE',
		email: 'labincharge.eee@eng.jfn.ac.lk',
		password: 'lab123',
		role: 'lab_incharge',
		department: 'EEE',
	},
	{
		id: 22,
		name: 'Lab In-Charge - CE',
		email: 'labincharge.ce@eng.jfn.ac.lk',
		password: 'lab123',
		role: 'lab_incharge',
		department: 'CE',
	},

	// Lab TOs (technical officers) for the 4 departments
	{
		id: 31,
		name: 'Lab TO - EEE',
		email: 'labto.eee@eng.jfn.ac.lk',
		password: 'to123',
		role: 'lab_to',
		department: 'EEE',
	},
	{
		id: 32,
		name: 'Lab TO - CE',
		email: 'labto.ce@eng.jfn.ac.lk',
		password: 'to123',
		role: 'lab_to',
		department: 'CE',
	},
	{
		id: 33,
		name: 'Lab TO - CVE',
		email: 'labto.cve@eng.jfn.ac.lk',
		password: 'to123',
		role: 'lab_to',
		department: 'CVE',
	},
	{
		id: 34,
		name: 'Lab TO - ME',
		email: 'labto.me@eng.jfn.ac.lk',
		password: 'to123',
		role: 'lab_to',
		department: 'ME',
	},
];

let _nextId = 1000;
const nextId = () => ++_nextId;

export const mockInventoryItems = [
	{
		id: nextId(),
		name: 'Digital Oscilloscope',
		category: 'lab_equipment',
		department: 'CE',
		quantity: 5,
		availableQuantity: 4,
		unitPrice: 25000,
		minStockLevel: 1,
		description: '100 MHz, 2-channel oscilloscope for lab measurements',
		location: 'CE Lab 1',
		supplier: 'Tek Supplies',
		status: 'available',
		condition: 'good',
		totalValue: 5 * 25000,
		serialNumber: 'OSC-CE-001',
	},
	{
		id: nextId(),
		name: '3D Printer',
		category: 'lab_equipment',
		department: 'ME',
		quantity: 2,
		availableQuantity: 1,
		unitPrice: 120000,
		minStockLevel: 1,
		description: 'FDM 3D Printer for prototyping',
		location: 'ME Lab 3',
		supplier: 'PrintCorp',
		status: 'maintenance',
		condition: 'needs_repair',
		totalValue: 2 * 120000,
		serialNumber: '3DP-ME-004',
	},
	{
		id: nextId(),
		name: 'Lab Workbench',
		category: 'furniture',
		department: 'EEE',
		quantity: 10,
		availableQuantity: 10,
		unitPrice: 8000,
		minStockLevel: 2,
		description: 'Sturdy bench for lab experiments',
		location: 'EEE Workshop',
		supplier: 'FurniCo',
		status: 'available',
		condition: 'good',
		totalValue: 10 * 8000,
	},
	{
		id: nextId(),
		name: 'Computer Workstation',
		category: 'furniture',
		department: 'CE',
		quantity: 20,
		availableQuantity: 18,
		unitPrice: 60000,
		minStockLevel: 5,
		description: 'Desktop workstation for student labs',
		location: 'CE Lab 2',
		supplier: 'CompWorld',
		status: 'available',
		condition: 'good',
		totalValue: 20 * 60000,
	},
];

export const mockCapitalRequests = [
	{
		id: nextId(),
		requestNumber: 'REQ-1001',
		category: 'lab_equipment',
		items: [
			{ id: 1, name: 'High Precision Multimeter', quantity: 2, estimatedUnitPrice: 7000, description: 'Bench multimeter' },
		],
		totalEstimatedCost: 14000,
		justification: 'Needed for calibration experiments',
		priority: 'medium',
		requestedBy: { name: 'Lab TO - CE', email: 'labto.ce@eng.jfn.ac.lk', department: 'CE', role: 'lab_to' },
		department: 'CE',
		status: 'pending',
		approvalChain: [
			{ role: 'lab_incharge', status: 'pending' },
			{ role: 'hod', status: 'pending' },
			{ role: 'admin', status: 'pending' },
		],
		remarks: [],
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
	},
];

export const mockRequests = mockCapitalRequests;

export const mockNotifications = [
	{ id: nextId(), userId: 31, title: 'Request Submitted', message: 'Your request REQ-1001 has been submitted to Lab In-Charge.', read: false, createdAt: new Date() },
];

export const mockActivities = [];
export const mockMaintenanceLogs = [];
export const mockItemIssues = [];
export const mockStockAlerts = [];

export default {
	mockUsers,
	mockInventoryItems,
	mockCapitalRequests,
	mockRequests,
	mockNotifications,
	mockActivities,
	mockMaintenanceLogs,
	mockItemIssues,
	mockStockAlerts,
};
