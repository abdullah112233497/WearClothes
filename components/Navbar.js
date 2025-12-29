"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { Dialog, Transition, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";


/* CART PRODUCTS (example data) */
const initialProducts = [
  {
    name: "The Catalyzedfs asd f asdfr",
    price: "Rs. 12,30",
    category: "T-Shirts",
    src: "https://m.media-amazon.com/images/I/61VSrWLzWyL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    size: "S, M, L, XL, XXL",
    quantity: 1,
  },
  { name: "Shooting Stars", price: "Rs. 12,30", category: "T-Shirts", src: "https://m.media-amazon.com/images/I/71eamKG0GRL._AC_SX425_.jpg", size:"S, M, L, XL, XXL", quantity:1 },
  { name: "Neptune", price: "Rs. 12,30", category: "T-Shirts", src: "https://m.media-amazon.com/images/I/71eamKG0GRL._AC_SX425_.jpg", size:"S, M, L, XL, XXL", quantity:1 },
];

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

///////////////////////////////
  useEffect(() => {
  const handleCartUpdate = () => {
    if (localStorage.getItem("cart")) {
      setProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }

  window.addEventListener("cartUpdated", handleCartUpdate)
  return () => window.removeEventListener("cartUpdated", handleCartUpdate)
}, [])

  // 🔹 Load cart from localStorage when Navbar mounts
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  // 🔹 Listen to localStorage changes (in case Add to Cart happens in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("cart")) {
        setProducts(JSON.parse(localStorage.getItem("cart")));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
  const handleOpenCart = () => setOpenCart(true);

  window.addEventListener("openCartDrawer", handleOpenCart);
  return () => window.removeEventListener("openCartDrawer", handleOpenCart);
}, []);


  // subtotal calculation
 const subtotal = products.reduce((total, item) => {
  const price = item?.price?.replace("Rs. ", "") || 0
  return total + Number(price) * (item.quantity || 1)
}, 0)



  // increase quantity
  const increaseQty = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    setProducts(newProducts);
    localStorage.setItem("cart", JSON.stringify(newProducts));
    
  window.dispatchEvent(new Event("cartUpdated")); // ✅ ADD THIS
  };

  // decrease quantity
  const decreaseQty = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
      localStorage.setItem("cart", JSON.stringify(newProducts));
      
    window.dispatchEvent(new Event("cartUpdated")); // ✅ ADD THIS
    }
  };

  return (
    <>
      {/* NAVBAR */}
     <header className="w-full border-b border-gray-200 my-1 shadow-md sticky top-0 z-50 bg-white">

        <div className="max-w-7xl mx-auto px-3 h-10 flex items-center relative">

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden absolute left-4"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="mx-auto md:mx-0 flex items-center gap-2">
            <Image src="/fav_icon_w_bg.png" alt="WearClothes Logo" width={40} height={40} />
            <span className="text-lg font-semibold text-gray-900 font-montserrat">
              WearClothes
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-medium">
            {["Tshirts","Stickers","Hoodies","Mugs"].map((name) => (
              <Link
                key={name}
                href={`/${name.toLowerCase()}`}
                className="relative text-gray-700 hover:text-black transition-colors duration-300
                  before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0
                  before:bg-black before:transition-all before:duration-300
                  hover:before:w-full"
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* CART ICON */}
      <button className="ml-auto flex items-center gap-4">
  
  {/* USER ICON */}
  <Link href={"/login"}>
  <span className="relative px-1 py-1 font-semibold text-black overflow-hidden group">
    <span className="absolute inset-0 bg-white scale-x-0  origin-left transition-transform duration-300"></span>
    <span className="relative flex items-center justify-center">
      <FaRegUser size={20} />
    </span>
  </span>
</Link>
  {/* CART ICON */}
  <span className="md:hidden text-black">
    <MdShoppingCart onClick={() => setOpenCart(true)}  size={24} />
  </span>

  <span className="hidden md:inline-block relative px-0 py-1 font-semibold text-black overflow-hidden group">
    <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
    <span className="relative flex items-center justify-center">
      <MdShoppingCart onClick={() => setOpenCart(true)}  size={24} />
    </span>
  </span>

</button>

        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col items-center py-4 gap-4 text-sm font-medium">
              {["Tshirts","Stickers","Hoodies","Mugs"].map((name, i) => (
                <Link
                  key={i}
                  href={`/${name.toLowerCase()}`}
                  onClick={() => setOpenMenu(false)}
                  className="relative text-gray-700 hover:text-black transition-colors duration-300
                    before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0
                    before:bg-black before:transition-all before:duration-300
                    hover:before:w-full"
                >
                  {name} 
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      <Transition show={openCart} as={React.Fragment}>
        <Dialog onClose={setOpenCart} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="w-screen max-w-md bg-white shadow-xl rounded-l-2xl">
{/* SLIDE CLOSE ARROW */}
<button
  onClick={() => setOpenCart(false)}
  className="
    absolute top-1/2 -translate-y-1/2
    left-10
    z-50
    -translate-x-1/2
    bg-white shadow-lg
    rounded-full
    p-2
    transition-transform duration-500 ease-linear
    hover:scale-110
  "
>
  <ChevronRightIcon
    className={`
      h-6 w-6 text-gray-600
      transform transition-transform duration-500 ease-linear
      ${openCart ? "translate-x-0" : "-translate-x-2"}
    `}
  />
</button>




                    <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">
                          Shopping Cart
                        </DialogTitle>
                        <button onClick={() => setOpenCart(false)}>
                          <XMarkIcon className="size-6 text-gray-500" />
                        </button>
                      </div>

                    {products.length === 0 ? (
  <div className="mt-20 text-center text-gray-500 text-sm">
    No item in the cart. Please add a few items to checkout.
  </div>
) : (
  <ul className="mt-6 divide-y divide-gray-200">
    {products.map((product, index) => (
      <li key={index} className="flex py-4 items-center">
        <img
          src={product.src}
          className="size-20 rounded border object-cover"
          alt=""
        />
        <div className="ml-4 flex-1">
          <p className="font-medium">{product.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => decreaseQty(index)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{product.quantity}</span>
            <button
              onClick={() => increaseQty(index)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
        <p>{product.price}</p>
      </li>
    ))}
  </ul>
)}

                      <div className="mt-auto border-t pt-4">
                        <div className="flex justify-between font-medium">
                          <span>Subtotal</span>
                          <span>Rs. {subtotal}</span>
                        </div>
                       <div className="mt-auto border-t pt-4 flex gap-2">
  <button
    onClick={() => {
      setProducts([]);
      localStorage.removeItem("cart");
      
  window.dispatchEvent(new Event("cartUpdated")); // ✅ ADD THIS
    }}
    className="w-1/2 bg-red-600 text-white py-2 rounded-md"
  >
    Clear Cart
  </button>
<button
  onClick={() => {
    setOpenCart(false); // Close the cart drawer
  }}
  className="w-1/2 bg-indigo-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
>
  <Link href="/checkout" className="flex items-center justify-center gap-2 w-full">
    <MdOutlineShoppingCartCheckout className="text-lg" />
    Checkout
  </Link>
</button>


</div>
                      </div>
                    </div>
                  </DialogPanel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
