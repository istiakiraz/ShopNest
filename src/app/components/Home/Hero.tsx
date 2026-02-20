'use client'

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"



const slides = [
  {
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
    description: "Discover the hottest styles for this summer. Shop now and upgrade your wardrobe!",
    image: "/summer-collection-fashion.png",
  },
  {
    title: "Trendy Gadgets",
    subtitle: "Tech Deals",
    description: "Get your hands on the latest tech at unbeatable prices. Limited time only!",
    image: "/trendy-gadgets-deal.png",
  },
  {
    title: "Lifestyle Essentials",
    subtitle: "New Arrivals",
    description: "Explore our curated picks for everyday comfort and style.",
    image: "/lifestyle-essentials.png",
  },
]

export default function Hero() {
  return (
    <section className="w-full bg-indigo-200 py-10 md:py-30">
      <Carousel
      
        opts={{ loop: true }}
        className="w-4/5 2xl:w-8/12  mx-auto"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="flex flex-col md:flex-row cursor-grab items-center gap-8 px-4 md:px-10">

              {/* left Side - Text */}
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-sm md:text-base text-gray-600 font-semibold">{slide.subtitle}</h2>
                <h1 className="text-2xl lg:text-5xl md:text-4xl font-bold text-gray-900 my-3">{slide.title}</h1>
                <p className="text-gray-700 mb-6">{slide.description}</p>
                <button  onClick={() => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  }} className="px-6 py-2 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-800 transition">
                  Shop Now
                </button>
              </div>

              {/* right Side - Image */}
              <div className="md:w-1/2 relative h-60 md:h-96 w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="2xl:flex justify-between hidden  items-center px-4 md:px-10 mt-4">
          <CarouselPrevious  />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  )
}
