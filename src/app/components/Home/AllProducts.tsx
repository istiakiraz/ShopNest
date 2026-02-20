"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../typing";
import { getAllProduct } from "../../../../Request/request";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const getData = async () => {
    setLoading(true);
    try {
      const data = await getAllProduct(); 
      
      
      if (data && data.products) {
        setProducts(data.products); 
      } else {
        setProducts([]); 
      }
      
    } catch (error) {
      console.log("Error logic:", error);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };
  getData();
}, []);

  return <section className="pt-16 pb-12">
<h1 className='text-center xl:text-5xl text-indigo-500 uppercase md:text-4xl  text-2xl font-bold'>
            All Product
        </h1>

  <div className="w-4/5 mx-auto gap-8 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? 
          // user react skeleton as a loader
          Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          :
          // all product 
          products?.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>

  </section>;
}
