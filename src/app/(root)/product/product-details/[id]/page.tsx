import { Metadata } from "next";
import { Product } from "../../../../../../typing";
import AddToCart from "./add-cart";
import { ImgCard } from "@/Shared/ImgCard";

// Skip pre-rendering all products at build time
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Generate static params with error handling
export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.warn("Failed to fetch products for static generation");
      return []; // Return empty array to skip pre-rendering
    }

    const products: Product[] = await res.json();

    // Only pre-render first 10 products to avoid build timeout
    return products.slice(0, 10).map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return []; // Return empty array on error
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        title: "Product Not Found | ShopNest",
        description: "The requested product could not be found.",
      };
    }

    const product: Product = await res.json();

    return {
      title: `${product.title} | ShopNest`,
      description: product.description.slice(0, 150),
      openGraph: {
        title: product.title,
        description: product.description?.slice(0, 150),
        images: [product.image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product | ShopNest",
      description: "Shop our amazing products",
    };
  }
}

// Product Details Page with error handling
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;

    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return (
        <section className="max-w-6xl mx-auto px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </section>
      );
    }

    const product: Product = await res.json();

    return (
      <section>
        <h1 className="text-center pt-10 lg:pt-16 text-4xl text-indigo-500 pb-10 font-bold lg:text-5xl">
          Product Details
        </h1>

        <div className="max-w-6xl mx-auto  lg:pt-10 mb-10 px-8 grid grid-cols-1 md:grid-cols-2 md:rounded-2xl md:border lg:grid-cols-3 gap-16">
          {/* Product Image */}

          <div className="w-fit">
            <ImgCard product={product} />
          </div>

          {/* Product Details */}
          <div className="space-y-4 col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-500 font-semibold uppercase text-sm tracking-widest">
                  {product?.brand}
                </p>
                <h1 className="text-3xl font-bold">{product?.title}</h1>
              </div>
              <span
                className={`px-3 py-1 rounded-full w-full max-w-fit text-xs font-bold ${product?.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >
                {product?.availabilityStatus}
              </span>
            </div>

            <div className="flex items-center text-gray-500 border-b border-gray-200 pb-3 font-medium">
              <span className="flex items-center bg-yellow-400 text-white px-2 py-0.5 rounded text-sm mr-2">
                {product?.rating} ⭐
              </span>
              <span className="text-sm">
                ({product?.reviews?.length} Customer Reviews)
              </span>
            </div>

            <div className="py-2">
              <h5 className="text-gray-400 font-bold text-sm uppercase">
                Price:
              </h5>
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-bold text-indigo-600">
                  ${product?.price}
                </h3>
                {product?.discountPercentage > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product?.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm py-4 border-t border-gray-100">
              <p>
                <span className="font-bold text-gray-500">Category:</span>{" "}
                <span className="capitalize">{product?.category}</span>
              </p>
              <p>
                <span className="font-bold text-gray-500">SKU:</span>{" "}
                {product?.sku}
              </p>
              <p>
                <span className="font-bold text-gray-500">Shipping:</span>{" "}
                {product?.shippingInformation}
              </p>
              <p>
                <span className="font-bold text-gray-500">Warranty:</span>{" "}
                {product?.warrantyInformation}
              </p>
            </div>

            {/* Add to cart btn */}
            <div className="pt-6">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Error Loading Product
        </h1>
        <p className="text-gray-600">
          Something went wrong while loading this product. Please try again
          later.
        </p>
      </section>
    );
  }
}
