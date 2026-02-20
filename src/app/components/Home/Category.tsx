import React from "react";
import { getAllCategory } from "../../../../Request/request";

export default async function Category() {
  type CategoryType = { name: string; slug: string };

  const categories: CategoryType[] = await getAllCategory();

  return (
    <section className="pt-16 pb-12">
      <h1 className="text-center xl:text-5xl text-indigo-500 uppercase md:text-4xl text-2xl font-bold">
        Available Category
      </h1>

      <div className="mt-12 w-4/5 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => {
          return (
            <div
              className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 duration-500 uppercase font-bold py-12 hover:shadow-2xl bg-indigo-200 "
              key={category.slug}
            >
              <h1> {category?.name} </h1>
            </div>
          );
        })}
      </div>
    </section>
  );
}
