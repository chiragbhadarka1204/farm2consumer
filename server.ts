import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  initialUsers,
  initialFarmerProfiles,
  initialBuyerProfiles,
  initialProducts,
  initialOrders,
  initialReviews,
  initialPriceInsights,
  initialBulkRequirements,
  initialGroupOrders,
  initialMessages,
  initialComplaints,
  initialNotifications
} from './src/data/seedData';
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
  AppNotification
} from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database Store (Initialized from Seed Data)
let users: User[] = [...initialUsers];
let farmerProfiles: Record<string, FarmerProfile> = { ...initialFarmerProfiles };
let products: Product[] = [...initialProducts];
let orders: Order[] = [...initialOrders];
let reviews: Review[] = [...initialReviews];
let priceInsights: PriceInsight[] = [...initialPriceInsights];
let bulkRequirements: BulkRequirement[] = [...initialBulkRequirements];
let groupOrders: GroupOrder[] = [...initialGroupOrders];
let messages: Message[] = [...initialMessages];
let complaints: Complaint[] = [...initialComplaints];
let notifications: AppNotification[] = [...initialNotifications];

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'KisanSetu Backend API', time: new Date().toISOString() });
});

// Authentication Routes
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'User not found with this email' });
  }
  const farmerProfile = user.role === 'farmer' ? farmerProfiles[user.id] : undefined;
  res.json({ user, farmerProfile, token: `token_${user.id}_${Date.now()}` });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, role, farmName, location, district, state, pincode, businessName } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const newUserId = `usr_${role}_${Date.now()}`;
  const newUser: User = {
    id: newUserId,
    name,
    email,
    phone: phone || '+91 98000 00000',
    role,
    avatar: role === 'farmer'
      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  let newFarmerProfile: FarmerProfile | undefined;
  if (role === 'farmer') {
    newFarmerProfile = {
      id: `fp_${Date.now()}`,
      userId: newUserId,
      farmName: farmName || `${name}'s Natural Farm`,
      location: location || 'Village Farms',
      district: district || 'Anand',
      state: state || 'Gujarat',
      pincode: pincode || '388001',
      coordinates: { lat: 22.5, lng: 72.9 },
      farmSizeAcres: 5.0,
      verificationStatus: 'profile_verified',
      rating: 5.0,
      totalReviews: 0,
      completedOrders: 0,
      bio: 'Committed to pesticide-free, transparent harvest directly to consumers.',
      deliveryMethods: ['farmer_delivery', 'buyer_pickup', 'partner_delivery'],
      upiId: `${name.toLowerCase().replace(/\s+/g, '')}@okaxis`
    };
    farmerProfiles[newUserId] = newFarmerProfile;
  }

  res.status(201).json({ user: newUser, farmerProfile: newFarmerProfile, token: `token_${newUserId}_${Date.now()}` });
});

