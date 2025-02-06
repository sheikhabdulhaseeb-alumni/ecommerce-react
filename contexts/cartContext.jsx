import React, { createContext, useState } from "react";

// Step 1: Create the context
export const CartContext = createContext();

// Step 2: Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    email: "",
    contact_no: ""
  });

  const fetchProducts = () => {
    // fetch product from dummy json
    fetch(`${process.env.API_URL}/product`, {
      headers: {
        token: process.env.API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  };

  const getProductByCategory = (category) => {
    fetch(`${process.env.API_URL}/product?category_id=${category}`, {
      headers: {
        token: process.env.API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  };

  // A function to add items to the cart
  // const addToCart = (item) => {
  //   // update  item  quantity  in cartItems
  //   const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  //   if (existingItem) {
  //     existingItem.quantity += item?.quantity || 1;
  //     if (existingItem.quantity <= 0) {
  //       removeFromCart(existingItem.id);
  //     }
  //   } else {
  //     // add new item to cart
  //     item.quantity = 1;
  //     setCartItems([...cartItems, item]);
  //   }
  // };
  const addToCart = (item) => {
    // update  item  quantity  in cartItems
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item?.quantity || 1;
      if (existingItem.quantity <= 0) {
        removeFromCart(existingItem.id);
      }
    } else {
      // add new item to cart
      item.quantity = 1;
      setCartItems([...cartItems, item]);
    }
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  }

  // A function to remove items from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.product_id !== id));
  };

  // Step 3: Provide cart data and actions to child components
  return (
    <CartContext.Provider
      value={{
        products,
        cartItems,
        shippingDetails,
        setShippingDetails,
        addToCart,
        handleDetailsChange,
        removeFromCart,
        fetchProducts,
        getProductByCategory,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
