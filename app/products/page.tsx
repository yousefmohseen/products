import Image from "next/image";

export const revalidate = 300;
export const metadata = {
  title: "Products List | Advanced Product Showcase",
  description: "Browse all available products with updated prices and details.",
};


export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 300 },
  });

  const data = await res.json();
  const products = data.products || [];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((p: any) => (
        <div key={p.id} className="border p-4 rounded shadow">
          <a href={`/products/${p.id}`}>
            <Image src={p.thumbnail} alt={p.title} width={400} height={300} loading="lazy" />
            <h2 className="font-bold mt-2">{p.title}</h2>
            <p>${p.price}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