// Products API
app.get('/api/products', (req, res) => {
  const { category, search, isOrganic, farmerId, maxPrice, minPrice, sort } = req.query;
  let filtered = [...products];

  if (farmerId) {
    filtered = filtered.filter((p) => p.farmerId === farmerId);
  }
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (isOrganic === 'true') {
    filtered = filtered.filter((p) => p.isOrganic);
  }
  if (minPrice) {
    filtered = filtered.filter((p) => p.pricePerUnit >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => p.pricePerUnit <= Number(maxPrice));
  }
  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.farmerName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.farmerLocation.toLowerCase().includes(q)
    );
  }

  // Sort logic
  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => (b.farmerRating || 0) - (a.farmerRating || 0));
  } else if (sort === 'distance') {
    filtered.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  } else {
    // default: newest
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const {
    farmerId,
    farmerName,
    farmName,
    farmerLocation,
    farmerRating,
    farmerVerification,
    name,
    category,
    description,
    image,
    quantity,
    unit,
    pricePerUnit,
    minimumOrderQuantity,
    availableFrom,
    expectedHarvestDate,
    isOrganic,
    organicCertNumber,
    qualityGrade
  } = req.body;

  if (!name || !pricePerUnit || !quantity || !farmerId) {
    return res.status(400).json({ error: 'Name, price, quantity, and farmer ID are required' });
  }

  const priceNum = Number(pricePerUnit);
  const newProduct: Product = {
    id: `prod_${Date.now()}`,
    farmerId,
    farmerName: farmerName || 'Verified Farmer',
    farmName: farmName || 'Local Family Farm',
    farmerLocation: farmerLocation || 'Anand, Gujarat',
    farmerRating: farmerRating || 4.8,
    farmerVerification: farmerVerification || 'farm_verified',
    name,
    category: category || 'vegetables',
    description: description || 'Fresh farm-harvested produce direct from the grower.',
    image: image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    quantity: Number(quantity),
    unit: unit || 'kg',
    pricePerUnit: priceNum,
    marketAveragePrice: Math.round(priceNum * 1.15),
    referenceMandiPrice: Math.round(priceNum * 1.25),
    minimumOrderQuantity: Number(minimumOrderQuantity) || 1,
    availableFrom: availableFrom || new Date().toISOString().split('T')[0],
    expectedHarvestDate: expectedHarvestDate || new Date().toISOString().split('T')[0],
    isOrganic: Boolean(isOrganic),
    organicCertNumber: organicCertNumber || '',
    qualityGrade: qualityGrade || 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: Math.round((Math.random() * 20 + 5) * 10) / 10,
    createdAt: new Date().toISOString()
  };

  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products[index] = {
    ...products[index],
    ...req.body,
    quantity: req.body.quantity !== undefined ? Number(req.body.quantity) : products[index].quantity,
    pricePerUnit: req.body.pricePerUnit !== undefined ? Number(req.body.pricePerUnit) : products[index].pricePerUnit
  };
  res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  const removed = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: removed[0] });
});

// Farmers API
app.get('/api/farmers', (req, res) => {
  const farmerUsers = users.filter((u) => u.role === 'farmer');
  const result = farmerUsers.map((u) => ({
    user: u,
    profile: farmerProfiles[u.id] || {
      id: `fp_${u.id}`,
      userId: u.id,
      farmName: `${u.name}'s Farm`,
      location: 'Gujarat, India',
      district: 'Anand',
      state: 'Gujarat',
      pincode: '388001',
      coordinates: { lat: 22.5, lng: 72.9 },
      farmSizeAcres: 8,
      verificationStatus: 'profile_verified',
      rating: 4.8,
      totalReviews: 12,
      completedOrders: 35,
      bio: 'Dedicated natural farmer.',
      deliveryMethods: ['farmer_delivery', 'buyer_pickup']
    },
    products: products.filter((p) => p.farmerId === u.id)
  }));
  res.json(result);
});

app.get('/api/farmers/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id && u.role === 'farmer');
  if (!user) return res.status(404).json({ error: 'Farmer not found' });
  const profile = farmerProfiles[user.id];
  const farmerProducts = products.filter((p) => p.farmerId === user.id);
  const farmerReviews = reviews.filter((r) => r.farmerId === user.id);
  res.json({ user, profile, products: farmerProducts, reviews: farmerReviews });
});

app.put('/api/farmers/:id/verify', (req, res) => {
  const { status } = req.body;
  const profile = farmerProfiles[req.params.id];
  if (!profile) return res.status(404).json({ error: 'Farmer profile not found' });
  profile.verificationStatus = status || 'identity_verified';

  // Update verification status on all their products too
  products.forEach((p) => {
    if (p.farmerId === req.params.id) {
      p.farmerVerification = profile.verificationStatus;
    }
  });

  res.json(profile);
});

