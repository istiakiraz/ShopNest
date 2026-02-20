import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react"; 
import { Props } from "../../../../typing";

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white border-t-2 border-l-2 border-r-2 border-indigo-200 rounded-2xl h-[400px] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 w-full p-4 bg-white">
        <Image
          src={product.images[0]} 
          alt={product.title}
          fill
          className="object-contain p-4 mx-auto"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 bg-indigo-200 space-y-2 rounded-t-2xl">
        <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
      
        <div className="flex justify-between items-center">
          <h3 className="capitalize text-xs font-bold border-2 border-indigo-400 rounded w-fit px-2 bg-white/50">
            {product.category}
          </h3>
          <div className="flex items-center text-sm text-gray-700 font-medium">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="ml-1">{product.rating}</span>
            <span className="ml-1 text-gray-500 text-xs">({product.reviews.length})</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 min-h-[32px]">
          {product.description}
        </p>

        <div className="flex justify-between items-end pt-2">
          <div>
            <h5 className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Price</h5>
            <div className="flex flex-col">
               {product.discountPercentage > 0 && (
                <span className="text-xs text-red-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-indigo-700">${product.price}</span>
            </div>
          </div>

          <Link href={`/product/product-details/${product.id}`}>
            <button className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-800 transition-colors shadow-md">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}