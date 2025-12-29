import React, { useEffect, useState } from "react";
import Link from "next/link";

const TShirts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/getproducts");
      const data = await res.json();

      // ✅ ONLY TSHIRTS
      const tshirts = data.products.filter(
        (product) => product.category.toLowerCase() === "tshirt"
      );

      setProducts(tshirts);
    };

    fetchProducts();
  }, []);

  // ✅ IF NO PRODUCTS → SHOW NOTHING
  if (products.length === 0) {
    return (
      <section className="text-center py-24 text-gray-500">
        No T-Shirts available
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">

          {products.map((product) => (
            <Link
              key={product._id}
              href={{
                pathname: "/product/[slug]",
                query: {
                  slug: product.slug,
                  price: `Rs. ${product.price}`,
                  src: product.img,
                  category: product.category,
                  size: product.size,
                },
              }}
            >
       <div className="w-full shadow-lg px-6 py-5 max-w-[280px] h-[420px] flex flex-col cursor-pointer">



                {/* IMAGE */}
             <div className="relative bg-white rounded overflow-hidden flex items-center justify-center h-48 w-full">

                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-full w-full object-contain"

                  />
                </div>

                {/* TEXT */}
                <div className="mt-4 text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest mb-1">
                    {product.category}
                  </h3>

                  <h2 className="text-gray-900 text-lg font-medium truncate">
                    {product.title}
                  </h2>

                  <p className="mt-1">Rs. {product.price}</p>


<div className="mt-2">
  {product.availableQty > 0 ? (
    <>
      {/* COLORS */}
      <div className="flex mt-2 space-x-1">
        {[...new Set(
          product.variants
            .filter(v => v.qty > 0)
            .map(v => v.color)
        )].map(color => (
          <span
            key={color}
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: color.toLowerCase() }}
          ></span>
        ))}
      </div>

      {/* SIZES */}
      <div className="flex mt-2 space-x-2">
        {[...new Set(
          product.variants
            .filter(v => v.qty > 0)
            .map(v => v.size)
        )].map(size => (
          <span
            key={size}
            className="border px-2 py-0.5 text-xs rounded"
          >
            {size}
          </span>
        ))}
      </div>
    </>
  ) : (
    // ✅ Out of Stock message if availableQty = 0
    <p className="text-red-500 font-medium mt-2">Out of Stock</p>
  )}
</div>


              {/* <p className="text-xs text-gray-500 mt-1">
                Size: {product.size}
              </p> */}


                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TShirts;
