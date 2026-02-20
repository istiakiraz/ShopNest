import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Cover } from "@/components/ui/cover";
import Image from "next/image";

export function Discover() {
  return (
    <div className="w-full overflow-hidden">
      <MacbookScroll
        title={
          <span>
            Discover better deals
            <br /> with <Cover>effortless shopping</Cover>
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            <Badge className="h-10 w-10 -rotate-12 transform" />
          </a>
        }
        src={`https://i.ibb.co.com/ynR8jpY9/product-Img.png`}
        showGradient={false}
      />
    </div>
  );
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/shopnest.png"
      alt="shop nest logo"
      className="hover:scale-110 duration-600"
      width={80}
      height={80}
    />
  );
};
