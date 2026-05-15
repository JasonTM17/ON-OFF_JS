import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const subscribers = await db.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl">Newsletter</h1>
        <p className="text-sm text-muted mt-1">{subscribers.length} người đăng ký nhận tin</p>
      </div>

      {subscribers.length === 0 ? (
        <p className="text-muted text-sm">Chưa có người đăng ký nào.</p>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/10">
                <th className="text-left p-3 font-medium">#</th>
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-accent/5">
                  <td className="p-3 text-muted">{index + 1}</td>
                  <td className="p-3">{sub.email}</td>
                  <td className="p-3 text-muted">
                    {new Date(sub.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
