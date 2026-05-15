import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl">Tin nhắn liên hệ</h1>
        <p className="text-sm text-muted mt-1">
          {messages.length} tin nhắn
          {unreadCount > 0 && (
            <span className="ml-2 text-xs px-2 py-0.5 bg-red-100 text-red-700">
              {unreadCount} chưa đọc
            </span>
          )}
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted text-sm">Chưa có tin nhắn nào.</p>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/10">
                <th className="text-left p-3 font-medium">Trạng thái</th>
                <th className="text-left p-3 font-medium">Người gửi</th>
                <th className="text-left p-3 font-medium">Chủ đề</th>
                <th className="text-left p-3 font-medium">Nội dung</th>
                <th className="text-left p-3 font-medium">Ngày gửi</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`border-b border-border last:border-0 hover:bg-accent/5 ${
                    !msg.isRead ? "bg-accent/5" : ""
                  }`}
                >
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-0.5 ${
                        msg.isRead
                          ? "bg-gray-100 text-gray-500"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {msg.isRead ? "Đã đọc" : "Chưa đọc"}
                    </span>
                  </td>
                  <td className="p-3">
                    <p className={msg.isRead ? "" : "font-medium"}>{msg.name}</p>
                    <p className="text-xs text-muted">{msg.email}</p>
                    {msg.phone && (
                      <p className="text-xs text-muted">{msg.phone}</p>
                    )}
                  </td>
                  <td className="p-3 text-muted">{msg.subject ?? "—"}</td>
                  <td className="p-3 max-w-xs">
                    <p className="truncate text-muted">{msg.message}</p>
                  </td>
                  <td className="p-3 text-muted whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString("vi-VN", {
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
