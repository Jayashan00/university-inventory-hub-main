// filepath: d:\university-inventory-hub-main\src\lib\mockApi.js
// Frontend-only mock API to simulate backend behavior for the demo app

import {
  mockUsers,
  mockInventoryItems,
  mockCapitalRequests,
  mockRequests,
  mockNotifications,
} from './mockData';

let _idCounter = Date.now();
const nextId = () => ++_idCounter;

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const auth = {
  // simple email/password check
  login: async (email, password) => {
    await delay(200);
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return { token: `mock-token-${user.id}-${Date.now()}`, user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department } };
  },
};

export const inventory = {
  getAll: async () => {
    await delay();
    return mockInventoryItems;
  },

  create: async (itemData) => {
    await delay();
    const id = nextId();
    const item = {
      id,
      ...itemData,
      availableQuantity: itemData.availableQuantity ?? itemData.quantity ?? 0,
      totalValue: (itemData.quantity || 0) * (itemData.unitPrice || 0),
    };
    mockInventoryItems.unshift(item);
    return item;
  },

  update: async (id, patch) => {
    await delay();
    const idx = mockInventoryItems.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Item not found');
    mockInventoryItems[idx] = { ...mockInventoryItems[idx], ...patch };
    return mockInventoryItems[idx];
  },

  delete: async (id) => {
    await delay();
    const idx = mockInventoryItems.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Item not found');
    const [removed] = mockInventoryItems.splice(idx, 1);
    return removed;
  },
};

export const requests = {
  getAll: async () => {
    await delay();
    return mockRequests;
  },

  createCapitalRequest: async (requestData) => {
    await delay();
    const id = nextId();
    const requestNumber = requestData.requestNumber || `REQ-${Date.now()}`;
    const approvalChain = (requestData.category === 'furniture')
      ? [
          { role: 'hod', status: 'pending' },
          { role: 'ma', status: 'pending' },
          { role: 'admin', status: 'pending' },
        ]
      : [
          { role: 'lab_incharge', status: 'pending' },
          { role: 'hod', status: 'pending' },
          { role: 'admin', status: 'pending' },
        ];

    const newReq = {
      id,
      ...requestData,
      requestNumber,
      status: 'pending',
      approvalChain,
      remarks: requestData.remarks || [],
      createdAt: requestData.createdAt || new Date(),
    };

    mockCapitalRequests.unshift(newReq);
    // Keep alias
    mockRequests.unshift(newReq);

    // Add a notification for the next approver (lab_incharge or hod)
    const nextRole = approvalChain[0]?.role;
    const approvers = mockUsers.filter(u => u.role === nextRole);
    if (approvers.length) {
      mockNotifications.unshift({
        id: nextId(),
        userId: approvers[0].id,
        title: 'New Approval Request',
        message: `New request ${requestNumber} awaiting your approval`,
        read: false,
        createdAt: new Date(),
      });
    }

    return newReq;
  },

  approve: async (requestId, role, approverUser) => {
    await delay();
    const idx = mockRequests.findIndex(r => r.id === requestId);
    if (idx === -1) throw new Error('Request not found');
    const req = mockRequests[idx];
    // find step
    const stepIdx = req.approvalChain.findIndex(s => s.role === role);
    if (stepIdx === -1) throw new Error('Approval step not found');
    req.approvalChain[stepIdx].status = 'approved';
    // If last approval, mark as approved
    const pending = req.approvalChain.find(s => s.status === 'pending');
    if (!pending) {
      req.status = 'approved';
    } else {
      req.status = `approved_by_${role}`;
    }
    // push notification to requester
    mockNotifications.unshift({ id: nextId(), userId: req.requestedBy?.id || null, title: 'Request Update', message: `${req.requestNumber} approved by ${role}`, read: false, createdAt: new Date() });
    return req;
  },

  reject: async (requestId, role, approverUser, remarks) => {
    await delay();
    const idx = mockRequests.findIndex(r => r.id === requestId);
    if (idx === -1) throw new Error('Request not found');
    const req = mockRequests[idx];
    const stepIdx = req.approvalChain.findIndex(s => s.role === role);
    if (stepIdx === -1) throw new Error('Approval step not found');
    req.approvalChain[stepIdx].status = 'rejected';
    req.status = 'rejected';
    req.remarks.push({ id: nextId(), userName: approverUser?.name || 'Approver', userRole: role, remark: remarks || 'Rejected', createdAt: new Date() });
    mockNotifications.unshift({ id: nextId(), userId: req.requestedBy?.id || null, title: 'Request Rejected', message: `${req.requestNumber} was rejected by ${role}`, read: false, createdAt: new Date() });
    return req;
  },

  addRemark: async (requestId, user, remark) => {
    await delay();
    const idx = mockRequests.findIndex(r => r.id === requestId);
    if (idx === -1) throw new Error('Request not found');
    const req = mockRequests[idx];
    const r = { id: nextId(), userName: user.name, userRole: user.role, remark, createdAt: new Date() };
    req.remarks.push(r);
    return r;
  }
};

export const notifications = {
  listForUser: async (userId) => {
    await delay();
    return mockNotifications.filter(n => n.userId === userId);
  },
  markRead: async (id) => {
    await delay();
    const idx = mockNotifications.findIndex(n => n.id === id);
    if (idx === -1) throw new Error('Notification not found');
    mockNotifications[idx].read = true;
    return mockNotifications[idx];
  }
};

export default {
  auth,
  inventory,
  requests,
  notifications,
};

