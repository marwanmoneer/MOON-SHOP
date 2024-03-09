/*
The provided React component code defines a basic layout structure.

Layout Component:
- Combines a header, main content area, and footer to create a complete page layout.
- Utilizes React Router's Outlet component for rendering nested routes.

Header Component:
- Includes the Header component, which is expected to contain navigation elements or other header-related content.

main-content:
- Serves as the main area for rendering the content of the current route.
- Utilizes the Outlet component from React Router, which dynamically renders the content of nested routes.

Footer Component:
- Includes the Footer component, which typically contains information, links, or other content for the page footer.

CSS Styling:
- Applies styles from an external CSS file (Layout.css) to control the layout and appearance of the components.

Note: The code structure follows a modular approach, separating concerns into different components (Header, Footer).
*/
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import './Layout.css';  // You can create a new CSS file to style the Layout design

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
