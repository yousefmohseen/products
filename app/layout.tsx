import { cookies } from "next/headers";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const isAdmin = token === "valid-user";
  return (
    <html lang="en">
      <body className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <nav className="flex flex-col gap-3">
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/search" className="hover:underline">Search</Link>
            {isAdmin && (
              <Link href="/admin" className="hover:underline">Admin Panel</Link>
            )}
          </nav>

          {isAdmin && (
            <div className="mt-6 p-3 bg-gray-800 rounded">
              <p className="font-semibold">Logged in as:</p>
              <p>Admin User</p>
            </div>
          )}

          {isAdmin && (
            <form action="/logout" method="post" className="mt-4">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
              >
                Logout
              </button>
            </form>
          )}
        </aside>

        <main className="overflow-y-scroll flex-1 p-6 bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
