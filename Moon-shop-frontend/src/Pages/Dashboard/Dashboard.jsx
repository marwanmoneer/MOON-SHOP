// Importing the styles for the Dashboard component
import "./Dashboard.css";

// Importing the DashboardItems component to be rendered within the Dashboard
import DashboardItems from "../../components/Dashboard/DashboardItems";

// Functional component representing the Dashboard page
const Dashboard = () => {
  return (
    // Container for the entire dashboard content
    <div className="dashbord-container">
      {/* Rendering the DashboardItems component to display dashboard content */}
      <DashboardItems />
    </div>
  );
};

// Exporting the Dashboard component for use in other parts of the application
export default Dashboard;
