import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  console.log(cartItems); // Add this line to log cartItems

  return (
    <>
      <h1>Cart</h1>
      <h3>Added Items : {cartItems.length}</h3>

      <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          // Debug each item to check its structure
          console.log(item.descprtion);
          return (
            <p key={item.id}>{item.title}</p>
          );
        })
      ) : (
        <p>Your cart is empty</p>
      )}
      </div>
    </>
  );
};

export default Cart;
