import { useState, createContext, useContext, useEffect } from "react";

// import { initiateCheckout } from "../lib/payments.js";

// import products from "../../shared/products.json";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config.js";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);
  const [loading, setloading] = useState(true);

  /**
   * @lesson-11-solution Exercise 3
   * With our state stored as a string, we can grab that
   * value right from our browser, try to parse that
   * JSON value, and update our cart state.
   */

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("spacejelly_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

  /**
   * @lesson-11-solution Exercise 2
   * Using the browser's localStorage API, we can turn
   * our cart state into a JSON string and save that data
   * right to the browser!
   */

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("spacejelly_cart", data);
  }, [cart]);
  let temp;

  const cartItems = Object.keys(cart.products).map(async (key) => {
    const res = await httpClient.get(`/course/info?course_id=1`);
    temp = res.data[0].monthly_fee;

    return {
      ...cart.products[key],
      pricePerUnit: temp,
    };
  });

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + pricePerUnit * quantity;
    },
    0
  );

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  function addToCart({ id }) {
    updateCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cart;
    });
  }

  // function checkout() {
  //   initiateCheckout({
  //     lineItems: cartItems.map(({ id, quantity }) => {
  //       return {
  //         price: id,
  //         quantity,
  //       };
  //     }),
  //   });
  // }

  return {
    cart,
    subtotal,
    quantity,
    addToCart,
    // checkout,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
