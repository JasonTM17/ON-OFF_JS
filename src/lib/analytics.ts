/**
 * Hệ thống theo dõi sự kiện phân tích (analytics).
 * Chỉ định nghĩa interface và kiểu dữ liệu — không phụ thuộc dịch vụ bên ngoài.
 * Tích hợp dịch vụ thực tế (GA4, Mixpanel, v.v.) qua hàm `setAnalyticsProvider`.
 */

// ─── Kiểu sự kiện ────────────────────────────────────────────────────────────

export type EventName =
  | "page_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "view_item"
  | "view_item_list"
  | "select_item"
  | "login"
  | "sign_up";

export interface PageViewEvent {
  name: "page_view";
  payload: {
    /** Đường dẫn trang, ví dụ: /san-pham/ao-thun */
    path: string;
    /** Tiêu đề trang */
    title?: string;
    /** Nguồn giới thiệu */
    referrer?: string;
  };
}

export interface AddToCartEvent {
  name: "add_to_cart";
  payload: {
    itemId: string;
    itemName: string;
    /** Danh mục sản phẩm */
    category?: string;
    price: number;
    quantity: number;
    currency?: string;
  };
}

export interface RemoveFromCartEvent {
  name: "remove_from_cart";
  payload: {
    itemId: string;
    itemName: string;
    price: number;
    quantity: number;
    currency?: string;
  };
}

export interface BeginCheckoutEvent {
  name: "begin_checkout";
  payload: {
    value: number;
    currency?: string;
    itemCount: number;
  };
}

export interface PurchaseEvent {
  name: "purchase";
  payload: {
    /** Mã đơn hàng */
    orderId: string;
    value: number;
    currency?: string;
    /** Phí vận chuyển */
    shipping?: number;
    /** Thuế */
    tax?: number;
    items: Array<{
      itemId: string;
      itemName: string;
      price: number;
      quantity: number;
    }>;
  };
}

export interface SearchEvent {
  name: "search";
  payload: {
    query: string;
    resultCount?: number;
  };
}

export interface ViewItemEvent {
  name: "view_item";
  payload: {
    itemId: string;
    itemName: string;
    category?: string;
    price: number;
    currency?: string;
  };
}

export interface ViewItemListEvent {
  name: "view_item_list";
  payload: {
    listId: string;
    listName: string;
    items: Array<{ itemId: string; itemName: string }>;
  };
}

export interface SelectItemEvent {
  name: "select_item";
  payload: {
    itemId: string;
    itemName: string;
    listId?: string;
    position?: number;
  };
}

export interface LoginEvent {
  name: "login";
  payload: {
    method: "email" | "google" | "facebook" | string;
  };
}

export interface SignUpEvent {
  name: "sign_up";
  payload: {
    method: "email" | "google" | "facebook" | string;
  };
}

export type AnalyticsEvent =
  | PageViewEvent
  | AddToCartEvent
  | RemoveFromCartEvent
  | BeginCheckoutEvent
  | PurchaseEvent
  | SearchEvent
  | ViewItemEvent
  | ViewItemListEvent
  | SelectItemEvent
  | LoginEvent
  | SignUpEvent;

// ─── Interface nhà cung cấp ───────────────────────────────────────────────────

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void | Promise<void>;
}

// ─── Triển khai mặc định (console) ───────────────────────────────────────────

const consoleProvider: AnalyticsProvider = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  track(_event) {},
};

// ─── Singleton tracker ────────────────────────────────────────────────────────

let provider: AnalyticsProvider = consoleProvider;

/**
 * Đăng ký nhà cung cấp analytics tuỳ chỉnh (GA4, Mixpanel, v.v.).
 * Gọi hàm này một lần trong layout gốc hoặc file khởi tạo.
 */
export function setAnalyticsProvider(p: AnalyticsProvider): void {
  provider = p;
}

/**
 * Ghi nhận một sự kiện analytics.
 *
 * @example
 * track({ name: "add_to_cart", payload: { itemId: "sp-001", itemName: "Áo thun", price: 299000, quantity: 1 } });
 */
export function track(event: AnalyticsEvent): void {
  try {
    void provider.track(event);
  } catch (err) {
    // Không để lỗi analytics ảnh hưởng đến trải nghiệm người dùng
    if (process.env.NODE_ENV === "development") {
      console.error("[Analytics] Lỗi ghi nhận sự kiện:", err);
    }
  }
}

// ─── Hàm tiện ích ─────────────────────────────────────────────────────────────

export const analytics = {
  pageView: (payload: PageViewEvent["payload"]) =>
    track({ name: "page_view", payload }),

  addToCart: (payload: AddToCartEvent["payload"]) =>
    track({ name: "add_to_cart", payload }),

  removeFromCart: (payload: RemoveFromCartEvent["payload"]) =>
    track({ name: "remove_from_cart", payload }),

  beginCheckout: (payload: BeginCheckoutEvent["payload"]) =>
    track({ name: "begin_checkout", payload }),

  purchase: (payload: PurchaseEvent["payload"]) =>
    track({ name: "purchase", payload }),

  search: (payload: SearchEvent["payload"]) =>
    track({ name: "search", payload }),

  viewItem: (payload: ViewItemEvent["payload"]) =>
    track({ name: "view_item", payload }),

  viewItemList: (payload: ViewItemListEvent["payload"]) =>
    track({ name: "view_item_list", payload }),

  selectItem: (payload: SelectItemEvent["payload"]) =>
    track({ name: "select_item", payload }),

  login: (payload: LoginEvent["payload"]) =>
    track({ name: "login", payload }),

  signUp: (payload: SignUpEvent["payload"]) =>
    track({ name: "sign_up", payload }),
} as const;
