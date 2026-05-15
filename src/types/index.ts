export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  material: string | null;
  price: number;
  salePrice: number | null;
  images: string[];
  categoryId: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
  category: Category;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  gender: string;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  shippingFee: number;
  discount: number;
  paymentMethod: string;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  product: { name: string; slug: string; images: string };
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
}
