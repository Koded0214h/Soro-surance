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

        







    </Routes>
   </Router>
    )
}

export default App