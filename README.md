│   │   │   ├── JwtAuthenticationFilter
│   │   │   └── JwtAuthenticationEntryPoint
│   │   ├── config/                  # Configuration
│   │   │   ├── SecurityConfig
│   │   │   └── DataInitializer
│   │   └── InventoryHubApplication
│   ├── src/main/resources/
│   │   └── application.yml          # Configuration
│   ├── pom.xml                      # Maven Dependencies
│   └── README.md
│
├── src/                             # React Frontend
│   ├── api/                         # API Integration
│   │   ├── axiosConfig.js          # HTTP Client Setup
│   │   └── index.js                # API Endpoints
│   ├── components/
│   │   ├── common/                 # Shared Components
│   │   ├── layout/                 # Layout Components
│   │   └── ui/                     # UI Components (Shadcn)
│   ├── contexts/
│   │   └── AuthContext.jsx         # Auth State
│   ├── pages/
│   │   ├── Index.jsx
│   │   ├── NotFound.jsx
│   │   ├── admin/
│   │   ├── hod/
│   │   ├── lab-incharge/
│   │   ├── ma/
│   │   └── lab-to/
│   ├── lib/
│   │   ├── constants.js
│   │   ├── mockData.js
│   │   └── utils.js
│   └── main.jsx
│
├── package.json                    # Frontend Dependencies
├── SETUP_GUIDE.md                 # Complete Setup Documentation
├── FRONTEND_API_GUIDE.md          # Frontend API Integration Guide
└── README.md                      # This file
```

## 🗄️ MongoDB Collections

The system automatically creates:
- **users** - User accounts with roles and departments
- **inventory_items** - Equipment and furniture catalog
- **capital_requests** - Equipment/furniture requests with approval chain
- **item_issues** - Item checkout/return transactions
- **maintenance_logs** - Equipment maintenance history
- **notifications** - User notifications and alerts
- **activities** - Audit log of system actions
- **stock_alerts** - Low stock and inventory warnings

## 🔐 Security Features

1. **JWT Authentication** - Stateless token-based auth
2. **Password Encryption** - BCrypt hashing with salt
3. **CORS Configuration** - Restricted to frontend origins
4. **Role-Based Access Control** - Endpoint authorization by role
5. **Token Validation** - Automatic validation and refresh
6. **Secure Headers** - CSRF protection and security headers

## 📊 Data Models

### User
- id, name, email, password (hashed), phone
- role (admin, hod, lab_incharge, ma, lab_to)
- department, isActive, createdAt, updatedAt, lastLogin

### InventoryItem
- id, name, description, category (lab_equipment, furniture)
- department, lab, quantity, availableQuantity
- unitPrice, totalValue, status, condition
- location, supplier, purchaseDate, warrantyExpiry
- minStockLevel, serialNumber, tags

### CapitalRequest
- id, requestNumber, requestedBy (user reference)
- department, category, items (array)
- justification, priority, status
- totalEstimatedCost, remarks, approvalChain

### ItemIssue
- id, itemId, itemName, issuedTo, issuedBy
- purpose, quantity, issueDate, expectedReturnDate
- actualReturnDate, status, condition

### MaintenanceLog
- id, itemId, itemName, type (preventive, corrective)
- description, reportedBy, assignedTo
- status (scheduled, in_progress, completed)
- scheduledDate, completionDate, cost, notes

## 🔄 Request Approval Workflow

1. **Lab Staff** submits capital request
2. **Lab In-Charge** reviews and approves/rejects
3. **HOD** reviews and approves/rejects
4. **Admin** makes final approval/rejection
5. System creates notifications at each step

## 📈 Dashboard Analytics

- Total inventory value and item count
- Pending requests count
- Low stock items count
- Items in maintenance count
- Recent activity feed
- Department-specific statistics

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
npm run test
npm run test:watch
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
```
Solution: Ensure MongoDB is running (mongod command)
Check connection string in application.yml
```

**Port 8085 Already in Use**
```
Solution: Change port in application.yml or kill process
lsof -i :8085  # Check what's using port
```

**JWT Token Validation Error**
```
Solution: Token may be expired - user needs to re-login
Check JWT secret matches in configuration
```

### Frontend Issues

**API Requests Failing**
```
Solution: Verify backend is running on port 8085
Check CORS configuration in SecurityConfig
Verify token is stored in localStorage
```

**CORS Error in Browser**
```
Solution: Backend CORS must include your frontend URL
Update corsConfigurationSource() in SecurityConfig.java
```

**Blank Page or Routing Issues**
```
Solution: Check browser console for errors
Verify all dependencies installed: npm install
Clear browser cache and restart dev server
```

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup and configuration
- **[FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)** - Frontend API integration
- **[backend/README.md](./backend/README.md)** - Backend deployment guide

## 🚀 Deployment

### Backend Deployment
1. Build JAR: `mvn clean package`
2. Set environment variables (MONGODB_URI, JWT_SECRET)
3. Run: `java -jar backend/target/inventory-hub-1.0.0.jar`

### Frontend Deployment
1. Build: `npm run build`
2. Deploy to Vercel, Netlify, AWS S3, or similar
3. Set API endpoint environment variable

## 📝 Development Commands

```bash
# Frontend
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Lint code
npm run test      # Run tests

