export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  createdAt: string;
}

export type VerificationLevel = 'none' | 'profile_verified' | 'farm_verified' | 'identity_verified';

export interface FarmerProfile {
  id: string;
  userId: string;
  farmName: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  coordinates: { lat: number; lng: number };
  farmSizeAcres: number;
  verificationLevel?: VerificationLevel;
  verificationStatus?: VerificationLevel;
  mainCrops?: string[];
  rating: number;
  totalReviews: number;
  completedOrders: number;
  bio: string;
  deliveryMethods: ('farmer_delivery' | 'buyer_pickup' | 'partner_delivery')[];
  upiId?: string;
}

export interface BuyerProfile {
  id: string;
  userId: string;
  buyerType: 'consumer' | 'retailer' | 'restaurant' | 'hostel' | 'bulk_buyer';
  businessName?: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  coordinates: { lat: number; lng: number };
}

export type ProductCategory = 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices' | 'dairy' | 'oilseeds' | 'organic_special';

export type ProductUnit = 'kg' | 'quintal' | 'litre' | 'dozen' | 'crate' | 'bag';

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  farmerLocation: string;
  farmerRating: number;
  farmerVerification: VerificationLevel;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  quantity: number;
  unit: ProductUnit;
  pricePerUnit: number;
  marketAveragePrice: number;
  referenceMandiPrice: number;
  minimumOrderQuantity: number;
  availableFrom: string;
  expectedHarvestDate: string;
  isOrganic: boolean;
  organicCertNumber?: string;
  qualityGrade: 'Grade A (Export/Premium)' | 'Grade B (Standard)' | 'Organic Certified';
  status: 'active' | 'out_of_stock' | 'draft' | 'unlisted' | 'inactive';
  distanceKm?: number;
  createdAt: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Accepted'
  | 'Preparing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type DeliveryType = 'farmer_delivery' | 'buyer_pickup' | 'partner_delivery' | 'farm_pickup' | 'farmer_direct';

export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  unit: ProductUnit;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  farmerId: string;
  farmerName: string;
  farmName?: string;
  farmerPhone?: string;
  items: OrderItem[];
  produceAmount?: number;
  deliveryFee?: number;
  platformFee?: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  deliveryAddress: string;
  orderStatus: OrderStatus;
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery' | 'Refunded';
  paymentMethod: PaymentMethod;
  notes?: string;
  estimatedDeliveryDate?: string;
  createdAt: string;
  statusHistory?: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface Review {
  id: string;
  orderId: string;
  productId?: string;
  productName?: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName?: string;
  rating: number;
  qualityRating: number;
  deliveryRating: number;
  comment: string;
  createdAt: string;
}

export interface PriceInsight {
  productName: string;
  category: ProductCategory;
  farmerDirectPrice: number;
  marketplaceAvg: number;
  referenceMandiPrice: number;
  retailSupermarketPrice: number;
  unit: ProductUnit;
  mandiLocation: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  historicalTrend: { date: string; farmerPrice: number; mandiPrice: number; retailPrice: number }[];
  intermediaryBreakdown: {
    stage: string;
    costAdded: number;
    description: string;
  }[];
}

export interface BulkRequirement {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: string;
  businessName?: string;
  productName: string;
  category: ProductCategory;
  quantity?: number;
  requiredQuantity?: number;
  unit: ProductUnit;
  targetPricePerUnit?: number;
  targetMaxPrice?: number;
  location?: string;
  deliveryLocation?: string;
  requiredByDate: string;
  description?: string;
  status?: 'open' | 'bidding' | 'fulfilled' | 'closed';
  proposalsCount?: number;
  quotes?: {
    farmerId: string;
    farmerName: string;
    pricePerUnit: number;
    availableQuantity: number;
    notes: string;
  }[];
  proposals?: {
    farmerId: string;
    farmerName: string;
    quotedPrice: number;
    availableQuantity: number;
    deliveryDate: string;
    notes: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface GroupOrder {
  id: string;
  productId: string;
  title?: string;
  productName: string;
  productImage: string;
  farmerId: string;
  farmerName: string;
  farmLocation?: string;
  deliveryHubLocation?: string;
  targetQuantity: number;
  currentQuantity?: number;
  currentPooledQuantity?: number;
  unit: ProductUnit;
  groupPricePerUnit?: number;
  discountedPricePerUnit?: number;
  normalPricePerUnit?: number;
  originalPricePerUnit?: number;
  discountPercentage?: number;
  deliveryPincode?: string;
  dropLocation?: string;
  expiryDate?: string;
  deadline?: string;
  participantsCount?: number;
  status: 'active' | 'threshold_reached' | 'dispatched' | 'completed';
  participants: {
    buyerId?: string;
    userName?: string;
    buyerName?: string;
    quantity: number;
    joinedAt?: string;
  }[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole?: UserRole;
  receiverId: string;
  receiverName?: string;
  orderId?: string;
  relatedOrderId?: string;
  relatedProductId?: string;
  text: string;
  createdAt: string;
}

export type ComplaintReason =
  | 'quality_mismatch'
  | 'damaged_produce'
  | 'wrong_quantity'
  | 'delayed_delivery'
  | 'other'
  | 'Product quality'
  | 'Missing quantity'
  | 'Delivery problem'
  | 'Payment issue';

export interface Complaint {
  id: string;
  orderId: string;
  farmerId?: string;
  farmerName?: string;
  userId?: string;
  userName?: string;
  complainantId?: string;
  complainantName?: string;
  userRole?: UserRole;
  reason?: ComplaintReason;
  category?: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'Pending' | 'Under Review' | 'Resolved';
  adminResolution?: string;
  adminResponse?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type?: 'order' | 'stock' | 'price' | 'message' | 'system';
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
}

export type AppNotification = Notification;

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'en' | 'hi' | 'gu';
