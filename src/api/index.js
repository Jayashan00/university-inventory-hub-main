import apiClient from './axiosConfig';

export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  validateToken: (token) =>
    apiClient.get('/auth/validate', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  refreshToken: (token) =>
    apiClient.post('/auth/refresh', {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const userAPI = {
  getAllUsers: () => apiClient.get('/users'),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  getUserByEmail: (email) => apiClient.get(`/users/email/${email}`),
  getUsersByRole: (role) => apiClient.get(`/users/role/${role}`),
  getUsersByDepartment: (department) => apiClient.get(`/users/department/${department}`),
  createUser: (userData) => apiClient.post('/users', userData),
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
};

export const inventoryAPI = {
  getAllItems: () => apiClient.get('/inventory'),
  getItemById: (id) => apiClient.get(`/inventory/${id}`),
  getItemsByDepartment: (department) => apiClient.get(`/inventory/department/${department}`),
  getItemsByCategory: (category) => apiClient.get(`/inventory/category/${category}`),
  getItemsByStatus: (status) => apiClient.get(`/inventory/status/${status}`),
  getItemsByLab: (lab) => apiClient.get(`/inventory/lab/${lab}`),
  createItem: (itemData) => apiClient.post('/inventory', itemData),
  updateItem: (id, itemData) => apiClient.put(`/inventory/${id}`, itemData),
  deleteItem: (id) => apiClient.delete(`/inventory/${id}`),
  getTotalValue: () => apiClient.get('/inventory/stats/total-value'),
  getTotalItems: () => apiClient.get('/inventory/stats/total-items'),
};

export const requestAPI = {
  getAllRequests: () => apiClient.get('/requests'),
  getRequestById: (id) => apiClient.get(`/requests/${id}`),
  getRequestByNumber: (number) => apiClient.get(`/requests/number/${number}`),
  getRequestsByStatus: (status) => apiClient.get(`/requests/status/${status}`),
  getRequestsByDepartment: (department) => apiClient.get(`/requests/department/${department}`),
  getRequestsByUserId: (userId) => apiClient.get(`/requests/user/${userId}`),
  createRequest: (requestData) => apiClient.post('/requests', requestData),
  approveRequest: (id, role, userId, userName) =>
    apiClient.put(`/requests/${id}/approve?role=${role}&userId=${userId}&userName=${userName}`),
  rejectRequest: (id, role, userId, userName, remarks) =>
    apiClient.put(`/requests/${id}/reject?role=${role}&userId=${userId}&userName=${userName}&remarks=${remarks}`),
  addRemark: (id, userId, userName, userRole, remark) =>
    apiClient.post(`/requests/${id}/remarks?userId=${userId}&userName=${userName}&userRole=${userRole}&remark=${remark}`),
};

export const notificationAPI = {
  getNotifications: (userId) => apiClient.get(`/notifications/user/${userId}`),
  getUnreadNotifications: (userId) => apiClient.get(`/notifications/user/${userId}/unread`),
  createNotification: (notificationData) => apiClient.post('/notifications', notificationData),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
  markAllAsRead: (userId) => apiClient.put(`/notifications/user/${userId}/read-all`),
  deleteNotification: (id) => apiClient.delete(`/notifications/${id}`),
};

export const itemIssueAPI = {
  getIssueById: (id) => apiClient.get(`/item-issues/${id}`),
  getIssuesByItemId: (itemId) => apiClient.get(`/item-issues/item/${itemId}`),
  getIssuedItems: () => apiClient.get('/item-issues/status/issued'),
  getReturnedItems: () => apiClient.get('/item-issues/status/returned'),
  issueItem: (issueData) => apiClient.post('/item-issues', issueData),
  returnItem: (id, condition, remarks) =>
    apiClient.put(`/item-issues/${id}/return?condition=${condition}&remarks=${remarks}`),
};

export const maintenanceAPI = {
  getMaintenanceLogById: (id) => apiClient.get(`/maintenance/${id}`),
  getMaintenanceLogsByItemId: (itemId) => apiClient.get(`/maintenance/item/${itemId}`),
  getMaintenanceLogsByStatus: (status) => apiClient.get(`/maintenance/status/${status}`),
  createMaintenanceLog: (logData) => apiClient.post('/maintenance', logData),
  updateMaintenanceLog: (id, logData) => apiClient.put(`/maintenance/${id}`, logData),
  getInProgressCount: () => apiClient.get('/maintenance/stats/in-progress-count'),
};

export const dashboardAPI = {
  getDashboardStats: () => apiClient.get('/dashboard/stats'),
  getDashboardStatsByDepartment: (department) => apiClient.get(`/dashboard/stats/department/${department}`),
};