# Backend
mvn clean install        # Build with dependencies
mvn spring-boot:run      # Run application
mvn test                 # Run tests
mvn package             # Create JAR file
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is for educational purposes.

## 📞 Support

For issues and questions:
1. Check the documentation files
2. Review API endpoints in controllers
3. Check browser console for frontend errors
4. Check backend logs for server errors

## 🎓 Key Technologies

**Backend:**
- Spring Boot 3.2
- Spring Security
- Spring Data MongoDB
- JWT (io.jsonwebtoken)
- Maven
- Java 17

**Frontend:**
- React 18.3
- Vite
- Axios
- React Router v6
- React Query (TanStack)
- Tailwind CSS
- Shadcn/UI

**Database:**
- MongoDB 5.0+

---

**Last Updated:** March 2024
**Version:** 1.0.0
# University Inventory Hub - Complete System

A full-stack inventory management system for educational institutions built with **Spring Boot**, **MongoDB**, and **React**.

## 🎯 Overview

This system provides comprehensive inventory management capabilities for university departments, including:
- Equipment and furniture tracking
- Capital request management with approval workflows
- Item issue and return tracking
- Maintenance scheduling and monitoring
- Role-based access control
- Real-time notifications
- Dashboard analytics

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Spring Security with BCrypt password encryption
- **API**: RESTful endpoints with CORS support
- **Port**: 8085

### Frontend (React)
- **Framework**: React 18.3
- **Build Tool**: Vite
- **UI Library**: Shadcn/UI with Radix UI
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **State Management**: React Context + React Query
- **Styling**: Tailwind CSS
- **Port**: 5173

## 📋 Prerequisites

- **Java**: 17 or higher
- **Node.js**: 16+ with npm/yarn
- **MongoDB**: Community Edition or Atlas (cloud)
- **Maven**: 3.6+
- **Git**: For version control

## 🚀 Quick Start

### 1️⃣ Start MongoDB

**Local Installation:**
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Start MongoDB server
mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string and note it

### 2️⃣ Setup Backend

```bash
# Navigate to backend directory
cd backend

# Build with Maven
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend starts at: `http://localhost:8085/api`

### 3️⃣ Setup Frontend

```bash
# Install dependencies (from root directory)
npm install

# Start development server
npm run dev
```

Frontend available at: `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      # Local MongoDB
      uri: mongodb://localhost:27017/inventory_hub
      
      # OR MongoDB Atlas
      # uri: mongodb+srv://username:password@cluster.mongodb.net/inventory_hub

jwt:
  secret: change-this-secret-in-production-environment
  expiration: 86400000  # 24 hours

server:
  port: 8085
  servlet:
    context-path: /api
```

### Frontend Configuration

API client configured in `src/api/axiosConfig.js` - automatically connects to `http://localhost:8085/api`

## 👥 Default Test Accounts

| Email | Password | Role | Department |
|-------|----------|------|-----------|
| **admin@eng.jfn.ac.lk** | admin123 | Admin | ADMIN |
| **hod.eee@eng.jfn.ac.lk** | hod123 | HOD | EEE |
| **hod.ce@eng.jfn.ac.lk** | hod123 | HOD | CE |
| **labincharge.eee@eng.jfn.ac.lk** | lab123 | Lab In-Charge | EEE |
| **ma@eng.jfn.ac.lk** | ma123 | Management Assistant | ADMIN |
| **labto.ce@eng.jfn.ac.lk** | to123 | Lab Technical Officer | CE |

## 📦 Features by Role

### 👨‍💼 Admin
- ✅ Manage all inventory items across departments
- ✅ User account management
- ✅ Final approval of capital requests
- ✅ View system-wide analytics
- ✅ System settings and configuration
- ✅ Access all notifications

