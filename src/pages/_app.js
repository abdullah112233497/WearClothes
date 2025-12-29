import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
// import "@/styles/globals.css";
import '../styles/globals.css';

// import './tailwind.css';

import { useState ,useEffect} from "react";

export default function App({ Component, pageProps }) {
//   const [cart, setCart] = useState({})
//   const [subTotal, setsubTotal] = useState(0)
// useEffect(() => {
//   console.log("Hello")
//   try{
    
//   }
//   catch(err){
//     console.error(error);
//     localStorage.clear()
//   }
//   if (localStorage.getItem("card")){

//     setCart(JSON.parse(localStorage.getItem("cart")))
//   }
  
  
// }, [])

// const saveCart=(myCart)=>{
//   localStorage.setItem("cart",myCart)
// }
//   const addToCart=(itemCode,qty,price,name,size, variant)=>{
// let newCart=cart
// if (itemCode in card){
//   newCart[itemCode].qty=cart[itemCode].qty+qty
// }
// else{
//   newCart[itemCode]={qty:1,price, name,size, variant }
// }
// setCart(newCart)
// saveCart(newCart)
//   }

//   const removeToCart=(itemCode,qty,price,name,size, variant)=>{
// let newCart=cart
// if (itemCode in card){
//   newCart[itemCode].qty=cart[itemCode].qty-qty
// }
// if (newCart["qty"]<=0){
// delete newCart[itemCode]
// }
// setCart(newCart)
// saveCart(newCart)
//   }
  return <> 
<Navbar  />
<Component {...pageProps} />

<Footer/>
</>
}
