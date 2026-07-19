import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Accounts from "../pages/Accounts";
import Payments from "../pages/Payments";
import History from "../pages/History";
import Health from "../pages/Health";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/history" element={<History />} />
        <Route path="/health" element={<Health />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;