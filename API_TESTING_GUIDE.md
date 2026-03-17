# API Testing Guide

## Overview
This guide helps you test all API endpoints using Postman, Thunder Client, or cURL.

## Base URL
```
http://localhost:8085/api
```

## Authentication
All endpoints except `/auth/**` and `/health` require JWT token:
```
Authorization: Bearer {token}
```

## 1. Authentication Endpoints

### 1.1 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@eng.jfn.ac.lk",
  "password": "admin123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": "userId",
    "name": "Dr. K. Rajaratnam",
    "email": "admin@eng.jfn.ac.lk",
    "role": "admin",
    "department": "ADMIN"
  },
  "message": "Login successful"
}
```

### 1.2 Validate Token
```http
GET /auth/validate
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "userId",
  "name": "Dr. K. Rajaratnam",
  "email": "admin@eng.jfn.ac.lk",
  "role": "admin",
  "department": "ADMIN"
}
```

### 1.3 Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {token}

Response: 200 OK
{
  "token": "newTokenValue"
}
```

## 2. User Management Endpoints

### 2.1 Get All Users
```http
GET /users
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "1",
    "name": "Dr. K. Rajaratnam",
    "email": "admin@eng.jfn.ac.lk",
    "phone": "+94 21 222 0000",
    "role": "admin",
    "department": "ADMIN",
    "isActive": true
  }
]
```

### 2.2 Get User by ID
```http
GET /users/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "1",
  "name": "Dr. K. Rajaratnam",
  "email": "admin@eng.jfn.ac.lk",
  "phone": "+94 21 222 0000",
  "role": "admin",
  "department": "ADMIN",
  "isActive": true,
  "createdAt": "2024-01-15T10:00:00"
}
```

### 2.3 Get Users by Role
```http
GET /users/role/admin
Authorization: Bearer {token}

Response: 200 OK
[
  { user objects... }
]
```

### 2.4 Get Users by Department
```http
GET /users/department/EEE
Authorization: Bearer {token}

Response: 200 OK
[
  { user objects... }
]
```

### 2.5 Create User
```http
POST /users
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@eng.jfn.ac.lk",
  "password": "password123",
  "phone": "+94 21 222 0006",
  "role": "lab_to",
  "department": "ME"
}

Response: 201 Created
{ user object... }
```

### 2.6 Update User
```http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+94 21 222 9999"
}

Response: 200 OK
{ updated user object... }
```

### 2.7 Delete User
```http
DELETE /users/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

## 3. Inventory Endpoints

### 3.1 Get All Inventory Items
```http
GET /inventory
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "item1",
    "name": "Digital Oscilloscope",
    "description": "Tektronix TBS1102B",
    "category": "lab_equipment",
    "department": "EEE",
    "lab": "Electronics Lab",
    "quantity": 15,
    "availableQuantity": 12,
    "unitPrice": 85000,
    "totalValue": 1275000,
    "status": "available",
    "condition": "excellent",
    "location": "EEE Building, Room 102",
    "minStockLevel": 5,
    "createdAt": "2024-01-15T10:00:00"
  }
]
```

### 3.2 Get Item by ID
```http
GET /inventory/{id}
Authorization: Bearer {token}

Response: 200 OK
{ inventory item object... }
```

### 3.3 Get Items by Department
```http
GET /inventory/department/EEE
Authorization: Bearer {token}

Response: 200 OK
[ inventory items... ]
```

### 3.4 Get Items by Category
```http
GET /inventory/category/lab_equipment
Authorization: Bearer {token}

Response: 200 OK
[ inventory items... ]
```

### 3.5 Get Items by Status
```http
GET /inventory/status/available
Authorization: Bearer {token}

Response: 200 OK
[ inventory items... ]
```

### 3.6 Create Inventory Item
```http
POST /inventory
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Power Supply",
  "description": "450W Power Supply Unit",
  "category": "lab_equipment",
  "department": "EEE",
  "lab": "Power Lab",
  "quantity": 20,
  "availableQuantity": 18,
  "unitPrice": 15000,
  "totalValue": 300000,
  "status": "available",
  "condition": "excellent",
  "location": "EEE Building, Room 105",
  "supplier": "Electronic Supplier",
  "minStockLevel": 5,
  "serialNumber": "PSU-001"
}

