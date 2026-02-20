import { CometCard } from "@/components/ui/comet-card";
import { Props } from "../../../../typing";

export function ImgCard({ product }: Props) {
  return (
    <CometCard>
      <button
        type="button"
        className=" flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-indigo-200 p-2  md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px] bg-indigo-400 object-cover contrast-75"
              alt={product?.title || "Product Image"}
              src={product?.images[0]}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-black">
          <div className="text-xs">{product?.brand}</div>
          <div className="text-xs text-gray-900 opacity-50">
            ${product?.price}
          </div>
        </div>
      </button>
    </CometCard>
  );
}
