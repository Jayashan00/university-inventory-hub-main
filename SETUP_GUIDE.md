# University Inventory Hub - Full Stack Setup Guide

## Project Overview
A complete university inventory management system with Spring Boot backend and React frontend.

## Directory Structure
```
university-inventory-hub-main/
├── backend/                          # Spring Boot REST API
│   ├── src/main/java/.../
│   │   ├── controller/              # REST Controllers
│   │   ├── service/                 # Business Logic
│   │   ├── repository/              # MongoDB Data Access
│   │   ├── model/
│   │   │   ├── entity/              # MongoDB Documents
│   │   │   └── dto/                 # Data Transfer Objects
│   │   ├── security/                # JWT & Security Config
│   │   └── config/                  # Application Configuration
│   ├── src/main/resources/
│   │   └── application.yml          # Configuration
│   ├── pom.xml                      # Maven Dependencies
│   └── README.md                    # Backend Setup Guide
│
├── src/                             # React Frontend
│   ├── api/                         # API Client Configuration
│   │   ├── axiosConfig.js          # Axios HTTP Client
│   │   └── index.js                # API Endpoints
│   ├── components/                 # React Components
│   ├── contexts/                   # Auth Context
│   ├── pages/                      # Page Components
│   └── lib/                        # Utilities & Constants
│
├── package.json                    # Frontend Dependencies
└── README.md                       # Main Documentation
```

## Prerequisites
- Java 17+
- Node.js 16+
- MongoDB (local or Atlas)
- Maven 3.6+
- npm or yarn

## Quick Start

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Run MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/inventory_hub`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on: **http://localhost:8085/api**

### 3. Frontend Setup

```bash
# Install dependencies
npm install

# Update MongoDB URI in backend/src/main/resources/application.yml if needed
# For MongoDB Atlas, replace the URI in application.yml

# Start frontend development server
npm run dev
```

The frontend will start on: **http://localhost:5173**

## Configuration

### Backend Configuration (application.yml)

```yaml
spring:
  application:
    name: university-inventory-hub
  data:
    mongodb:
      uri: mongodb://localhost:27017/inventory_hub
      # OR for MongoDB Atlas:
      # uri: mongodb+srv://username:password@cluster.mongodb.net/inventory_hub

jwt:
  secret: your-secret-key-change-in-production
  expiration: 86400000  # 24 hours in milliseconds

server:
  port: 8085
  servlet:
    context-path: /api
```

### Frontend Configuration

The frontend automatically connects to the backend at `http://localhost:8085/api` via the API client in `src/api/axiosConfig.js`.

## Test Credentials

Use these accounts to test the application:

| Email | Password | Role | Department |
|-------|----------|------|-----------|
| admin@eng.jfn.ac.lk | admin123 | Admin | ADMIN |
| hod.eee@eng.jfn.ac.lk | hod123 | HOD | EEE |
| hod.ce@eng.jfn.ac.lk | hod123 | HOD | CE |
| labincharge.eee@eng.jfn.ac.lk | lab123 | Lab In-Charge | EEE |
| ma@eng.jfn.ac.lk | ma123 | MA | ADMIN |
| labto.ce@eng.jfn.ac.lk | to123 | Lab T.O. | CE |

## API Documentation

### Base URL: `http://localhost:8085/api`

All endpoints (except `/auth/**` and `/health`) require JWT token in Authorization header:
```
Authorization: Bearer {token}
```

### Authentication Endpoints
- `POST /auth/login` - Login with email and password
- `GET /auth/validate` - Validate JWT token
- `POST /auth/refresh` - Get new token

### Users
- `GET /users` - Get all users
- `POST /users` - Create user
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Inventory
- `GET /inventory` - Get all items
- `POST /inventory` - Create item
- `GET /inventory/{id}` - Get item
- `PUT /inventory/{id}` - Update item
- `DELETE /inventory/{id}` - Delete item
- `GET /inventory/department/{dept}` - Filter by department
- `GET /inventory/category/{category}` - Filter by category