// Orders API
app.get('/api/orders', (req, res) => {
  const { userId, role } = req.query;
  let filtered = [...orders];

  if (userId && role === 'farmer') {
    filtered = filtered.filter((o) => o.farmerId === userId);
  } else if (userId && role === 'buyer') {
    filtered = filtered.filter((o) => o.buyerId === userId);
  }

  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(filtered);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const {
    buyerId,
    buyerName,
    buyerPhone,
    farmerId,
    farmerName,
    farmName,
    items,
    deliveryType,
    deliveryAddress,
    paymentMethod,
    deliveryFee,
    notes
  } = req.body;

  if (!buyerId || !items || !items.length) {
    return res.status(400).json({ error: 'Buyer and items are required' });
  }

  // Stock check & decrement
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return res.status(400).json({ error: `Product ${item.productName} not found` });
    }
    if (product.quantity < item.quantity) {
      return res.status(400).json({
        error: `Insufficient stock for ${product.name}. Available: ${product.quantity} ${product.unit}`
      });
    }
  }

  // Deduct stock
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.quantity -= item.quantity;
      if (product.quantity <= 0) {
        product.status = 'out_of_stock';
      }
    }
  }

  const produceAmount = items.reduce((sum: number, it: { totalPrice: number }) => sum + it.totalPrice, 0);
  const fee = Number(deliveryFee) || (deliveryType === 'buyer_pickup' ? 0 : 40);
  const totalAmount = produceAmount + fee;

  const orderId = `FM${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder: Order = {
    id: orderId,
    buyerId,
    buyerName: buyerName || 'Direct Buyer',
    buyerPhone: buyerPhone || '+91 98765 43210',
    farmerId: farmerId || (items[0] ? products.find((p) => p.id === items[0].productId)?.farmerId || 'usr_farmer_1' : 'usr_farmer_1'),
    farmerName: farmerName || 'Rajesh Patel',
    farmName: farmName || 'Green Valley Organic Agro',
    farmerPhone: '+91 98251 44521',
    items,
    produceAmount,
    deliveryFee: fee,
    platformFee: 0,
    totalAmount,
    deliveryType: deliveryType || 'farmer_delivery',
    deliveryAddress: deliveryAddress || 'Ahmedabad, Gujarat',
    orderStatus: 'Pending',
    paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
    paymentMethod: paymentMethod || 'UPI',
    notes: notes || '',
    estimatedDeliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    statusHistory: [
      {
        status: 'Pending',
        timestamp: new Date().toISOString(),
        note: 'Order placed directly with farmer on KisanSetu'
      }
    ]
  };

  orders.unshift(newOrder);

  // Notify farmer
  notifications.unshift({
    id: `notif_${Date.now()}`,
    userId: newOrder.farmerId,
    title: 'New Order Received! 🛒',
    message: `${newOrder.buyerName} placed order #${newOrder.id} for ₹${newOrder.totalAmount}.`,
    type: 'order',
    isRead: false,
    relatedId: newOrder.id,
    createdAt: new Date().toISOString()
  });

  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', (req, res) => {
  const { status, note } = req.body;
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const oldStatus = order.orderStatus;
  order.orderStatus = status;
  order.statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
    note: note || `Status updated to ${status}`
  });

  // If order is delivered, update farmer profile completed orders
  if (status === 'Delivered' && oldStatus !== 'Delivered') {
    order.paymentStatus = 'Paid';
    const fProfile = farmerProfiles[order.farmerId];
    if (fProfile) {
      fProfile.completedOrders = (fProfile.completedOrders || 0) + 1;
    }
  }

  // If order is cancelled, restore stock
  if (status === 'Cancelled' && oldStatus !== 'Cancelled') {
    for (const item of order.items) {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        product.quantity += item.quantity;
        if (product.status === 'out_of_stock') {
          product.status = 'active';
        }
      }
    }
  }

  // Create notification for buyer
  notifications.unshift({
    id: `notif_${Date.now()}`,
    userId: order.buyerId,
    title: `Order Update #${order.id} 📦`,
    message: `Your order status is now "${status}". ${note ? `(${note})` : ''}`,
    type: 'order',
    isRead: false,
    relatedId: order.id,
    createdAt: new Date().toISOString()
  });

  res.json(order);
});

// Reviews API
app.get('/api/reviews', (req, res) => {
  const { productId, farmerId } = req.query;
  let filtered = [...reviews];
  if (productId) filtered = filtered.filter((r) => r.productId === productId);
  if (farmerId) filtered = filtered.filter((r) => r.farmerId === farmerId);
  res.json(filtered);
});

