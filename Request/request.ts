export async function getAllCategory() {
    const categoryRes = await fetch('https://dummyjson.com/products/categories')

    return categoryRes.json()

}

export const getAllProduct = async (limit: number, skip: number) => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  return res.json();
};