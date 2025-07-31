import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Auth from "./pages/Auth";
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

function App() {
    return (
   <Router>
    <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/notifications" element={<Notifications />}/>
        <Route path="/user" element={<UserManagement/>}/>
        <Route path="/details" element={<ClaimDetails/>}/>
        <Route path="/claimd" element={<ClaimDashboard/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/claimp" element={<ClaimsPage/>}/>
        <Route path="/listen" element={<Listening/>}/>
        <Route path="/udash" element={<Udashboard/>}/>
        <Route path="/claimstatus" element={<ClaimStatus/>}/>
        <Route path="/reg" element={<Registration/>}/>
        <Route path="/support" element={<SupportPage/>}/>
        <Route path="/adminauth" element={<AdminAuth/>}/>



        







    </Routes>
   </Router>
    )
}

export default App