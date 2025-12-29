import React from 'react'
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import Link from 'next/link';
const Checkout = () => {

const [products, setProducts] = useState([]);

const [cart, setCart] = useState([]);
useEffect(() => {
  const loadCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setProducts(JSON.parse(cart));
    } else {
      setProducts([]);
    }
  };

  loadCart();

  window.addEventListener("cartUpdated", loadCart);
  window.addEventListener("storage", loadCart);

  return () => {
    window.removeEventListener("cartUpdated", loadCart);
    window.removeEventListener("storage", loadCart);
  };
}, []);

const increaseQty = (index) => {
  const updated = [...products];
  updated[index].quantity += 1;
  setProducts(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
  window.dispatchEvent(new Event("cartUpdated"));
};

const decreaseQty = (index) => {
  const updated = [...products];
  if (updated[index].quantity > 1) {
    updated[index].quantity -= 1;
    setProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  }
};


const subtotal = products.reduce((total, item) => {
  const price = Number(item.price.replace("Rs. ", "").replace(",", ""));
  return total + price * item.quantity;
}, 0);

  return (
    <div>
<section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">Checkout</h1>
      
       
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">WearClothes - offers the affordable prices and reliable delivery serivces.</p>
    </div>
      
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                 <h2 className="sm:text-lg text-left text-lg font-medium title-font mb-4 text-gray-900">1. Delivery details</h2>

      <div className="flex flex-wrap -m-2">
                 <div className="p-2 w-1/2">
                 
          <div className="relative">
            <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
    
        <div className="p-2 w-full">
          <div className="relative">
            <label for="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
    <div className="p-2 w-1/2">
          <div className="relative">
            <label for="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="number" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label for="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
         <div className="p-2 w-1/2">
          <div className="relative">
            <label for="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label for="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="number" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors durati
            on-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full pt-10">
           <h2 className="sm:text-lg text-lg font-medium title-font mb-4 text-gray-900">2. Review Cart items & Pay</h2>

{products.length === 0 ? (
  <p className="text-gray-500 text-sm">Your cart is empty.</p>
) : (
  <ul className="divide-y">
    {products.map((item, index) => (
      <li key={index} className="flex items-center py-4">
        <img src={item.src} className="w-16 h-16 rounded object-cover" />
        <div className="ml-4 flex-1">
          <p className="font-medium">{item.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => decreaseQty(index)} className="px-2 bg-gray-200">-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(index)} className="px-2 bg-gray-200">+</button>
          </div>
        </div>
        <p>{item.price}</p>
      </li>
    ))}
  </ul>
)}
{products.length > 0 && (
  <div className="flex justify-between font-semibold mt-4 border-t pt-4">
    <span>Subtotal</span>
    <span>Rs. {subtotal}</span>
  </div>
)}















         <button className="flex items-center justify-center gap-2 mx-auto text-white bg-indigo-500 border-0 py-2 my-10 shadow-lg px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
  <FaShoppingBag className="text-xl" />
<Link href={"/order"}>

  <span>Pay Rs. {subtotal}</span>
</Link>

</button>

        </div>
        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
          <a className="text-indigo-500">wearclothes@email.com</a>
          <p className="leading-normal my-5">49 Smith St.
            <br/>Saint Cloud, MN 56301
          </p>
          <span className="inline-flex">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-4 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-4 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-4 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Checkout
