// Importing necessary dependencies and components
import { Routes, Route } from "react-router-dom";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import { SearchProvider } from "./context/FilterContext";
import "./App.css";

// Importing various pages and components
import { Home } from "./Pages/Home/Home";
import Signup from "./Pages/auth/Signup";
import Signin from "./Pages/auth/Signin";
import PersistLogin from "./components/reqAuth/PersistLogin";
import Layout from "./components/layout/Layout";
import NotFound from "./components/404Page/NotFound";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Checkout from "./Pages/Checkout/Checkout";
import ProductDetail from "./components/porducts/product detail/ProductDetail";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AuthDashbord from "./components/Dashboard/Auth/AuthDashbord";
import DashboardLayout from "./components/Dashboard/DashboardLayout/DashboardLayout";
import Orders from "./components/Orders/All Orders/Orders";
import UpdateOrder from "./components/Orders/UpdateOrder/UpdateOrder";
import Categories from "./components/categories/All categories/Categories";
import AddPoduct from "./components/porducts/AddPoduct/AddPoduct";
import AddCategory from "./components/categories/Add Category/AddCategory";
import UpdateCategory from "./components/categories/Update Category/UpdateCategory";
import AllProducts from "./components/porducts/All Products/AllProducts";
import UpdateProduct from "./components/porducts/Update product/UpdateProduct";
import Users from "./components/Users/All Usera/Users";
import AddUser from "./components/Users/Add User/AddUser";
import UpdateUser from "./components/Users/Update User Admin/UpdateUser";
import EditUser from "./components/Users/Update User/EditUser";
import Store from "./Pages/Store/Store";
import SearchResults from "./components/search/SearchResults/SearchResults";

// Main App component
function App() {
  return (
    // Wrapping the entire application with the ShoppingCartProvider and SearchProvider
    <ShoppingCartProvider>
      <SearchProvider>
        {/* Defining the route structure using React Router's Routes and Route components */}
        <Routes>
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
          
          {/* Authentication routes */}
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />

          {/* Route element for persisting user login */}
          <Route element={<PersistLogin />}>
            
            {/* Layout for authenticated users */}
            <Route path="/" element={<Layout />}>
              {/* Home page */}
              <Route index element={<Home />} />
              
              {/* Product detail page */}
              <Route path="product/:id" element={<ProductDetail />} />
              
              {/* Shopping Cart page */}
              <Route path="cart" element={<ShoppingCart />} />
              
              {/* Checkout page */}
              <Route path="checkout" element={<Checkout />} />
              
              {/* All products page */}
              <Route path="allproducts" element={<Store />} />
              
              {/* Search results page */}
              <Route path="search" element={<SearchResults />} />
              
              {/* Edit User page */}
              <Route path="updateuser/:id" element={<EditUser />} />
            </Route>

            {/* Dashboard routes */}
            <Route element={<AuthDashbord />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                {/* Dashboard home */}
                <Route index element={<Dashboard />} />
                
                {/* Orders page */}
                <Route path="orders" element={<Orders />} />
                
                {/* Update Order page */}
                <Route path="order/:id" element={<UpdateOrder />} />
                
                {/* Categories page */}
                <Route path="categories" element={<Categories />} />
                
                {/* Add Category page */}
                <Route path="addcategory" element={<AddCategory />} />
                
                {/* Update Category page */}
                <Route path="category/:id" element={<UpdateCategory />} />
                
                {/* All Products page */}
                <Route path="products" element={<AllProducts />} />
                
                {/* Add Product page */}
                <Route path="addproduct" element={<AddPoduct />} />
                
                {/* Update Product page */}
                <Route path="product/:id" element={<UpdateProduct />} />
                
                {/* Users page */}
                <Route path="users" element={<Users />} />
                
                {/* Add User page */}
                <Route path="adduser" element={<AddUser />} />
                
                {/* Update User page */}
                <Route path="user/:id" element={<UpdateUser />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </SearchProvider>
    </ShoppingCartProvider>
  );
}

// Exporting the App component
export default App;