### Capital Requests
- `GET /requests` - Get all requests
- `POST /requests` - Create request
- `GET /requests/{id}` - Get request
- `PUT /requests/{id}/approve` - Approve request
- `PUT /requests/{id}/reject` - Reject request
- `POST /requests/{id}/remarks` - Add remarks

### Item Issues
- `GET /item-issues` - Get issues
- `POST /item-issues` - Issue item
- `PUT /item-issues/{id}/return` - Return item

### Maintenance
- `GET /maintenance` - Get logs
- `POST /maintenance` - Create log
- `PUT /maintenance/{id}` - Update log

### Notifications
- `GET /notifications/user/{userId}` - Get notifications
- `POST /notifications` - Create notification
- `PUT /notifications/{id}/read` - Mark as read

### Dashboard
- `GET /dashboard/stats` - Overall statistics
- `GET /dashboard/stats/department/{dept}` - Department statistics

## Features

### Admin
- Manage all inventory
- Manage users
- View all requests
- System settings
- View all notifications

### Head of Department (HOD)
- View department inventory
- Approve/reject requests from lab in-charges
- View department statistics

### Lab In-Charge
- View lab inventory
- Submit capital requests
- Approve/reject item issues
- Track maintenance

### Management Assistant (MA)
- Manage purchases
- Stock-in operations
- Generate purchase orders

### Lab Technical Officer (TO)
- Issue items from inventory
- Create capital requests
- Track maintenance needs
- Manage lab inventory

## Frontend Integration

The frontend uses Axios for API calls with automatic JWT token handling:

```javascript
import { inventoryAPI, requestAPI, authAPI } from '@/api';

// Login
const response = await authAPI.login(email, password);

// Get inventory items
const items = await inventoryAPI.getAllItems();

// Create request
const newRequest = await requestAPI.createRequest(requestData);
```

## MongoDB Collections

The system creates these collections automatically:
- `users` - User accounts and roles
- `inventory_items` - Equipment and furniture
- `capital_requests` - Equipment requests
- `item_issues` - Item checkout/return tracking
- `maintenance_logs` - Equipment maintenance records
- `notifications` - User notifications
- `activities` - Action audit log
- `stock_alerts` - Low stock warnings

## Security Features

1. **JWT Authentication** - Token-based API authentication
2. **Password Encryption** - BCrypt hashing
3. **CORS Configuration** - Restricted to frontend origins
4. **Role-based Access Control** - Endpoint authorization
5. **Token Validation** - Automatic token refresh on login

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Ensure MongoDB is running
```bash
mongod
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
Solution: Ensure backend CORS is configured for your frontend URL in `SecurityConfig.java`

### Port Already in Use
```
Address already in use: 8085
```
Solution: Change port in `application.yml` or kill process on that port

### JWT Token Expired
```
401 Unauthorized
```
Solution: Re-login to get a new token

## Development Tips

1. **Enable Debug Logging**: Add to `application.yml`
```yaml
logging:
  level:
    root: INFO
    com.university.inventoryhub: DEBUG
```

2. **Test API Endpoints**: Use Postman or Thunder Client
   - Import the API endpoints
   - Set Authorization header with JWT token
   - Test each endpoint

3. **Frontend Development**: Use React DevTools and Network tab
   - Check API requests/responses
   - Verify token is being sent
   - Monitor component state

## Production Deployment

### Backend
1. Build JAR: `mvn clean package`
2. Set environment variables:
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Strong secret key
3. Run JAR: `java -jar inventory-hub-1.0.0.jar`

### Frontend
1. Build: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, AWS S3, etc.)
3. Set API_BASE_URL environment variable

## Support & Documentation

- Backend README: See `backend/README.md`
- API Docs: Detailed endpoint documentation in controllers
- Mock Data: Reference in `src/lib/mockData.js` for data structure

## License

This project is for educational purposes.

