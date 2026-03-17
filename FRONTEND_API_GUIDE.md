// Refresh token
const newToken = await authAPI.refreshToken(token);
```

### Inventory Management
```javascript
import { inventoryAPI } from '@/api';

// Get all items
const items = await inventoryAPI.getAllItems();

// Get items by department
const deptItems = await inventoryAPI.getItemsByDepartment('EEE');

// Create new item
const newItem = await inventoryAPI.createItem({
  name: 'Oscilloscope',
  category: 'lab_equipment',
  department: 'EEE',
  quantity: 10,
  unitPrice: 85000,
  minStockLevel: 5
});

// Update item
const updated = await inventoryAPI.updateItem(itemId, {
  quantity: 12,
  status: 'available'
});

// Delete item
await inventoryAPI.deleteItem(itemId);
```

### Capital Requests
```javascript
import { requestAPI } from '@/api';

// Get all requests
const requests = await requestAPI.getAllRequests();

// Create request
const newRequest = await requestAPI.createRequest({
  requestedById: userId,
  requestedByName: userName,
  department: 'CE',
  category: 'lab_equipment',
  items: [
    {
      name: 'Network Switch',
      quantity: 3,
      estimatedUnitPrice: 450000
    }
  ],
  justification: 'Upgrade network infrastructure',
  priority: 'high',
  totalEstimatedCost: 1350000
});

// Approve request
const approved = await requestAPI.approveRequest(
  requestId,
  'hod',
  userId,
  userName
);

// Reject request
const rejected = await requestAPI.rejectRequest(
  requestId,
  'admin',
  userId,
  userName,
  'Insufficient budget'
);

// Add remark
const updated = await requestAPI.addRemark(
  requestId,
  userId,
  userName,
  'hod',
  'Please provide more details'
);
```

### Item Issues
```javascript
import { itemIssueAPI } from '@/api';

// Issue item
const issue = await itemIssueAPI.issueItem({
  itemId: 'item123',
  itemName: 'Oscilloscope',
  issuedTo: 'Student Name',
  issuedById: userId,
  issuedByName: userName,
  purpose: 'Final Year Project',
  quantity: 2,
  expectedReturnDate: new Date('2024-03-15')
});

// Return item
const returned = await itemIssueAPI.returnItem(
  issueId,
  'good',
  'Item returned in good condition'
);

// Get issued items
const issued = await itemIssueAPI.getIssuedItems();

// Get returned items
const returned = await itemIssueAPI.getReturnedItems();
```

### Maintenance
```javascript
import { maintenanceAPI } from '@/api';

// Create maintenance log
const log = await maintenanceAPI.createMaintenanceLog({
  itemId: 'item123',
  itemName: 'CNC Machine',
  type: 'preventive',
  description: 'Annual calibration',
  reportedById: userId,
  reportedByName: userName,
  assignedTo: 'Service Provider',
  scheduledDate: new Date('2024-02-15')
});

// Update maintenance log
const updated = await maintenanceAPI.updateMaintenanceLog(logId, {
  status: 'completed',
  notes: 'Calibration completed successfully',
  cost: 150000
});

// Get maintenance logs for item
const logs = await maintenanceAPI.getMaintenanceLogsByItemId(itemId);
```

### Notifications
```javascript
import { notificationAPI } from '@/api';

// Get user notifications
const notifications = await notificationAPI.getNotifications(userId);

// Get unread notifications
const unread = await notificationAPI.getUnreadNotifications(userId);

// Create notification
const newNotif = await notificationAPI.createNotification({
  userId: userId,
  title: 'Low Stock Alert',
  message: 'Oscilloscope stock below minimum',
  type: 'warning',
  link: '/admin/inventory'
});

// Mark as read
await notificationAPI.markAsRead(notificationId);

// Mark all as read
await notificationAPI.markAllAsRead(userId);
```

### Dashboard
```javascript
import { dashboardAPI } from '@/api';

// Get overall stats
const stats = await dashboardAPI.getDashboardStats();
// Returns: { totalItems, totalValue, pendingRequests, lowStockItems, itemsInMaintenance, recentActivities }

// Get department stats
const deptStats = await dashboardAPI.getDashboardStatsByDepartment('EEE');
```

## Error Handling

```javascript
import { inventoryAPI } from '@/api';

