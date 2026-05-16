import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import AdminNav from "./_components/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border flex flex-col">
        <div className="px-4 py-5 border-b border-border">
          <Link href="/admin" className="font-serif text-lg tracking-wide">
            ON/OFF Admin
          </Link>
        </div>
        <div className="flex-1 px-2 py-4">
          <AdminNav />
        </div>
        <div className="px-4 py-4 border-t border-border">
          <Link href="/" className="text-xs text-muted hover:text-foreground">
            ← Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 bg-background">
        {children}
      </main>
    </div>
  );
}
