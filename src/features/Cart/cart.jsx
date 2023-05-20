import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const savedCartItems = getSavedCartItems();
      if (savedCartItems) {
        setCartItems(savedCartItems);
      }
      setIsInitialized(true);
    } else {
      saveCartItems(cartItems);
    }
  }, [cartItems, isInitialized]);

  useEffect(() => {
    const savedCartItems = getSavedCartItems();
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };

  const saveCartItems = (items) => {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  };

  const getSavedCartItems = () => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const handleAddToCart = () => {
    addToCart({ id: 1, name: "Product 1", price: 10 });
  };
  const handleAddToCart2 = () => {
    addToCart({ id: 2, name: "Product 2", price: 20 });
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} USD
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleAddToCart2}>Add to Cart2</button>
    </div>
  );
};

export default Cart;
