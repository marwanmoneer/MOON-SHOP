import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import './DashboardLayout.css'

// Component representing the layout for the dashboard
const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout-items">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
