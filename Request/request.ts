export async function getAllCategory() {
    const categoryRes = await fetch('https://dummyjson.com/products/categories')

    return categoryRes.json()

}

export async function getAllProduct() {
    const ProductRes = await fetch('https://dummyjson.com/products')

    return ProductRes.json()
}