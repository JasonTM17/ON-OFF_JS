"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Profile = {
  name: string;
  email: string;
  phone: string;
};

type NotifPrefs = {
  emailMarketing: boolean;
  orderUpdates: boolean;
  promotions: boolean;
};

const NOTIF_KEY = "onoff_notif_prefs";

const defaultNotif: NotifPrefs = {
  emailMarketing: true,
  orderUpdates: true,
  promotions: false,
};

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${
        checked ? "bg-foreground border-foreground" : "bg-transparent border-border"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform transition-transform ${
          checked
            ? "translate-x-5 bg-background"
            : "translate-x-1 bg-foreground/30"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({ name: "", email: "", phone: "" });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [notif, setNotif] = useState<NotifPrefs>(defaultNotif);
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifMsg, setNotifMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(NOTIF_KEY);
    if (stored) {
      try {
        setNotif(JSON.parse(stored) as NotifPrefs);
      } catch {}
    }
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        if (!res.ok) throw new Error();
        const data = (await res.json()) as { user: Profile };
        setProfile({
          name: data.user.name ?? "",
          email: data.user.email ?? "",
          phone: data.user.phone ?? "",
        });
      })
      .catch(() => {
        setProfileMsg({ ok: false, text: "Không thể tải thông tin tài khoản." });
      })
      .finally(() => setProfileLoading(false));
  }, [router]);

  async function handleProfileSave(e: FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Lỗi không xác định");
      setProfileMsg({ ok: true, text: data.message ?? "Đã lưu thông tin." });
    } catch (err) {
      setProfileMsg({
        ok: false,
        text: err instanceof Error ? err.message : "Không thể lưu thông tin.",
      });
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSave(e: FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (passwords.next !== passwords.confirm) {
      setPwMsg({ ok: false, text: "Mật khẩu mới không khớp." });
      return;
    }
    if (passwords.next.length < 8) {
      setPwMsg({ ok: false, text: "Mật khẩu mới phải có ít nhất 8 ký tự." });
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.next,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Lỗi không xác định");
      setPwMsg({ ok: true, text: data.message ?? "Đã đổi mật khẩu." });
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (err) {
      setPwMsg({
        ok: false,
        text: err instanceof Error ? err.message : "Không thể đổi mật khẩu.",
      });
    } finally {
      setPwSaving(false);
    }
  }

  function handleNotifSave(e: FormEvent) {
    e.preventDefault();
    setNotifSaving(true);
    setNotifMsg(null);
    try {
      localStorage.setItem(NOTIF_KEY, JSON.stringify(notif));
      setNotifMsg({ ok: true, text: "Đã lưu tùy chọn thông báo." });
    } catch {
      setNotifMsg({ ok: false, text: "Không thể lưu tùy chọn." });
    } finally {
      setNotifSaving(false);
    }
  }

  const inputClass =
    "w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-foreground transition-colors";

  const labelClass = "block text-xs text-muted mb-1.5 tracking-wide";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-8">Cài đặt tài khoản</h1>

      <nav className="flex gap-6 border-b border-border mb-10 text-sm">
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
        <Link
          href="/account/addresses"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Địa chỉ
        </Link>
        <span className="pb-3 border-b-2 border-foreground font-medium">
          Cài đặt
        </span>
      </nav>

      <div className="space-y-10">
        <section className="border border-border p-6">
          <h2 className="text-xs font-medium tracking-wider uppercase mb-6 text-muted">
            Thông tin cá nhân
          </h2>

          {profileLoading ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 bg-border rounded" />
                  <div className="h-10 w-full bg-border rounded" />
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleProfileSave} noValidate>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, name: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, phone: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="0912 345 678"
                  />
                </div>
              </div>

              {profileMsg && (
                <p
                  className={`mt-4 text-sm ${
                    profileMsg.ok ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {profileMsg.text}
                </p>
              )}

              <button
                type="submit"
                disabled={profileSaving}
                className="mt-6 border border-foreground px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {profileSaving ? "Đang lưu..." : "Lưu thông tin"}
              </button>
            </form>
          )}
        </section>

        <section className="border border-border p-6">
          <h2 className="text-xs font-medium tracking-wider uppercase mb-6 text-muted">
            Đổi mật khẩu
          </h2>

          <form onSubmit={handlePasswordSave} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className={labelClass}>
                  Mật khẩu hiện tại
                </label>
                <input
                  id="current-password"
                  type="password"
                  required
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, current: e.target.value }))
                  }
                  className={inputClass}
                  autoComplete="current-password"
                />
              </div>

              <div>
                <label htmlFor="new-password" className={labelClass}>
                  Mật khẩu mới
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  value={passwords.next}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, next: e.target.value }))
                  }
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className={labelClass}>
                  Xác nhận mật khẩu mới
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, confirm: e.target.value }))
                  }
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {pwMsg && (
              <p
                className={`mt-4 text-sm ${
                  pwMsg.ok ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {pwMsg.text}
              </p>
            )}

            <button
              type="submit"
              disabled={pwSaving}
              className="mt-6 border border-foreground px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pwSaving ? "Đang lưu..." : "Đổi mật khẩu"}
            </button>
          </form>
        </section>

        <section className="border border-border p-6">
          <h2 className="text-xs font-medium tracking-wider uppercase mb-6 text-muted">
            Tùy chọn thông báo
          </h2>

          <form onSubmit={handleNotifSave}>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label
                    htmlFor="notif-marketing"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Email marketing
                  </label>
                  <p className="text-xs text-muted mt-0.5">
                    Nhận thông tin về sản phẩm mới và xu hướng thời trang
                  </p>
                </div>
                <Toggle
                  id="notif-marketing"
                  checked={notif.emailMarketing}
                  onChange={(v) => setNotif((n) => ({ ...n, emailMarketing: v }))}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <label
                    htmlFor="notif-orders"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Cập nhật đơn hàng
                  </label>
                  <p className="text-xs text-muted mt-0.5">
                    Nhận thông báo về trạng thái đơn hàng của bạn
                  </p>
                </div>
                <Toggle
                  id="notif-orders"
                  checked={notif.orderUpdates}
                  onChange={(v) => setNotif((n) => ({ ...n, orderUpdates: v }))}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <label
                    htmlFor="notif-promotions"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Khuyến mãi
                  </label>
                  <p className="text-xs text-muted mt-0.5">
                    Nhận thông tin về ưu đãi đặc biệt và mã giảm giá
                  </p>
                </div>
                <Toggle
                  id="notif-promotions"
                  checked={notif.promotions}
                  onChange={(v) => setNotif((n) => ({ ...n, promotions: v }))}
                />
              </div>
            </div>

            {notifMsg && (
              <p
                className={`mt-4 text-sm ${
                  notifMsg.ok ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {notifMsg.text}
              </p>
            )}

            <button
              type="submit"
              disabled={notifSaving}
              className="mt-6 border border-foreground px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {notifSaving ? "Đang lưu..." : "Lưu tùy chọn"}
            </button>
          </form>
        </section>
      </div>

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