Response: 201 Created
{ inventory item object... }
```

### 3.7 Update Inventory Item
```http
PUT /inventory/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 22,
  "availableQuantity": 20,
  "status": "available",
  "condition": "good"
}

Response: 200 OK
{ updated inventory item... }
```

### 3.8 Delete Inventory Item
```http
DELETE /inventory/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

## 4. Capital Request Endpoints

### 4.1 Create Capital Request
```http
POST /requests
Authorization: Bearer {token}
Content-Type: application/json

{
  "requestedById": "userId",
  "requestedByName": "Mr. R. Ranjan",
  "department": "CE",
  "category": "lab_equipment",
  "items": [
    {
      "id": "1",
      "name": "Network Switch",
      "description": "Cisco Catalyst 9300",
      "quantity": 3,
      "estimatedUnitPrice": 450000
    }
  ],
  "justification": "Upgrade network infrastructure",
  "priority": "high",
  "totalEstimatedCost": 1350000
}

Response: 201 Created
{
  "id": "req1",
  "requestNumber": "REQ-1234567890",
  "status": "pending",
  "approvalChain": [
    { "role": "lab_incharge", "status": "pending" },
    { "role": "hod", "status": "pending" },
    { "role": "admin", "status": "pending" }
  ]
}
```

### 4.2 Get All Requests
```http
GET /requests
Authorization: Bearer {token}

Response: 200 OK
[ request objects... ]
```

### 4.3 Get Requests by Status
```http
GET /requests/status/pending
Authorization: Bearer {token}

Response: 200 OK
[ pending requests... ]
```

### 4.4 Get Requests by Department
```http
GET /requests/department/EEE
Authorization: Bearer {token}

Response: 200 OK
[ department requests... ]
```

### 4.5 Approve Request
```http
PUT /requests/{id}/approve?role=hod&userId=userId&userName=Prof. S. Sivakumar
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "req1",
  "status": "approved_by_hod",
  "approvalChain": [
    { "role": "lab_incharge", "status": "approved", "userName": "..." },
    { "role": "hod", "status": "approved", "userName": "Prof. S. Sivakumar" },
    { "role": "admin", "status": "pending" }
  ]
}
```

### 4.6 Reject Request
```http
PUT /requests/{id}/reject?role=hod&userId=userId&userName=Prof. S. Sivakumar&remarks=Insufficient budget
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "req1",
  "status": "rejected",
  "remarks": [
    {
      "userId": "userId",
      "userName": "Prof. S. Sivakumar",
      "userRole": "hod",
      "remark": "Insufficient budget",
      "createdAt": "2024-01-20T15:30:00"
    }
  ]
}
```

### 4.7 Add Remark
```http
POST /requests/{id}/remarks?userId=userId&userName=Prof. S. Sivakumar&userRole=hod&remark=Please provide more details
Authorization: Bearer {token}

Response: 200 OK
{ updated request object... }
```

## 5. Item Issue Endpoints

### 5.1 Issue Item
```http
POST /item-issues
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": "item1",
  "itemName": "Digital Oscilloscope",
  "issuedTo": "A. Arulanantham (EE4001)",
  "issuedById": "userId",
  "issuedByName": "Mr. R. Ranjan",
  "purpose": "Final Year Project",
  "quantity": 2,
  "expectedReturnDate": "2024-03-15T23:59:59"
}

Response: 201 Created
{
  "id": "issue1",
  "status": "issued",
  "issueDate": "2024-01-22T10:00:00"
}
```

### 5.2 Get Issued Items
```http
GET /item-issues/status/issued
Authorization: Bearer {token}

Response: 200 OK
[ issued item objects... ]
```

### 5.3 Return Item
```http
PUT /item-issues/{id}/return?condition=good&remarks=Item returned in good condition
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "issue1",
  "status": "returned",
  "actualReturnDate": "2024-01-25T14:30:00",
  "condition": "good"
}
```

