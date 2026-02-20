"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Image from "next/image";
import Link from "next/link";
import { addItem, CartItem, removeItem } from "../../../../store/cartSlice";
import { ShoppingCart } from "lucide-react";
import ModalForm from "./ModalForm";

type Props = {
  items: CartItem[];
};

export default function CheckoutPage() {
  //all cart item
  const items = useSelector((state: RootState) => state.cart.items);

  // total quantity
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  // calculate the total price

  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const dispatch = useDispatch();

  // btn function
  const handleAddCart = (item: CartItem) => dispatch(addItem(item));
  const handleRemoveCart = (id: number) => dispatch(removeItem({ id }));

  return (
    <div className="my-12 min-h-[60vh]">
      {items.length == 0 ? (
        <div className="flex items-center w-full  flex-col justify-center">
          {/* if empty items */}
          <Image
            src="/Empty-rafiki.svg"
            alt="empty_cart"
            width={500}
            height={500}
            className="object-cover mx-auto"
          />

          <h1 className=" text-2xl text-indigo-500 lg:text-4xl font-bold">
            Your cart is currently empty.
          </h1>
          <Link href="/">
            <button className="px-6 py-2 mt-6 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-800 transition">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        // items data show
        <div className="md:w-4/5 mx-auto w-[90%] grid grid-cols-1 gap-12">
          <div className="rounded-lg overflow-hidden bg-indigo-400  shadow-md ">
            <h1 className="text-2xl lg:text-4xl font-bold text-white flex items-center gap-4 p-6 ">
              {" "}
              <ShoppingCart size={30}></ShoppingCart>({totalQuantity}) Items in
              Your Cart
            </h1>
          </div>
          {items.map((item) => {
            return (
              <div key={item.id}>
                {/* product details */}
                <div className="flex flex-col lg:flex-row items-center border p-5 rounded-2xl shadow lg:h-80 gap-8 lg:gap-12">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={200}
                    height={50}
                    className="object-cover max-h-72 "
                  />
                  <div className="mr-auto">
                    {/* product title */}
                    <h3 className="text-xl lg:text-2xl line-clamp-1 font-bold ">
                      {item.title}
                    </h3>

                    {/* product price */}
                    <h3 className="text-xl lg:text-2xl my-2 font-bold text-indigo-500 ">
                      ${(item?.price * item.quantity).toFixed(2)}
                    </h3>

                    {/* product quantity */}
                    <h1 className=" lg:text-2xl">Quantity: {item.quantity}</h1>

                    {/* btn */}
                    <div className="mt-4 flex gap-6">
                      {/* item remove btn in cart */}
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveCart(item.id);
                        }}
                        className=" cursor-pointer text-sm hover:bg-red-700 duration-500 bg-red-500 rounded text-white px-4 py-2"
                      >
                        Remove
                      </button>

                      {/* item add btn in cart */}
                      <button
                        type="button"
                        onClick={() => {
                          handleAddCart(item);
                        }}
                        className=" cursor-pointer text-sm hover:bg-indigo-700 duration-500 bg-indigo-500 rounded  text-white px-4 py-2"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* total order section */}
          <section className="bg-indigo-900 rounded-2xl text-center py-10 px-6 text-white">
            <h1 className="border-b-2 border-gray-400 pb-4 text-2xl font-bold ">
              Your Total Oder
            </h1>
            <h1 className="pt-4 overflow-x-hidden text-2xl">
              {" "}
              Total Amount: ${totalPrice}
            </h1>

            {/* modal open */}
            <ModalForm totalItems={totalQuantity} totalAmount={totalPrice} />
          </section>
        </div>
      )}
    </div>
  );
}
