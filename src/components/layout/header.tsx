"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Heart,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

// ─── Brand tabs ────────────────────────────────────────────────────────────────
const BRAND_TABS = [
  { label: "ONFIT", href: "/products?brand=onfit" },
  { label: "BASIC", href: "/products?brand=basic" },
  { label: "LOUNGE", href: "/products?brand=lounge" },
];

// ─── Nav links with mega-menu ──────────────────────────────────────────────────
const MEGA_MENU: Record<string, { label: string; href: string }[]> = {
  Nam: [
    { label: "Boxer", href: "/products?gender=nam&category=boxer" },
    { label: "Brief", href: "/products?gender=nam&category=brief" },
    { label: "Trunk", href: "/products?gender=nam&category=trunk" },
    { label: "Áo thun lót", href: "/products?gender=nam&category=ao-thun-lot" },
  ],
  Nữ: [
    { label: "Bra", href: "/products?gender=nu&category=bra" },
    { label: "Quần lót", href: "/products?gender=nu&category=quan-lot" },
    { label: "Bodysuit", href: "/products?gender=nu&category=bodysuit" },
    { label: "Set đồ lót", href: "/products?gender=nu&category=set-do-lot" },
  ],
};

const NAV_LINKS = [
  { label: "Nam", href: "/products?gender=nam" },
  { label: "Nữ", href: "/products?gender=nu" },
  { label: "Đồ mặc nhà", href: "/products?category=do-mac-nha" },
  { label: "Phụ kiện", href: "/products?category=phu-kien" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Cart Drawer ───────────────────────────────────────────────────────────────
function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore();
  const count = totalItems();
  const total = totalPrice();

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </Dialog.Overlay>

        {/* Panel */}
        <Dialog.Content asChild aria-describedby={undefined}>
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.32, 0, 0.67, 0] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Dialog.Title className="font-serif text-lg tracking-wide text-foreground">
                Giỏ hàng
                {count > 0 && (
                  <span className="ml-2 text-sm font-sans font-normal text-muted">
                    ({count} sản phẩm)
                  </span>
                )}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="p-2 -mr-2 text-muted hover:text-foreground transition-colors"
                  aria-label="Đóng giỏ hàng"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} className="text-accent" strokeWidth={1} />
                  <p className="text-muted text-sm tracking-wide">
                    Giỏ hàng của bạn đang trống
                  </p>
                  <button
                    onClick={onClose}
                    className="text-xs tracking-[0.15em] uppercase underline underline-offset-4 text-foreground hover:text-muted transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="py-5 flex gap-4"
                    >
                      {/* Image */}
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={onClose}
                        className="shrink-0 w-20 h-24 bg-card overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={onClose}
                          className="text-sm font-medium text-foreground hover:text-muted transition-colors line-clamp-2 leading-snug"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted tracking-wide">
                          {item.size} · {item.color}
                        </p>
                        <p className="text-sm font-medium text-foreground mt-auto">
                          {formatPrice(item.price)}
                        </p>

                        {/* Qty + remove */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-foreground transition-colors"
                              aria-label="Giảm"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-foreground transition-colors"
                              aria-label="Tăng"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.productId, item.size, item.color)
                            }
                            className="p-1 text-muted hover:text-foreground transition-colors"
                            aria-label="Xóa"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted tracking-wide">Tổng cộng</span>
                  <span className="font-serif text-lg text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Phí vận chuyển sẽ được tính khi thanh toán
                </p>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full h-12 bg-foreground text-background text-sm tracking-[0.12em] uppercase hover:bg-muted transition-colors duration-200"
                >
                  Thanh toán
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center w-full h-10 border border-border text-sm tracking-[0.1em] uppercase text-foreground hover:bg-accent/20 transition-colors duration-200"
                >
                  Xem giỏ hàng
                </Link>
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Search Overlay ────────────────────────────────────────────────────────────
function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Search panel */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
          >
            <div className="max-w-3xl mx-auto px-6 py-6">
              <form onSubmit={handleSubmit} className="relative">
                <Search
                  size={16}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full h-12 pl-7 pr-12 bg-transparent border-b border-foreground text-foreground text-base placeholder:text-muted/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground transition-colors"
                  aria-label="Đóng tìm kiếm"
                >
                  <X size={18} />
                </button>
              </form>

              {/* Quick links */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Boxer", "Bra", "Bodysuit", "Trunk", "Đồ mặc nhà"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      router.push(`/products?q=${encodeURIComponent(term)}`);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs tracking-wide border border-border text-muted hover:border-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Header ───────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const handleNavEnter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (MEGA_MENU[label]) setActiveMega(label);
  };

  const handleNavLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  const handleMegaEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  return (
    <>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        {/* ── Brand tabs bar ── */}
        <div className="border-b border-border/60">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
            {/* Brand tabs */}
            <div className="flex items-center gap-0">
              {BRAND_TABS.map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className="px-4 h-9 flex items-center text-[10px] tracking-[0.2em] font-medium text-muted hover:text-foreground border-r border-border/60 first:border-l transition-colors duration-150"
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* Utility links */}
            <div className="hidden sm:flex items-center gap-5 text-[10px] tracking-[0.15em] text-muted">
              <Link href="/account" className="hover:text-foreground transition-colors">
                Tài khoản
              </Link>
              <Link href="/account/orders" className="hover:text-foreground transition-colors">
                Đơn hàng
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main bar ── */}
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-foreground hover:text-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl tracking-[0.15em] font-semibold text-foreground hover:text-muted transition-colors duration-200"
          >
            ONFIT
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const hasMega = Boolean(MEGA_MENU[link.label]);
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleNavEnter(link.label)}
                  onMouseLeave={handleNavLeave}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm tracking-wide transition-colors duration-200 py-1 border-b-2 ${
                      activeMega === link.label
                        ? "text-foreground border-foreground"
                        : "text-muted border-transparent hover:text-foreground hover:border-accent"
                    }`}
                  >
                    {link.label}
                    {hasMega && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          activeMega === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-200"
              aria-label="Tìm kiếm"
            >
              <Search size={18} />
            </button>
            <Link
              href="/login"
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-200"
              aria-label="Tài khoản"
            >
              <User size={18} />
            </Link>
            <Link
              href="/account"
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-200 relative"
              aria-label="Yêu thích"
            >
              <Heart size={18} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="wl-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-medium leading-none"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-200 relative"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-medium leading-none"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mega menu ── */}
        <AnimatePresence>
          {activeMega && MEGA_MENU[activeMega] && (
            <motion.div
              className="absolute left-0 right-0 bg-background border-b border-border shadow-sm"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleNavLeave}
            >
              <div className="max-w-7xl mx-auto px-6 py-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-5 font-medium">
                  {activeMega}
                </p>
                <div className="flex gap-10">
                  {MEGA_MENU[activeMega].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveMega(null)}
                      className="group flex flex-col gap-1"
                    >
                      <span className="text-sm text-foreground tracking-wide group-hover:text-muted transition-colors duration-150">
                        {item.label}
                      </span>
                      <span className="block h-px w-0 bg-accent group-hover:w-full transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden border-t border-border bg-background overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Brand tabs in mobile */}
              <div className="flex border-b border-border">
                {BRAND_TABS.map((tab) => (
                  <Link
                    key={tab.label}
                    href={tab.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-center text-[10px] tracking-[0.2em] font-medium text-muted hover:text-foreground border-r border-border last:border-r-0 transition-colors"
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>

              <nav className="flex flex-col py-2">
                {NAV_LINKS.map((link) => {
                  const hasMega = Boolean(MEGA_MENU[link.label]);
                  const isExpanded = mobileExpanded === link.label;
                  return (
                    <div key={link.href}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          className="flex-1 px-6 py-3.5 text-sm tracking-wide text-muted hover:text-foreground hover:bg-accent/10 transition-colors duration-150"
                          onClick={() => !hasMega && setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                        {hasMega && (
                          <button
                            className="px-5 py-3.5 text-muted hover:text-foreground transition-colors"
                            onClick={() =>
                              setMobileExpanded(isExpanded ? null : link.label)
                            }
                            aria-label={`Mở rộng ${link.label}`}
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {hasMega && isExpanded && (
                          <motion.div
                            className="bg-accent/10 border-t border-border overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {MEGA_MENU[link.label].map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-10 py-2.5 text-sm text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-150"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileExpanded(null);
                                }}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              {/* Mobile footer links */}
              <div className="border-t border-border px-6 py-4 flex gap-6">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs tracking-[0.15em] text-muted hover:text-foreground transition-colors"
                >
                  Tài khoản
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs tracking-[0.15em] text-muted hover:text-foreground transition-colors"
                >
                  Đơn hàng
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
