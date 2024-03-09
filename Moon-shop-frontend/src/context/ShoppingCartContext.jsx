// ShoppingCartContext.jsx

// Importing necessary React hooks and functions
import { createContext, useContext, useEffect, useState } from "react";

// Creating a context for the shopping cart
const ShoppingCartContext = createContext({});
// Fetching initial cart items from local storage or initializing as an empty array
const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

// ShoppingCartProvider component to wrap around the application and provide shopping cart functionality
const ShoppingCartProvider = ({ children }) => {
  // State to manage the visibility of the shopping cart
  const [isOpen, setIsOpen] = useState(false);
  // State to store the current cart items, initialized with the fetched data or an empty array
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Effect to update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculating the total quantity of items in the cart
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // Functions to handle cart actions
  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };
  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Providing shopping cart related states and functions to the components using this context
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        clearCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

// Exporting the ShoppingCartProvider component and a custom hook to access the shopping cart context
export default ShoppingCartProvider;
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
