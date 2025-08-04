import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { AdminAuthProvider, AdminAuthContext } from "./context/AdminAuthContext";

// Public pages
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import ClaimDetails from "./pages/ClaimDetails";
import Listening from "./pages/Listening";
import Registration from "./pages/Registration";
import ClaimConfirmation from "./pages/ClaimConfirmation";

// User pages
import Dashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import ClaimDashboard from "./pages/ClaimDashboard";
import Settings from "./pages/Settings";
import ClaimsPage from "./pages/ClaimsPage";
import Udashboard from "./pages/Udashboard";
import ClaimStatus from "./ClaimStatus";
import SupportPage from "./pages/Support";
import AutoFilledClaimForm from "./pages/AutoFilledClaimForm";

// Admin pages
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminClaims from "./pages/AdminClaims";
import AdminSettings from "./pages/AdminSettings";
import AdminReports from "./pages/AdminReports";

// Layout components
import Navbar from "./component/Navbar";
import Navbar2 from "./component/Navbar2";
import AdminLayout from "./component/AdminLayout";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/auth" replace />;
};

const AdminRoute = ({ children }) => {
  const { admin, loading } = useContext(AdminAuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return admin ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/details" element={<ClaimDetails />} />
          <Route path="/listen" element={<Listening />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/claim-confirmation" element={<ClaimConfirmation />} />
          
          {/* User Routes (Require regular user auth) */}
          <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
          <Route path="/notifications" element={<UserRoute><Notifications /></UserRoute>} />
          <Route path="/claimd" element={<ClaimDashboard />} />
          <Route path="/settings" element={<UserRoute><Settings /></UserRoute>} />
          <Route path="/claimp" element={<UserRoute><ClaimsPage /></UserRoute>} />
          <Route path="/udash" element={<UserRoute><Udashboard /></UserRoute>} />
          <Route path="/claimstatus" element={<UserRoute><ClaimStatus /></UserRoute>} />
          <Route path="/support" element={<UserRoute><SupportPage /></UserRoute>} />
          <Route path="/auto-filled-claim" element={<UserRoute><AutoFilledClaimForm /></UserRoute>} />
          
          {/* Admin Routes (Separate admin auth) */}
          <Route path="/admin/login" element={<AdminAuth />} />
          
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="claims" element={<AdminClaims />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            {/* Add more admin sub-routes here */}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;