"use client";

import { WobbleCard } from "@/components/ui/wobble-card";
import React from "react";

export function AdCard() {
  return (
    <div className="grid grid-cols-1 mb-20 lg:grid-cols-3 gap-4 w-11/12 2xl:w-9/12 mx-auto ">
      {/* Featured Product: Electronics/Audio */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-yellow-600 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Immersive Sound, Redefined
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Experience the new Sonic-X Wireless Headphones. Over 40 hours of 
            battery life and industry-leading noise cancellation.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop"
          width={500}
          height={500}
          alt="Premium Headphones"
          className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>

      {/* Seasonal Sale / Flash Deal */}
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-pink-700">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Summer Flash Sale!
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Get up to **50% OFF** on all summer essentials. Limited time only, 
          while stocks last.
        </p>
      </WobbleCard>

      {/* Lifestyle / Membership */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-indigo-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[400px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Join the Elite Club for Exclusive Early Access
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Members get free shipping, birthday rewards, and first dibs on 
            limited edition sneaker drops.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop"
          width={500}
          height={500}
          alt="Limited Edition Sneakers"
          className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}