app.post('/api/reviews', (req, res) => {
  const { orderId, productId, productName, buyerId, buyerName, farmerId, rating, qualityRating, deliveryRating, comment } = req.body;

  // Validate that order exists and is delivered
  const order = orders.find((o) => o.id === orderId);
  if (!order || order.orderStatus !== 'Delivered') {
    return res.status(400).json({ error: 'Reviews can only be submitted for completed/delivered orders.' });
  }

  const newReview: Review = {
    id: `rev_${Date.now()}`,
    orderId,
    productId: productId || order.items[0]?.productId || 'prod_tomato_1',
    productName: productName || order.items[0]?.productName || 'Farm Produce',
    buyerId,
    buyerName: buyerName || 'Direct Buyer',
    farmerId: farmerId || order.farmerId,
    rating: Number(rating) || 5,
    qualityRating: Number(qualityRating) || 5,
    deliveryRating: Number(deliveryRating) || 5,
    comment: comment || 'Fresh and quality farm produce!',
    createdAt: new Date().toISOString()
  };

  reviews.unshift(newReview);

  // Update farmer rating
  const farmerReviews = reviews.filter((r) => r.farmerId === newReview.farmerId);
  const avg = farmerReviews.reduce((sum, r) => sum + r.rating, 0) / farmerReviews.length;
  const fProfile = farmerProfiles[newReview.farmerId];
  if (fProfile) {
    fProfile.rating = Math.round(avg * 10) / 10;
    fProfile.totalReviews = farmerReviews.length;
  }

  res.status(201).json(newReview);
});

// Price Insights API
app.get('/api/price-insights', (req, res) => {
  res.json(priceInsights);
});

// Bulk Requirements API
app.get('/api/bulk-requirements', (req, res) => {
  res.json(bulkRequirements);
});

app.post('/api/bulk-requirements', (req, res) => {
  const { buyerId, buyerName, buyerType, businessName, productName, category, requiredQuantity, unit, targetMaxPrice, deliveryLocation, requiredByDate } = req.body;

  const newReq: BulkRequirement = {
    id: `blk_${Date.now()}`,
    buyerId,
    buyerName,
    buyerType: buyerType || 'restaurant',
    businessName: businessName || 'Commercial Buyer',
    productName,
    category: category || 'vegetables',
    requiredQuantity: Number(requiredQuantity),
    unit: unit || 'kg',
    targetMaxPrice: Number(targetMaxPrice),
    deliveryLocation: deliveryLocation || 'Ahmedabad',
    requiredByDate: requiredByDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    status: 'open',
    proposalsCount: 0,
    proposals: [],
    createdAt: new Date().toISOString()
  };

  bulkRequirements.unshift(newReq);
  res.status(201).json(newReq);
});

app.post('/api/bulk-requirements/:id/proposals', (req, res) => {
  const { farmerId, farmerName, quotedPrice, availableQuantity, deliveryDate, notes } = req.body;
  const requirement = bulkRequirements.find((b) => b.id === req.params.id);
  if (!requirement) return res.status(404).json({ error: 'Bulk requirement not found' });

  requirement.proposals.push({
    farmerId,
    farmerName,
    quotedPrice: Number(quotedPrice),
    availableQuantity: Number(availableQuantity),
    deliveryDate: deliveryDate || new Date().toISOString().split('T')[0],
    notes: notes || 'Direct harvest from field',
    createdAt: new Date().toISOString()
  });
  requirement.proposalsCount = requirement.proposals.length;
  requirement.status = 'bidding';

  res.json(requirement);
});

// Group Orders API
app.get('/api/group-orders', (req, res) => {
  res.json(groupOrders);
});

app.post('/api/group-orders/:id/join', (req, res) => {
  const { buyerId, buyerName, quantity } = req.body;
  const group = groupOrders.find((g) => g.id === req.params.id);
  if (!group) return res.status(404).json({ error: 'Group order not found' });

  const joinQty = Number(quantity) || 5;
  group.participants.push({
    buyerId,
    buyerName,
    quantity: joinQty,
    joinedAt: new Date().toISOString()
  });

  group.currentQuantity += joinQty;
  group.participantsCount = group.participants.length;

  if (group.currentQuantity >= group.targetQuantity) {
    group.status = 'threshold_reached';
  }

  res.json(group);
});