try {
  const items = await inventoryAPI.getAllItems();
  // Process items
} catch (error) {
  if (error.response?.status === 401) {
    // Handle unauthorized - token expired
    // User will be redirected to login
  } else if (error.response?.status === 403) {
    // Handle forbidden - no permission
    console.error('Access denied');
  } else if (error.response?.status === 400) {
    // Handle bad request
    console.error('Invalid request:', error.response.data);
  } else {
    // Handle other errors
    console.error('Request failed:', error.message);
  }
}
```

## JWT Token Management

The Axios interceptor automatically:
1. Adds JWT token to every request header
2. Extracts token from localStorage
3. Validates token on response
4. Redirects to login if token is invalid (401)

### Token Storage
```javascript
// After login
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));

// On logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## Using in React Components

### With Hooks
```javascript
import { useEffect, useState } from 'react';
import { inventoryAPI } from '@/api';

export function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await inventoryAPI.getAllItems();
        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### With React Query (TanStack Query)
```javascript
import { useQuery, useMutation } from '@tanstack/react-query';
import { inventoryAPI } from '@/api';

export function InventoryList() {
  const { data: items, isLoading, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryAPI.getAllItems()
  });

  const createMutation = useMutation({
    mutationFn: (itemData) => inventoryAPI.createItem(itemData),
    onSuccess: () => {
      // Refetch items after creation
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    }
  });

  // Use items, isLoading, error, createMutation...
}
```

## Request/Response Examples

### Login Request
```javascript
POST /auth/login
Content-Type: application/json

{
  "email": "admin@eng.jfn.ac.lk",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": "123",
    "name": "Dr. K. Rajaratnam",
    "email": "admin@eng.jfn.ac.lk",
    "role": "admin",
    "department": "ADMIN"
  },
  "message": "Login successful"
}
```

### Get Inventory Items
```javascript
GET /inventory
Authorization: Bearer {token}

Response:
[
  {
    "id": "item1",
    "name": "Digital Oscilloscope",
    "description": "Tektronix TBS1102B",
    "category": "lab_equipment",
    "department": "EEE",
    "quantity": 15,
    "availableQuantity": 12,
    "unitPrice": 85000,
    "totalValue": 1275000,
    "status": "available",
    "condition": "excellent",
    "createdAt": "2024-01-15T10:00:00"
  }
]
```

## Common Issues & Solutions

### "Cannot find module '@/api'"
Ensure `@` alias is configured in `vite.config.js`:
```javascript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

### "401 Unauthorized on every request"
- Check if token is being saved to localStorage
- Verify token format in Authorization header
- Check if backend JWT validation is working

### "CORS error"
- Backend CORS must be configured for your frontend URL
- Check `SecurityConfig.java` corsConfigurationSource()
- Ensure backend is running on correct port

### "Network requests not showing"
- Check browser DevTools Network tab
- Verify API_BASE_URL is correct
- Check if backend is running
- Verify CORS headers in response

## Best Practices

1. **Error Handling**: Always wrap API calls in try-catch
2. **Loading States**: Show loading indicators during requests
3. **Token Management**: Store and use tokens securely
4. **Request Cancellation**: Cancel requests if component unmounts
5. **Caching**: Use React Query for intelligent caching
6. **Type Safety**: Use TypeScript for better type checking
7. **Environment Variables**: Use .env files for API URLs
# Frontend API Integration Guide

## Overview
The frontend uses Axios HTTP client to communicate with the Spring Boot backend API. All API calls are centralized in the `src/api/` directory.

## File Structure

### src/api/axiosConfig.js
Configures Axios client with:
- Base URL pointing to backend (`http://localhost:8085/api`)
- JWT token auto-injection in request headers
- Automatic token validation on 401 responses
- Request/response interceptors

### src/api/index.js
Exports API functions grouped by feature:
- `authAPI` - Authentication
- `userAPI` - User management
- `inventoryAPI` - Inventory items
- `requestAPI` - Capital requests
- `notificationAPI` - Notifications
- `itemIssueAPI` - Item issues
- `maintenanceAPI` - Maintenance logs
- `dashboardAPI` - Dashboard stats

## Usage Examples

### Authentication
```javascript
import { authAPI } from '@/api';

// Login
const response = await authAPI.login('admin@eng.jfn.ac.lk', 'admin123');
const { token, user } = response.data;
localStorage.setItem('token', token);

// Validate token
const user = await authAPI.validateToken(token);


