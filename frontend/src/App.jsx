import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import ClaimDetails from "./pages/ClaimDetails";
import ClaimDashboard from "./pages/ClaimDashboard";
import Settings from "./pages/Settings";
import ClaimsPage from "./pages/ClaimsPage";
import Listening from "./pages/Listening";
import Navbar from "./component/Navbar";
import Udashboard from "./pages/Udashboard";
import ClaimStatus from "./ClaimStatus";
import Registration from "./pages/Registration";
import SupportPage from "./pages/Support";
import Navbar2 from "./component/Navbar2";
import AdminAuth from "./pages/AdminAuth";

import { AuthProvider, AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/details"
            element={
                <ClaimDetails />
            }
          />
          <Route
            path="/claimd"
            element={
              <PrivateRoute>
                <ClaimDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/claimp"
            element={
              <PrivateRoute>
                <ClaimsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/listen"
            element={
                <Listening />
            }
          />
          <Route
            path="/udash"
            element={
              <PrivateRoute>
                <Udashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/claimstatus"
            element={
              <PrivateRoute>
                <ClaimStatus />
              </PrivateRoute>
            }
          />
          <Route
            path="/reg"
            element={
              <PrivateRoute>
                <Registration />
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <SupportPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/adminauth"
            element={
              <PrivateRoute>
                <AdminAuth />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
