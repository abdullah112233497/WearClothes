import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Slug() {
  const router = useRouter()
  const { slug, price, src, category } = router.query

  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [allColors, setAllColors] = useState([])
  const [allSizes, setAllSizes] = useState([])
  const [pin, setPin] = useState("")
  const [service, setservice] = useState()

  // ✅ Fetch product by slug
  useEffect(() => {
    if (!slug) return
    const fetchProduct = async () => {
      const res = await fetch("/api/getproducts")
      const data = await res.json()
      const prod = data.products.find(p => p.slug === slug)
      if (!prod) return
      setProduct(prod)

      if (prod.variants) {
        setAllColors([...new Set(prod.variants.filter(v => v.qty > 0).map(v => v.color))])
        setAllSizes([...new Set(prod.variants.filter(v => v.qty > 0).map(v => v.size))])
      }
    }
    fetchProduct()
  }, [slug])

  // 🔹 Handle color selection
  const handleColorChange = (color) => {
    if (!product) return

    // 🔁 Toggle logic
    setSelectedColor(prev => (prev === color ? "" : color))

    router.replace(router.asPath, undefined, { scroll: false })
  }



  // 🔹 Handle size selection
  const handleSizeChange = (size) => {
    if (!product) return
    setSelectedSize(size)
    router.replace(router.asPath, undefined, { scroll: false })
  }


  // 🔹 Compute visible sizes for dropdown
  const availableSizes = selectedColor
    ? [...new Set(product.variants.filter(v => v.color === selectedColor && v.qty > 0).map(v => v.size))]
    : allSizes

  // 🔹 Compute visible colors for buttons
  const visibleColors = allColors


  // 🔹 Pincode check
  const onChangePin = (e) => setPin(e.target.value)
  const checkserviceability = async () => {
    const pins = await fetch("/api/pincode")
    const pinJson = await pins.json()
    if (pinJson.includes(parseInt(pin))) setservice(true)
    else setservice(false)
  }

  // 🔹 Add to Cart
  const addProductToCart = () => {
    if (!slug || !price || !src) {
      alert("Product not ready yet. Please try again!")
      return
    }

    const productItem = {
      name: slug,
      price: price.replace("Rs. ", "").replace(",", ""),
      src,
      category,
      size: selectedSize,
      quantity: 1,
    }

    let cart = []
    if (localStorage.getItem("cart")) cart = JSON.parse(localStorage.getItem("cart"))

    const index = cart.findIndex(p => p.name === productItem.name)
    if (index !== -1) cart[index].quantity += 1
    else cart.push(productItem)

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))
    window.dispatchEvent(new Event("openCartDrawer"))
  }

  if (!product) return <p className="text-center py-24">Loading Product...</p>

  // 🔹 Check if product is out of stock
  const isOutOfStock = product?.availableQty === 0

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap lg:flex-nowrap">

          <img
            alt={slug}
            className="lg:w-1/2 w-full object-cover object-top rounded max-h-[500px]"
            src={src}
          />


          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{category}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {slug}
              {(selectedColor || selectedSize) && (
                <span className="text-gray-500 text-lg ml-2">
                  (
                  {selectedColor || "—"} / {selectedSize || "—"}
                  )
                </span>
              )}
            </h1>


            {/* Description */}
            <p className="leading-relaxed max-h-[300px] overflow-y-auto">{product?.desc}</p>


            {/* Out of Stock Label */}
            {isOutOfStock && (
              <div className="mt-4 text-red-600 font-bold text-xl">
                Out of Stock
              </div>
            )}

            {/* Only show interactive elements if in stock */}
            {!isOutOfStock && (
              <>
                {/* Colors + Sizes */}
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="mr-5">Color: </div>
                  {/* Colors */}
                  <div className="flex space-x-2">
                    {visibleColors.map((color, idx) => (
                      <div key={color} className="relative">
                        <button
                          onClick={() => handleColorChange(color)}
                          className={`border-2 border-gray-300 rounded-full w-6 h-6 ${color.toLowerCase() === 'indigo' ? 'bg-indigo-500' : color.toLowerCase() === 'gray' || color.toLowerCase() === 'black' ? 'bg-gray-700' : ''}`}
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></button>

                        {/* Tick overlay */}
                        {selectedColor === color && (
                          <svg
                            className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sizes Dropdown */}
                  <div className="ml-4">
                    <select
                      className="border px-2 py-1 rounded"
                      value={selectedSize}
                      onChange={(e) => handleSizeChange(e.target.value)}
                    >
                      <option value="">Select Size</option>
                      {availableSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price + Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="title-font font-medium text-xl sm:text-2xl text-gray-900">{price}</span>
                  <div className="flex flex-col sm:flex-row sm:ml-auto gap-2 w-full sm:w-auto">
                    <button className="w-full sm:w-auto text-white bg-indigo-500 py-2 px-6 rounded">Buy Now</button>
                    <button
                      onClick={addProductToCart}
                      className="w-full sm:w-auto text-white bg-indigo-500 py-2 px-6 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Pincode */}
                <div className="pin mt-6 flex space-x-2 text-sm">
                  <input
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your Pincode"
                    className="px-2 border-2 border-gray-300 rounded-sm"
                    type="text"
                  />
                  <button
                    onClick={() => {
                      const check = async () => {
                        const pins = await fetch("/api/pincode")
                        const pinJson = await pins.json()
                        if (pinJson.includes(parseInt(pin))) setservice(true)
                        else setservice(false)
                      }
                      check()
                    }}
                    className="text-white bg-indigo-500 py-2 px-6 rounded"
                  >
                    Check
                  </button>
                </div>
              </>
            )}

            {(!service && service != null) && (
              <div className="text-red-700 text-sm">
                Sorry! we don't deliver to this pincode
              </div>
            )}
            {(service && service != null) && (
              <div className="text-green-700 text-sm">
                Yay! This pincode is serviceable
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