### 👨‍🏫 Head of Department (HOD)
- ✅ View department inventory
- ✅ Approve/reject capital requests from lab staff
- ✅ View department statistics and analytics
- ✅ Monitor maintenance requests
- ✅ Department-level notifications

### 🔧 Lab In-Charge
- ✅ Manage lab inventory
- ✅ Approve item issues from staff
- ✅ Submit capital requests
- ✅ Track equipment maintenance
- ✅ Monitor low stock items

### 📊 Management Assistant (MA)
- ✅ Manage purchase orders
- ✅ Stock-in operations
- ✅ Track expenditures
- ✅ Generate purchase reports

### 🛠️ Lab Technical Officer
- ✅ Issue items from inventory
- ✅ Submit capital requests for lab needs
- ✅ Track item returns
- ✅ Report maintenance issues
- ✅ Access lab inventory

## 🔌 API Endpoints

### Authentication
```
POST   /auth/login              # Login with credentials
GET    /auth/validate           # Validate JWT token
POST   /auth/refresh            # Refresh token
```

### Users
```
GET    /users                   # Get all users
GET    /users/{id}              # Get user by ID
GET    /users/email/{email}     # Get user by email
GET    /users/role/{role}       # Get users by role
GET    /users/department/{dept} # Get users by department
POST   /users                   # Create user
PUT    /users/{id}              # Update user
DELETE /users/{id}              # Delete user
```

### Inventory
```
GET    /inventory               # Get all items
GET    /inventory/{id}          # Get item
POST   /inventory               # Create item
PUT    /inventory/{id}          # Update item
DELETE /inventory/{id}          # Delete item
GET    /inventory/department/{dept}   # Filter by department
GET    /inventory/category/{cat}      # Filter by category
GET    /inventory/status/{status}     # Filter by status
GET    /inventory/lab/{lab}           # Filter by lab
```

### Capital Requests
```
GET    /requests                # Get all requests
GET    /requests/{id}           # Get request
POST   /requests                # Create request
PUT    /requests/{id}/approve   # Approve request
PUT    /requests/{id}/reject    # Reject request
POST   /requests/{id}/remarks   # Add remarks
```

### Item Issues
```
GET    /item-issues/{id}        # Get issue
POST   /item-issues             # Issue item
PUT    /item-issues/{id}/return # Return item
GET    /item-issues/item/{id}   # Get issues for item
GET    /item-issues/status/issued    # Get issued items
GET    /item-issues/status/returned  # Get returned items
```

### Maintenance
```
GET    /maintenance/{id}        # Get log
POST   /maintenance             # Create log
PUT    /maintenance/{id}        # Update log
GET    /maintenance/item/{id}   # Logs for item
GET    /maintenance/status/{status}  # Logs by status
```

### Notifications
```
GET    /notifications/user/{id}       # Get notifications
GET    /notifications/user/{id}/unread # Get unread
POST   /notifications                 # Create notification
PUT    /notifications/{id}/read       # Mark as read
```

### Dashboard
```
GET    /dashboard/stats              # Overall stats
GET    /dashboard/stats/department/{dept}  # Department stats
```

## 📁 Project Structure

```
university-inventory-hub-main/
│
├── backend/                          # Spring Boot Application
│   ├── src/main/java/com/university/inventoryhub/
│   │   ├── controller/              # REST API Controllers
│   │   │   ├── AuthController
│   │   │   ├── UserController
│   │   │   ├── InventoryController
│   │   │   ├── CapitalRequestController
│   │   │   ├── ItemIssueController
│   │   │   ├── MaintenanceController
│   │   │   ├── NotificationController
│   │   │   ├── DashboardController
│   │   │   └── HealthController
│   │   ├── service/                 # Business Logic
│   │   │   ├── UserService
│   │   │   ├── InventoryService
│   │   │   ├── CapitalRequestService
│   │   │   ├── ItemIssueService
│   │   │   ├── MaintenanceService
│   │   │   ├── NotificationService
│   │   │   ├── ActivityService
│   │   │   └── DashboardService
│   │   ├── repository/              # MongoDB DAL
│   │   │   ├── UserRepository
│   │   │   ├── InventoryItemRepository
│   │   │   ├── CapitalRequestRepository
│   │   │   └── ... (other repos)
│   │   ├── model/
│   │   │   ├── entity/              # MongoDB Documents
│   │   │   └── dto/                 # Data Transfer Objects
│   │   ├── security/                # JWT & Security
│   │   │   ├── JwtTokenProvider

