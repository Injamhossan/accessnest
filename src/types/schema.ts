// =========================================================
// AccessNest — Data Schema Types
// =========================================================

// ─── Enums ───────────────────────────────────────────────

export type UserRole = "user" | "admin" | "superadmin";

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "refunded";

export type ProductCategory = "Security & Storage" | "Automation" | "Design Tools" | "Growth" | "Analytics";

export type TransactionType = "purchase" | "refund" | "subscription";

export type VisitorStatus = "pending" | "approved" | "rejected" | "expired";

// ─── User ────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;                   // OAuth avatar URL
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;

  // Relations
  orders?: Order[];
  cart?: CartItem[];
  notifications?: Notification[];
  visitorLogs?: VisitorLog[];
}

// ─── Product ─────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;                    // in USD
  discountedPrice?: number;
  category: ProductCategory;
  image: string;
  rating: number;                   // 0–5
  reviews: number;                  // total review count
  stock: number;                    // available licenses/seats
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cart ────────────────────────────────────────────────

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  quantity: number;
  addedAt: Date;
}

// ─── Order ───────────────────────────────────────────────

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;              // in USD
  paymentMethod?: string;
  paymentId?: string;               // Stripe/PayPal transaction ID
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// ─── Transaction ─────────────────────────────────────────

export interface Transaction {
  id: string;
  userId: string;
  user?: User;
  orderId?: string;
  type: TransactionType;
  amount: number;
  currency: string;                 // "USD"
  status: "success" | "failed" | "pending";
  paymentGateway: string;           // "stripe" | "paypal"
  createdAt: Date;
}

// ─── Visitor / Access Log ────────────────────────────────

export interface VisitorLog {
  id: string;
  userId: string;                   // Who is requesting access
  user?: User;
  resourceId: string;               // What they are trying to access
  resourceType: string;             // e.g., "dashboard", "admin", "product"
  status: VisitorStatus;
  approvedBy?: string;              // Admin userId
  notes?: string;
  requestedAt: Date;
  resolvedAt?: Date;
}

// ─── Notification ────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

// ─── Analytics (Admin) ───────────────────────────────────

export interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalOrders: number;
  ordersToday: number;
  totalRevenue: number;
  revenueToday: number;
  pendingApprovals: number;
  activeProducts: number;
}

export interface RevenueDataPoint {
  date: string;                     // "YYYY-MM-DD"
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  title: string;
  image: string;
  totalSold: number;
  totalRevenue: number;
}
