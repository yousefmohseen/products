export default async function AdminPage() {
  const productsRes = await fetch("https://dummyjson.com/products?limit=0", {
    cache: "no-store",
  });
  const productsData = await productsRes.json();

  const commentsRes = await fetch("https://dummyjson.com/comments?limit=0", {
    cache: "no-store",
  });
  const commentsData = await commentsRes.json();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Total Products</h2>
          <p className="text-2xl">{productsData.total}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Total Comments</h2>
          <p className="text-2xl">{commentsData.total}</p>
        </div>
      </div>
    </div>
  );
}
