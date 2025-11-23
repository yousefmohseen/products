export const revalidate = 300;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images?: string[];
  thumbnail?: string;
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products?limit=10");
  const data = await res.json();

  return data.products.map((p: Product) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return {
    title: `${product.title} | Product Details`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

import Image from "next/image";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
   const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-xl font-semibold mb-2">${product.price}</p>
      <p className="mb-4 text-gray-700">{product.description}</p>

      {product.images && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {product.images.map((img: string, i: number) => (
            <Image key={i} src={img} alt={product.title} width={500} height={400} loading="lazy" />
          ))}
        </div>
      )}

      <div className="text-lg mb-4">Rating: ⭐ {product.rating}</div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.title,
            image: product.images,
            description: product.description,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: product.price,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: 120,
            },
          }),
        }}
      />
    </div>
  );
}
