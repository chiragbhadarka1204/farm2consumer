import {
  User,
  FarmerProfile,
  Product,
  Order,
  Review,
  PriceInsight,
  BulkRequirement,
  GroupOrder,
  Message,
  Complaint,
  Notification
} from '../types';

export const api = {
  // Auth
  async getCurrentUser(): Promise<User | null> {
    try {
      const stored = localStorage.getItem('kisansetu_user');
      if (stored) return JSON.parse(stored);
      // Fallback default demo user
      return {
        id: 'usr_farmer_1',
        name: 'Rajesh Patel',
        email: 'farmer@example.com',
        phone: '+91 98251 44321',
        role: 'farmer',
        address: 'Anand District, Gujarat',
        createdAt: new Date().toISOString()
      };
    } catch {
      return null;
    }
  },

  async login(email: string, password?: string): Promise<User> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        const user = data.user || data;
        localStorage.setItem('kisansetu_user', JSON.stringify(user));
        return user;
      }
    } catch (e) {
      console.warn('API login offline, using fallback persona');
    }

    // Fallback logic for mock / offline mode
    let user: User;
    if (email.includes('farmer')) {
      user = {
        id: 'usr_farmer_1',
        name: 'Rajesh Patel',
        email: 'farmer@example.com',
        phone: '+91 98251 44321',
        role: 'farmer',
        address: 'Anand District, Gujarat',
        createdAt: new Date().toISOString()
      };
    } else if (email.includes('admin')) {
      user = {
        id: 'usr_admin_1',
        name: 'Platform Administrator',
        email: 'admin@example.com',
        phone: '+91 99000 11223',
        role: 'admin',
        address: 'KisanSetu Hub, New Delhi',
        createdAt: new Date().toISOString()
      };
    } else {
      user = {
        id: 'usr_buyer_1',
        name: 'Anita Sharma',
        email: 'buyer@example.com',
        phone: '+91 98765 12340',
        role: 'buyer',
        address: 'Satellite Road, Ahmedabad, Gujarat',
        createdAt: new Date().toISOString()
      };
    }
    localStorage.setItem('kisansetu_user', JSON.stringify(user));
    return user;
  },

  async register(userData: Partial<User>): Promise<User> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const data = await res.json();
        const user = data.user || data;
        localStorage.setItem('kisansetu_user', JSON.stringify(user));
        return user;
      }
    } catch (e) {
      console.warn('API register offline, using local creation');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'User',
      email: userData.email || 'user@example.com',
      phone: userData.phone || '+91 90000 00000',
      role: userData.role || 'buyer',
      address: userData.address || 'Ahmedabad, Gujarat',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('kisansetu_user', JSON.stringify(newUser));
    return newUser;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('kisansetu_user');
  },

  // Products
  async getProducts(params?: Record<string, string | number | boolean>): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
      });
    }
    const res = await fetch(`/api/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to create product' }));
      throw new Error(err.error || 'Failed to create product');
    }
    return res.json();
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
  },

  // Farmers
  async getFarmers(): Promise<FarmerProfile[]> {
    try {
      const res = await fetch('/api/farmers');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Farmers fetch error, falling back');
    }
    return [];
  },

  async getFarmer(id: string): Promise<FarmerProfile> {
    const res = await fetch(`/api/farmers/${id}`);
    if (!res.ok) throw new Error('Failed to fetch farmer details');
    return res.json();
  },

  async verifyFarmer(id: string, status: string, remarks?: string): Promise<FarmerProfile> {
    try {
      const res = await fetch(`/api/farmers/${id}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, remarks })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Verify farmer API failed, using client fallback', e);
    }
    return {
      id,
      userId: id,
      farmName: 'Verified Natural Farm',
      location: 'Anand, Gujarat',
      district: 'Anand',
      state: 'Gujarat',
      pincode: '388001',
      coordinates: { lat: 22.56, lng: 72.92 },
      farmSizeAcres: 10,
      verificationStatus: status as any,
      verificationLevel: status as any,
      rating: 4.8,
      totalReviews: 14,
      completedOrders: 38,
      bio: 'Direct producer of organic farmgate harvest.',
      deliveryMethods: ['farmer_delivery', 'buyer_pickup']
    };
  },

  async submitFarmerKYC(farmerId: string, kycData: Partial<FarmerProfile>): Promise<FarmerProfile> {
    const res = await fetch(`/api/farmers/${farmerId}/submit-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(kycData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to submit verification' }));
      throw new Error(err.error || 'Failed to submit verification');
    }
    return res.json();
  },

  // Orders
  async getOrders(userId?: string, role?: string): Promise<Order[]> {
    const query = new URLSearchParams();
    if (userId) query.append('userId', userId);
    if (role) query.append('role', role);
    const res = await fetch(`/api/orders?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async getOrder(id: string): Promise<Order> {
    const res = await fetch(`/api/orders/${id}`);
    if (!res.ok) throw new Error('Failed to fetch order');
    return res.json();
  },

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Order creation failed' }));
      throw new Error(err.error || 'Order creation failed');
    }
    return res.json();
  },

  async updateOrderStatus(id: string, status: string, note?: string): Promise<Order> {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note })
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },

  // Reviews
  async getReviews(productId?: string, farmerId?: string): Promise<Review[]> {
    const query = new URLSearchParams();
    if (productId) query.append('productId', productId);
    if (farmerId) query.append('farmerId', farmerId);
    const res = await fetch(`/api/reviews?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async createReview(reviewData: Partial<Review>): Promise<Review> {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to create review' }));
      throw new Error(err.error || 'Failed to create review');
    }
    return res.json();
  },

  async submitReview(reviewData: Partial<Review>): Promise<Review> {
    return this.createReview(reviewData);
  },

  // Price Insights
  async getPriceInsights(): Promise<PriceInsight[]> {
    const res = await fetch('/api/price-insights');
    if (!res.ok) throw new Error('Failed to fetch price insights');
    return res.json();
  },

  // Bulk Requirements
  async getBulkRequirements(): Promise<BulkRequirement[]> {
    const res = await fetch('/api/bulk-requirements');
    if (!res.ok) throw new Error('Failed to fetch bulk requirements');
    return res.json();
  },

  async createBulkRequirement(data: Partial<BulkRequirement>): Promise<BulkRequirement> {
    const res = await fetch('/api/bulk-requirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create bulk requirement');
    return res.json();
  },

  async submitBulkProposal(requirementId: string, proposalData: any): Promise<BulkRequirement> {
    const res = await fetch(`/api/bulk-requirements/${requirementId}/proposals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proposalData)
    });
    if (!res.ok) throw new Error('Failed to submit proposal');
    return res.json();
  },

  async submitBulkQuote(requirementId: string, quoteData: any): Promise<BulkRequirement> {
    return this.submitBulkProposal(requirementId, quoteData);
  },

  // Group Orders
  async getGroupOrders(): Promise<GroupOrder[]> {
    const res = await fetch('/api/group-orders');
    if (!res.ok) throw new Error('Failed to fetch group orders');
    return res.json();
  },

  async joinGroupOrder(groupId: string, buyerId: string, buyerName: string, quantity: number): Promise<GroupOrder> {
    const res = await fetch(`/api/group-orders/${groupId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyerId, buyerName, quantity })
    });
    if (!res.ok) throw new Error('Failed to join group order');
    return res.json();
  },

  // Messages
  async getMessages(params?: { userId?: string; otherId?: string; orderId?: string }): Promise<Message[]> {
    const query = new URLSearchParams();
    if (params?.userId) query.append('userId', params.userId);
    if (params?.otherId) query.append('otherId', params.otherId);
    if (params?.orderId) query.append('orderId', params.orderId);
    const res = await fetch(`/api/messages?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  async sendMessage(msg: Partial<Message>): Promise<Message> {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },

  // Complaints
  async getComplaints(userId?: string): Promise<Complaint[]> {
    const query = new URLSearchParams();
    if (userId) query.append('userId', userId);
    const res = await fetch(`/api/complaints?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch complaints');
    return res.json();
  },

  async createComplaint(data: Partial<Complaint>): Promise<Complaint> {
    const res = await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create complaint');
    return res.json();
  },

  async submitComplaint(data: Partial<Complaint>): Promise<Complaint> {
    return this.createComplaint(data);
  },

  async resolveComplaint(id: string, resolutionNotes: string): Promise<Complaint> {
    const res = await fetch(`/api/complaints/${id}/resolve`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'resolved', adminResolution: resolutionNotes, adminResponse: resolutionNotes })
    });
    if (!res.ok) throw new Error('Failed to resolve complaint');
    return res.json();
  },

  // Admin Analytics
  async getAdminAnalytics(): Promise<any> {
    const res = await fetch('/api/admin/analytics');
    if (!res.ok) throw new Error('Failed to fetch admin analytics');
    return res.json();
  },

  // Notifications
  async getNotifications(userId?: string): Promise<Notification[]> {
    const query = new URLSearchParams();
    if (userId) query.append('userId', userId);
    const res = await fetch(`/api/notifications?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
  },

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
  },

  async markNotificationAsRead(id: string): Promise<void> {
    return this.markNotificationRead(id);
  }
};