// Messages API
app.get('/api/messages', (req, res) => {
  const { userId, otherId, orderId } = req.query;
  let filtered = [...messages];
  if (orderId) {
    filtered = filtered.filter((m) => m.relatedOrderId === orderId);
  } else if (userId && otherId) {
    filtered = filtered.filter(
      (m) =>
        (m.senderId === userId && m.receiverId === otherId) ||
        (m.senderId === otherId && m.receiverId === userId)
    );
  } else if (userId) {
    filtered = filtered.filter((m) => m.senderId === userId || m.receiverId === userId);
  }
  res.json(filtered);
});

app.post('/api/messages', (req, res) => {
  const { senderId, senderName, senderRole, receiverId, receiverName, relatedOrderId, relatedProductId, text } = req.body;
  if (!text || !senderId || !receiverId) {
    return res.status(400).json({ error: 'Sender, receiver, and message text are required' });
  }

  const newMsg: Message = {
    id: `msg_${Date.now()}`,
    senderId,
    senderName,
    senderRole,
    receiverId,
    receiverName,
    relatedOrderId,
    relatedProductId,
    text,
    createdAt: new Date().toISOString()
  };

  messages.push(newMsg);
  res.status(201).json(newMsg);
});

// Complaints API
app.get('/api/complaints', (req, res) => {
  const { userId } = req.query;
  let filtered = [...complaints];
  if (userId) filtered = filtered.filter((c) => c.userId === userId);
  res.json(filtered);
});

app.post('/api/complaints', (req, res) => {
  const { orderId, userId, userName, userRole, category, description } = req.body;
  const newCmp: Complaint = {
    id: `cmp_${Date.now()}`,
    orderId,
    userId,
    userName,
    userRole,
    category,
    description,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  complaints.unshift(newCmp);
  res.status(201).json(newCmp);
});

app.put('/api/complaints/:id/resolve', (req, res) => {
  const { status, adminResponse } = req.body;
  const cmp = complaints.find((c) => c.id === req.params.id);
  if (!cmp) return res.status(404).json({ error: 'Complaint not found' });
  cmp.status = status || 'Resolved';
  cmp.adminResponse = adminResponse || 'Reviewed and addressed by platform moderator.';
  cmp.resolvedAt = new Date().toISOString();
  res.json(cmp);
});

// Admin Analytics API
app.get('/api/admin/analytics', (req, res) => {
  const totalFarmers = users.filter((u) => u.role === 'farmer').length;
  const totalBuyers = users.filter((u) => u.role === 'buyer').length;
  const totalProds = products.length;
  const totalOrd = orders.length;
  const completedOrd = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const pendingOrd = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Accepted' || o.orderStatus === 'Preparing').length;
  const gmv = orders.reduce((sum, o) => sum + (o.orderStatus !== 'Cancelled' ? o.totalAmount : 0), 0);

  const categoryDistribution = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    metrics: {
      totalFarmers,
      totalBuyers,
      totalProducts: totalProds,
      totalOrders: totalOrd,
      completedOrders: completedOrd,
      pendingOrders: pendingOrd,
      grossMarketplaceValue: gmv,
      activeDisputes: complaints.filter((c) => c.status !== 'Resolved').length
    },
    categoryDistribution: Object.entries(categoryDistribution).map(([name, value]) => ({ name, value })),
    recentOrders: orders.slice(0, 5),
    recentComplaints: complaints.slice(0, 5),
    farmersToVerify: users.filter((u) => u.role === 'farmer').map((u) => ({
      user: u,
      profile: farmerProfiles[u.id]
    }))
  });
});

// Notifications API
app.get('/api/notifications', (req, res) => {
  const { userId } = req.query;
  let filtered = [...notifications];
  if (userId) filtered = filtered.filter((n) => n.userId === userId);
  res.json(filtered);
});

app.put('/api/notifications/:id/read', (req, res) => {
  const n = notifications.find((item) => item.id === req.params.id);
  if (n) n.isRead = true;
  res.json({ success: true });
});

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KisanSetu Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
