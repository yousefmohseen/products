import Image from "next/image";

export const dynamic = "force-dynamic";

interface SearchProduct {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
}

async function searchProducts(query: string): Promise<SearchProduct[]> {
  if (!query) return [];

  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.products || [];
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const { q } = await searchParams;   
  const query = q || "";
  const results = await searchProducts(query);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form method="get" className="mb-6 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search products..."
          className="flex-1 border px-4 py-2 rounded"
        />
        <button className="px-4 py-2 bg-black text-white rounded" type="submit">
          Search
        </button>
      </form>

      {query && results.length === 0 && (
        <p className="text-gray-600">No results found for "{query}"</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((p: SearchProduct) => (
          <a key={p.id} href={`/products/${p.id}`} className="border p-4 rounded shadow">
            <Image src={p.thumbnail || ""} alt={p.title} width={400} height={300} loading="lazy" />
            <h2 className="font-bold mt-2">{p.title}</h2>
            <p>${p.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
