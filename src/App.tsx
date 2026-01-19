import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Auth & Layout
import Login from "@/pages/auth/Login";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminInventory from "@/pages/admin/Inventory";
import AdminUsers from "@/pages/admin/Users";
import AdminDepartments from "@/pages/admin/Departments";
import AdminRequests from "@/pages/admin/Requests";
import AdminNotifications from "@/pages/admin/Notifications";
import AdminSettings from "@/pages/admin/Settings";

// HOD Pages
import HODDashboard from "@/pages/hod/Dashboard";
import HODApprovals from "@/pages/hod/Approvals";

// Lab In-Charge Pages
import LabInchargeDashboard from "@/pages/lab-incharge/Dashboard";

// MA Pages
import MADashboard from "@/pages/ma/Dashboard";
import MAPurchases from "@/pages/ma/Purchases";
import MAStockIn from "@/pages/ma/StockIn";

// Lab TO Pages
import LabTODashboard from "@/pages/lab-to/Dashboard";
import IssueItem from "@/pages/lab-to/IssueItem";
import CreateRequest from "@/pages/lab-to/CreateRequest"; // New Import
import Maintenance from "@/pages/lab-to/Maintenance";     // New Import

// Error Page
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
              {/* Placeholder for Reports */}
              <Route path="reports" element={<AdminDashboard />} />
            </Route>

            {/* HOD Routes */}
            <Route path="/hod" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/hod/dashboard" replace />} />
              <Route path="dashboard" element={<HODDashboard />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="requests" element={<HODApprovals />} />
            </Route>

            {/* Lab In-Charge Routes */}
            <Route path="/lab-incharge" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/lab-incharge/dashboard" replace />} />
              <Route path="dashboard" element={<LabInchargeDashboard />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="requests" element={<HODApprovals />} />
            </Route>

            {/* Management Assistant Routes */}
            <Route path="/ma" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/ma/dashboard" replace />} />
              <Route path="dashboard" element={<MADashboard />} />
              <Route path="purchases" element={<MAPurchases />} />
              <Route path="stock-in" element={<MAStockIn />} />
            </Route>

            {/* Lab TO Routes */}
            <Route path="/lab-to" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/lab-to/dashboard" replace />} />
              <Route path="dashboard" element={<LabTODashboard />} />
              <Route path="issue" element={<IssueItem />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="create-request" element={<CreateRequest />} /> {/* Fixed Route */}
              <Route path="maintenance" element={<Maintenance />} />       {/* Fixed Route */}

              {/* Placeholders for other TO pages */}
              <Route path="returns" element={<LabTODashboard />} />
              <Route path="alerts" element={<LabTODashboard />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;