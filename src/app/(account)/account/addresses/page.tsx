import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Địa chỉ của tôi",
  description: "Quản lý địa chỉ giao hàng của bạn tại ON/OFF.",
  robots: { index: false, follow: false },
};

async function deleteAddress(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const session = await getSession();
  if (!session) redirect("/login");
  await db.address.delete({ where: { id, userId: session.userId } });
  revalidatePath("/account/addresses");
}

async function setDefaultAddress(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const session = await getSession();
  if (!session) redirect("/login");
  await db.address.updateMany({
    where: { userId: session.userId },
    data: { isDefault: false },
  });
  await db.address.update({
    where: { id, userId: session.userId },
    data: { isDefault: true },
  });
  revalidatePath("/account/addresses");
}

export default async function AddressesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const addresses = await db.address.findMany({
    where: { userId: session.userId },
    orderBy: [{ isDefault: "desc" }, { id: "asc" }],
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Địa chỉ của tôi</h1>
        <Link
          href="/account/addresses/new"
          className="text-sm border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Thêm địa chỉ mới
        </Link>
      </div>

      <nav className="flex gap-6 border-b border-border mb-8 text-sm">
        <Link
          href="/account"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Tổng quan
        </Link>
        <Link
          href="/account/orders"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Đơn hàng
        </Link>
        <span className="pb-3 border-b-2 border-foreground font-medium">
          Địa chỉ
        </span>
        <Link
          href="/account/settings"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Cài đặt
        </Link>
      </nav>

      {addresses.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-muted text-sm mb-6">
            Bạn chưa có địa chỉ giao hàng nào
          </p>
          <Link
            href="/account/addresses/new"
            className="text-sm border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
          >
            Thêm địa chỉ đầu tiên
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-border p-5 hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{address.fullName}</span>
                    {address.isDefault && (
                      <span className="text-xs px-1.5 py-0.5 border border-foreground font-medium tracking-wide">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-0.5">{address.phone}</p>
                  <p className="text-sm text-muted">
                    {address.street}, {address.ward}, {address.district},{" "}
                    {address.province}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/account/addresses/${address.id}/edit`}
                    className="text-xs text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                  >
                    Chỉnh sửa
                  </Link>

                  {!address.isDefault && (
                    <form action={setDefaultAddress}>
                      <input type="hidden" name="id" value={address.id} />
                      <button
                        type="submit"
                        className="text-xs text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                      >
                        Đặt mặc định
                      </button>
                    </form>
                  )}

                  <form action={deleteAddress}>
                    <input type="hidden" name="id" value={address.id} />
                    <button
                      type="submit"
                      className="text-xs text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                    >
                      Xóa
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-border">
        <Link
          href="/account"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Quay lại tài khoản
        </Link>
      </div>
    </div>
  );
}