## 6. Maintenance Endpoints

### 6.1 Create Maintenance Log
```http
POST /maintenance
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": "item1",
  "itemName": "CNC Machine",
  "type": "preventive",
  "description": "Annual calibration and maintenance",
  "reportedById": "userId",
  "reportedByName": "Mr. R. Ranjan",
  "assignedTo": "External Service Provider",
  "status": "scheduled",
  "scheduledDate": "2024-02-15T09:00:00"
}

Response: 201 Created
{ maintenance log object... }
```

### 6.2 Get Maintenance Logs by Status
```http
GET /maintenance/status/in_progress
Authorization: Bearer {token}

Response: 200 OK
[ maintenance logs... ]
```

### 6.3 Update Maintenance Log
```http
PUT /maintenance/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed",
  "notes": "Calibration completed successfully",
  "cost": 150000
}

Response: 200 OK
{ updated maintenance log... }
```

## 7. Notification Endpoints

### 7.1 Get User Notifications
```http
GET /notifications/user/{userId}
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "notif1",
    "userId": "userId",
    "title": "Low Stock Alert",
    "message": "Oscilloscope stock below minimum",
    "type": "warning",
    "isRead": false,
    "link": "/admin/inventory",
    "createdAt": "2024-01-22T10:00:00"
  }
]
```

### 7.2 Get Unread Notifications
```http
GET /notifications/user/{userId}/unread
Authorization: Bearer {token}

Response: 200 OK
[ unread notification objects... ]
```

### 7.3 Create Notification
```http
POST /notifications
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "userId",
  "title": "Request Approved",
  "message": "Your capital request REQ-1234 has been approved",
  "type": "success",
  "link": "/requests/req1"
}

Response: 201 Created
{ notification object... }
```

### 7.4 Mark as Read
```http
PUT /notifications/{id}/read
Authorization: Bearer {token}

Response: 200 OK
{ notification object with isRead: true }
```

## 8. Dashboard Endpoints

### 8.1 Get Overall Dashboard Stats
```http
GET /dashboard/stats
Authorization: Bearer {token}

Response: 200 OK
{
  "totalItems": 1161,
  "totalValue": 21860000,
  "pendingRequests": 5,
  "lowStockItems": 8,
  "itemsInMaintenance": 3,
  "recentActivities": [
    {
      "id": "act1",
      "action": "Item Added",
      "description": "Added 5 new computer workstations",
      "userName": "Dr. K. Rajaratnam",
      "type": "create",
      "timestamp": "2024-01-22T10:00:00"
    }
  ]
}
```

### 8.2 Get Department Dashboard Stats
```http
GET /dashboard/stats/department/EEE
Authorization: Bearer {token}

Response: 200 OK
{
  "totalItems": 245,
  "totalValue": 5200000,
  "pendingRequests": 2,
  "lowStockItems": 3,
  "itemsInMaintenance": 1,
  "recentActivities": [ activities... ]
}
```

## Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:8085/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@eng.jfn.ac.lk",
    "password": "admin123"
  }'
```

### Get All Items with Token
```bash
curl -X GET http://localhost:8085/api/inventory \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Item with Token
```bash
curl -X POST http://localhost:8085/api/inventory \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Power Supply",
    "description": "450W Power Supply",
    "category": "lab_equipment",
    "department": "EEE",
    "quantity": 20,
    "availableQuantity": 18,
    "unitPrice": 15000,
    "totalValue": 300000,
    "status": "available",
    "condition": "excellent",
    "minStockLevel": 5
  }'
```

## Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Delete successful |
| 400 | Bad Request - Invalid request format |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Backend error |

## Tips for Testing

1. **Save Token**: After login, copy the token and use it for other requests
2. **Use Postman Collections**: Import and organize your API calls
3. **Test Edge Cases**: Try with empty data, invalid IDs, wrong roles
4. **Monitor Backend Logs**: Check console output for error messages
5. **Verify Database**: Check MongoDB directly to confirm data persistence

