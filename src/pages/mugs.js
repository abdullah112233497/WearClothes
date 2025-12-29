import React from "react";
import Link from "next/link";
const Mugs = () => {
   const products = [
    { id: "mug1", name: "The Catalyzer Mug", price: "Rs. 12,30", category: "Mugs", src: "https://m.media-amazon.com/images/I/61VSrWLzWyL._AC_SY300_SX300_QL70_FMwebp_.jpg", size:"500ml" },
    { id: "mug2", name: "Shooting Star Mug", price: "Rs. 12,30", category: "Mugs",src: "https://m.media-amazon.com/images/I/61VSrWLzWyL._AC_SY300_SX300_QL70_FMwebp_.jpg", size:"500ml" },
];


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-0 place-items-center">

                    {products.map((product, index) => (
                       <Link
  href={{
    pathname: "/product/[slug]",
    query: {
      slug: product.name,
      price: product.price,
      src: product.src,
      category: product.category,
      size: product.size
    }
  }}
>
<div
                            key={index}
                            className="w-full shadow-lg m-4  px-20 py-5 max-w-[280px]"
                        >
                            {/* IMAGE BOX */}
                            <div className="relative  bg-white rounded overflow-hidden flex items-center justify-center">
                                <img
                                    src={product.src}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="mt-4   text-left">
                                <h3 className="text-gray-500 text-xs  tracking-widest mb-1">
                                    {product.category}
                                </h3>
                                <h2 className="text-gray-900 text-lg font-medium truncate">
                                    {product.name}
                                </h2>

                                <p className="mt-1 ">{product.price}</p>
                            </div>
                              <h3 className="text-gray-500 text-xs  tracking-widest mb-1">
                                    {product.size}
                                </h3>
                        </div></Link>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Mugs;
