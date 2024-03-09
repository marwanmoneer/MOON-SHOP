// SearchContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

// Creating a context to manage search-related state
const SearchContext = createContext();

// SearchProvider component to wrap around the application and provide search functionality
export const SearchProvider = ({ children }) => {
  // State for the search query
  const [query, setQuery] = useState("");
  // State to store the filtered products based on the search query
  const [filteredProducts, setFilteredProducts] = useState([]);
  // State to store all products fetched from the API
  const [products, setProducts] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make a GET request to fetch products
        const response = await axios.get("/api/products");
        // Set the products state with the fetched data
        setProducts(response.data);
      } catch (error) {
        // Handle errors during the API request
        if (error.response) {
          console.log(error?.response?.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };
    // Invoke the fetchProducts function
    fetchProducts();
  }, []);

  // Function to handle search queries and update the filtered products state
  const handleSearch = (query) => {
    // Update the query state with the provided search value
    setQuery(query);

    // Filter products based on the search query
    const filteredProducts = products.filter((product) => {
      const { name, brand, description, richDescription, category } = product;
      const searchValue = query.toLowerCase();
      return (
        name.toLowerCase().includes(searchValue) ||
        brand.toLowerCase().includes(searchValue) ||
        category.name.toLowerCase().includes(searchValue) ||
        description.toLowerCase().includes(searchValue) ||
        richDescription.toLowerCase().includes(searchValue)
      );
    });

    // Update the filteredProducts state with the filtered results
    setFilteredProducts(filteredProducts);
  };

  // Provide the search-related states and functions to the components using this context
  return (
    <SearchContext.Provider
      value={{ query, setProducts, handleSearch, filteredProducts }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to easily access the search context within components
export const useSearch = () => {
  return useContext(SearchContext);
};
