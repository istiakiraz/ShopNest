"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../typing";
import { getAllProduct } from "../../../../Request/request";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * itemsPerPage;
        const data = await getAllProduct(itemsPerPage, skip);

        if (data && data.products) {
          setProducts(data.products);
          setTotalProducts(data.total);
        }
      } catch (error) {
        console.log("Error logic:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <section id="products" className="pt-16 pb-12">
      <h1 className="text-center xl:text-5xl text-indigo-500 uppercase md:text-4xl text-2xl font-bold">
        All Products
      </h1>

      <div className="w-4/5 mx-auto gap-8 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products?.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>

      {/* shadcn pagination UI */}
      <div className="mt-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none  opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;

              if (pageNumber <= 5) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
