import React from "react";
import { addItem, CartItem, removeItem } from "../../../../store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { useDispatch } from "react-redux";

type Props = {
  items: CartItem[];
};

export default function CartSideBar({ items }: Props) {

    const dispatch = useDispatch()

    const handleAddCart = (item: CartItem) => dispatch(addItem(item));

    const handleRemoveCart = (id: number) => dispatch(removeItem({id}));

  return (
    <div  onWheel={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
         className="my-6 h-full">
      <h1 className="text-center font-bold text-2xl text-indigo-500 mb-6">
        {" "}
        Your Cart
      </h1>
      {/* product details */}
      {items.length == 0 ? (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/Empty-rafiki.svg"
            alt="empty_cart"
            width={200}
            height={100}
            className="object-cover mx-auto"
          />
          <h1 className="font-semibold">Your cart is currently empty.</h1>
        </div>
      ) : (
        <div>
          {items?.map((item) => {
            return (
              <div
                key={item.id}
                className=" border-4 border-indigo-100 mb-4 rounded-2xl p-4"
              >

                {/* product details */}
                <div className="flex gap-4">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  <div>
                    {/* product title */}
                    <h3 className="text-sm line-clamp-1 font-bold ">{item.title}</h3>

                    {/* product price */}
                    <h3 className="line-clamp-1 font-bold text-indigo-500 ">${(item?.price * item.quantity).toFixed(2)}</h3>

                {/* product quantity */}
                    <h1 className="text-sm">
                        Quantity: {item.quantity}
                    </h1>
                  </div>
                </div>

                {/* btn */}
                <div className="mt-4 flex gap-6">

                    {/* item remove btn in cart */}
                    <button type="button" onClick={()=>{
                        handleRemoveCart(item.id)
                    }} className=" cursor-pointer text-sm hover:bg-red-700 duration-500 bg-red-500 rounded text-white px-4 py-2" >Remove</button>

                     {/* item add btn in cart */}
                    <button type="button" 
                    onClick={()=>{
                        handleAddCart(item)
                    }} className=" cursor-pointer text-sm hover:bg-indigo-700 duration-500 bg-indigo-500 rounded  text-white px-4 py-2" >Add</button>
                </div>

              </div>
            );
          })}

          <Link href='/checkout'>
          <SheetClose>
            <button className="px-6 min-w-full mt-2 mb-5 py-2 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-800 transition">View All Cart</button>
          </SheetClose>
          </Link>

        </div>
      )}
    </div>
  );
}
