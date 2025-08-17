import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // ✅ import cart context

function Cards({ item }) {
  const { cartItems, addToCart, updateCart } = useCart(); // ✅ use cart context
  const [quantity, setQuantity] = useState(0);

  // 🧠 Sync local quantity with global cart (for persistency)
  useEffect(() => {
    const foundItem = cartItems.find((cartItem) => cartItem.id === item.id);
    setQuantity(foundItem ? foundItem.quantity : 0);
  }, [cartItems, item.id]);

  const handleBuyNow = () => {
    setQuantity(1);
    addToCart(item, 1); // ✅ add to cart context
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(item.id, newQuantity); // ✅ update global cart
  };

  const decrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    updateCart(item.id, newQuantity); // ✅ update global cart
  };

  return (
    <div className='mt-4 my-4'>
      <div className="card bg-base-100 w-96 shadow-xl hover:scale-105 duration-300">
        <figure>
          <img
            src={item.image}
            alt="Product"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.description}</p>
          <div className="card-actions justify-between items-center">
            <div className="badge badge-outline hover:scale-110">
              Rs.{item.price}
            </div>

            {quantity === 0 ? (
              <div
                className="badge badge-outline hover:bg-red-600 hover:text-white duration-300 cursor-pointer"
                onClick={handleBuyNow}
              >
                Buy Now
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={decrement}
                  className="bg-red-500 text-white w-6 h-6 rounded hover:bg-red-600"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={increment}
                  className="bg-green-500 text-white w-6 h-6 rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
