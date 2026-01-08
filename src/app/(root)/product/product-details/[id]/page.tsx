// import Image from "next/image";
// import { Metadata } from "next";
// import { Product } from "../../../../../../typing";
// import AddToCart from "./add-cart";

// //  Params for SSG
// export async function generateStaticParams() {
//   const res = await fetch("https://fakestoreapi.com/products");
//   const products: Product[] = await res.json();

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

// export async function generateMetadata({ params }: { params: Promise< { id: string }> })
// : Promise<Metadata> {
//    const {id} = await params
//   const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//   const product: Product = await res.json();

//   return {
//     title: `${product.title} | ShopNest`,
//     description: product.description.slice(0, 150),
//     openGraph: {
//       title: product.title,
//       description: product.description?.slice(0, 150),
//       images: [product.image],
//     },
//   };
// }

// // product Details Page
// export default async function ProductDetails({ params }: { params: Promise< { id: string }> }) {

//   const {id} = await params

//   const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
//     cache: "force-cache",
//   });
//   const product: Product = await res.json();

//   return (
//     <section>
//     <h1 className="text-center pt-10 lg:pt-16 text-4xl text-indigo-500 pb-10 font-bold lg:text-5xl">Product Details Page</h1>
//      <div className="max-w-6xl mx-auto pb-20 lg:pt-30 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
      
//       {/* img */}
//       <div className="flex col-span-1 items-center hover:scale-110 duration-500 justify-center">
//         <Image
//           src={product?.image}
//           alt={product.title}
//           width={400}
//           height={400}
//           className="object-contain max-h-[400px]"
//         />
//       </div>

//       {/* product details  */}
//       <div className="space-y-4 col-span-2">
//         <h1 className="text-3xl font-bold">{product?.title}</h1>

//         <div className="text-gray-500 border-b border-gray-300 pb-3 font-medium">
//           Rating: {product?.rating.rate} ⭐ ({product?.rating.count} reviews)
//         </div>
//         <h5 className="-mb-1 font-bold text-gray-400">Price:</h5>
//         <h3 className="text-4xl font-bold text-indigo-600">${product?.price}</h3>
//         <p className="text-gray-400 text-sm ">{product?.description}</p>
//         <p>
//           {" "}
//           Category: <span className="capitalize">{product?.category}</span>
//         </p>

//         {/* add to cart btn */}
//         <AddToCart product={product}></AddToCart>
//       </div>
//     </div>
//     </section>
   
//   );
// }


import Image from "next/image";
import { Metadata } from "next";
import { Product } from "../../../../../../typing";
import AddToCart from "./add-cart";

// Skip pre-rendering all products at build time
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate static params with error handling
export async function generateStaticParams() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      console.warn('Failed to fetch products for static generation');
      return []; // Return empty array to skip pre-rendering
    }
    
    const products: Product[] = await res.json();
    
    // Only pre-render first 10 products to avoid build timeout
    return products.slice(0, 10).map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return []; // Return empty array on error
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return {
        title: 'Product Not Found | ShopNest',
        description: 'The requested product could not be found.',
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
    console.error('Error generating metadata:', error);
    return {
      title: 'Product | ShopNest',
      description: 'Shop our amazing products',
    };
  }
}

// Product Details Page with error handling
export default async function ProductDetails({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  try {
    const { id } = await params;

    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
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
          Product Details Page
        </h1>
        <div className="max-w-6xl mx-auto pb-20 lg:pt-30 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* img */}
          <div className="flex col-span-1 items-center hover:scale-110 duration-500 justify-center">
            <Image
              src={product?.image}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain max-h-[400px]"
            />
          </div>

          {/* product details */}
          <div className="space-y-4 col-span-2">
            <h1 className="text-3xl font-bold">{product?.title}</h1>

            <div className="text-gray-500 border-b border-gray-300 pb-3 font-medium">
              Rating: {product?.rating.rate} ⭐ ({product?.rating.count} reviews)
            </div>
            <h5 className="-mb-1 font-bold text-gray-400">Price:</h5>
            <h3 className="text-4xl font-bold text-indigo-600">
              ${product?.price}
            </h3>
            <p className="text-gray-400 text-sm">{product?.description}</p>
            <p>
              Category: <span className="capitalize">{product?.category}</span>
            </p>

            {/* add to cart btn */}
            <AddToCart product={product} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Error Loading Product
        </h1>
        <p className="text-gray-600">
          Something went wrong while loading this product. Please try again later.
        </p>
      </section>
    );
  }
}
