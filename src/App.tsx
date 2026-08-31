import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { BuyerDashboard } from './components/BuyerDashboard';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { AddProductModal } from './components/AddProductModal';
import { PriceInsightsModal } from './components/PriceInsightsModal';
import { BulkRequirementsModal } from './components/BulkRequirementsModal';
import { GroupBuyingHub } from './components/GroupBuyingHub';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReviewModal } from './components/ReviewModal';
import { ComplaintModal } from './components/ComplaintModal';
import { ChatDrawer } from './components/ChatDrawer';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AuthModal } from './components/AuthModal';
import { SIHDemoGuideModal } from './components/SIHDemoGuideModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

import {
  User,
  Product,
  Order,
  FarmerProfile,
  PriceInsight,
  BulkRequirement,
  GroupOrder,
  Message,
  Complaint,
  Notification,
  CartItem,
  Language,
  OrderStatus,
  DeliveryType,
  PaymentMethod
} from './types';
import { api } from './services/api';
import { initialPriceInsights } from './data/seedData';

export function App() {
  // Global Application State - Default to marketplace to immediately show fresh products
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('marketplace');

  // Domain Entities State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [farmers, setFarmers] = useState<FarmerProfile[]>([]);
  const [priceInsights, setPriceInsights] = useState<PriceInsight[]>(initialPriceInsights);
  const [bulkRequirements, setBulkRequirements] = useState<BulkRequirement[]>([]);
  const [groupOrders, setGroupOrders] = useState<GroupOrder[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modals and Drawers Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPriceInsightsOpen, setIsPriceInsightsOpen] = useState(false);
  const [isBulkHubOpen, setIsBulkHubOpen] = useState(false);
  const [isGroupHubOpen, setIsGroupHubOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Sub-entity selections for modals
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<Order | null>(null);
  const [selectedOrderForDispute, setSelectedOrderForDispute] = useState<Order | null>(null);

  // Chat Drawer State
  const [chatState, setChatState] = useState<{
    isOpen: boolean;
    recipientId: string;
    recipientName: string;
    orderId?: string;
  }>({
    isOpen: false,
    recipientId: '',
    recipientName: ''
  });

  // SIH 20-Step Demo Tour State
  const [sihTourState, setSihTourState] = useState<{
    isOpen: boolean;
    currentStep: number;
  }>({
    isOpen: false,
    currentStep: 1
  });

  // Fetch initial data on load
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [
        userRes,
        productsRes,
        ordersRes,
        farmersRes,
        insightsRes,
        bulkRes,
        groupRes,
        messagesRes,
        complaintsRes,
        notifsRes
      ] = await Promise.all([
        api.getCurrentUser(),
        api.getProducts(),
        api.getOrders(),
        api.getFarmers(),
        api.getPriceInsights(),
        api.getBulkRequirements(),
        api.getGroupOrders(),
        api.getMessages(),
        api.getComplaints(),
        api.getNotifications()
      ]);

      if (userRes) setCurrentUser(userRes);
      if (productsRes) setProducts(productsRes);
      if (ordersRes) setOrders(ordersRes);
      if (farmersRes) setFarmers(farmersRes);
      if (insightsRes && insightsRes.length > 0) setPriceInsights(insightsRes);
      if (bulkRes) setBulkRequirements(bulkRes);
      if (groupRes) setGroupOrders(groupRes);
      if (messagesRes) setMessages(messagesRes);
      if (complaintsRes) setComplaints(complaintsRes);
      if (notifsRes) setNotifications(notifsRes);
    } catch (err) {
      console.error('Error fetching initial marketplace data:', err);
    }
  };

  // --- Handlers ---

  const handleQuickSwitchUser = async (email: string) => {
    try {
      const user = await api.login(email);
      setCurrentUser(user);
      if (user.role === 'farmer') {
        setActiveTab('farmer_dashboard');
      } else if (user.role === 'admin') {
        setActiveTab('admin_dashboard');
      } else {
        setActiveTab('marketplace');
      }
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (email: string, password?: string) => {
    const user = await api.login(email, password);
    setCurrentUser(user);
    if (user.role === 'farmer') setActiveTab('farmer_dashboard');
    else if (user.role === 'admin') setActiveTab('admin_dashboard');
    else setActiveTab('marketplace');
    loadAllData();
  };

  const handleRegister = async (userData: Partial<User>) => {
    const user = await api.register(userData);
    setCurrentUser(user);
    if (user.role === 'farmer') setActiveTab('farmer_dashboard');
    else setActiveTab('marketplace');
    loadAllData();
  };

  const handleLogout = async () => {
    await api.logout();
    setCurrentUser(null);
    setActiveTab('landing');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    setCartItems([{ product, quantity }]);
    setSelectedProductDetails(null);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = async (
    items: CartItem[],
    deliveryType: DeliveryType,
    deliveryAddress: string,
    paymentMethod: PaymentMethod
  ) => {
    if (!currentUser) return;

    const farmerId = items[0].product.farmerId;
    const farmerName = items[0].product.farmerName;
    const orderItems = items.map((i) => ({
      productId: i.product.id,
      productName: i.product.name,
      productImage: i.product.image,
      quantity: i.quantity,
      unitPrice: i.product.pricePerUnit,
      unit: i.product.unit,
      totalPrice: i.quantity * i.product.pricePerUnit
    }));

    const deliveryFee = deliveryType === 'buyer_pickup' || deliveryType === 'farm_pickup' ? 0 : 40;
    const itemsTotal = orderItems.reduce((s, i) => s + i.totalPrice, 0);

    const newOrder = await api.createOrder({
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerPhone: currentUser.phone,
      farmerId,
      farmerName,
      items: orderItems,
      totalAmount: itemsTotal + deliveryFee,
      deliveryType,
      deliveryAddress,
      paymentMethod,
      orderStatus: 'Pending',
      paymentStatus: 'Paid'
    });

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    loadAllData();
  };

  // Farmer operations
  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (productToEdit) {
      const updated = await api.updateProduct(productToEdit.id, productData);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      const created = await api.createProduct(productData);
      setProducts((prev) => [created, ...prev]);
    }
    setProductToEdit(null);
    loadAllData();
  };

  const handleDeleteProduct = async (productId: string) => {
    await api.deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    note?: string
  ) => {
    const updated = await api.updateOrderStatus(orderId, status, note);
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    if (selectedOrderForTracking && selectedOrderForTracking.id === orderId) {
      setSelectedOrderForTracking(updated);
    }
  };

  // Chat operations
  const handleOpenChat = (
    recipientId: string,
    recipientName: string,
    orderId?: string
  ) => {
    setChatState({
      isOpen: true,
      recipientId,
      recipientName,
      orderId
    });
  };

  const handleSendMessage = async (
    receiverId: string,
    text: string,
    orderId?: string
  ) => {
    if (!currentUser) return;
    const newMsg = await api.sendMessage({
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId,
      text,
      orderId
    });
    setMessages((prev) => [...prev, newMsg]);
  };

  // Review & Dispute
  const handleSubmitReview = async (reviewData: any) => {
    if (!currentUser) return;
    await api.submitReview({
      ...reviewData,
      buyerId: currentUser.id,
      buyerName: currentUser.name
    });
    setSelectedOrderForReview(null);
    loadAllData();
  };

  const handleSubmitComplaint = async (complaintData: any) => {
    if (!currentUser) return;
    const newComplaint = await api.submitComplaint({
      ...complaintData,
      complainantId: currentUser.id,
      complainantName: currentUser.name
    });
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  // Admin operations
  const handleVerifyFarmer = async (farmerId: string, level: any) => {
    try {
      const updated = await api.verifyFarmer(farmerId, level);
      setFarmers((prev) =>
        prev.map((f) => (f.id === updated.id || f.userId === updated.userId || f.userId === farmerId || f.id === farmerId ? { ...f, ...updated } : f))
      );
      // Immediately update products list verification badge
      setProducts((prev) =>
        prev.map((p) => (p.farmerId === farmerId || p.farmerId === updated.userId || p.farmerId === updated.id ? { ...p, farmerVerification: level } : p))
      );
      await loadAllData();
    } catch (err) {
      console.error('Error verifying farmer:', err);
    }
  };

  const handleSubmitFarmerKYC = async (kycData: Partial<FarmerProfile>) => {
    if (!currentUser) return;
    try {
      const updated = await api.submitFarmerKYC(currentUser.id, kycData);
      setFarmers((prev) =>
        prev.map((f) => (f.userId === currentUser.id || f.id === currentUser.id ? { ...f, ...updated } : f))
      );
      await loadAllData();
    } catch (err) {
      console.error('Error submitting KYC:', err);
    }
  };

  const handleResolveComplaint = async (
    complaintId: string,
    resolutionNotes: string
  ) => {
    const updated = await api.resolveComplaint(complaintId, resolutionNotes);
    setComplaints((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleToggleProductStatus = async (
    productId: string,
    newStatus: 'active' | 'inactive'
  ) => {
    const updated = await api.updateProduct(productId, { status: newStatus as any });
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Bulk & Group Hubs
  const handleCreateBulkRequirement = async (data: Partial<BulkRequirement>) => {
    const created = await api.createBulkRequirement(data);
    setBulkRequirements((prev) => [created, ...prev]);
  };

  const handleSubmitQuote = async (requirementId: string, quote: any) => {
    const updated = await api.submitBulkQuote(requirementId, quote);
    setBulkRequirements((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const handleJoinGroupOrder = async (
    groupOrderId: string,
    quantity: number
  ) => {
    if (!currentUser) return;
    const updated = await api.joinGroupOrder(
      groupOrderId,
      currentUser.id,
      currentUser.name,
      quantity
    );
    setGroupOrders((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  };

  // --- SIH 20-Step Tour Transition Controller ---
  const handleJumpToTourStep = async (stepNumber: number) => {
    setSihTourState({ isOpen: true, currentStep: stepNumber });

    // Close all open modals first
    setIsCartOpen(false);
    setIsPriceInsightsOpen(false);
    setIsBulkHubOpen(false);
    setIsGroupHubOpen(false);
    setIsAddProductOpen(false);
    setSelectedProductDetails(null);
    setSelectedOrderForTracking(null);
    setSelectedOrderForReview(null);
    setSelectedOrderForDispute(null);
    setChatState({ isOpen: false, recipientId: '', recipientName: '' });

    switch (stepNumber) {
      case 1:
        setActiveTab('landing');
        break;
      case 2:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        break;
      case 3:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        break;
      case 4:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        setIsPriceInsightsOpen(true);
        break;
      case 5:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        setProductToEdit(null);
        setIsAddProductOpen(true);
        break;
      case 6:
        setActiveTab('marketplace');
        break;
      case 7:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        if (products.length > 0) {
          setProductToEdit(products[0]);
          setIsAddProductOpen(true);
        }
        break;
      case 8:
        await handleQuickSwitchUser('buyer@example.com');
        setActiveTab('marketplace');
        break;
      case 9:
        await handleQuickSwitchUser('buyer@example.com');
        setActiveTab('marketplace');
        break;
      case 10:
        await handleQuickSwitchUser('buyer@example.com');
        setActiveTab('marketplace');
        break;
      case 11:
        await handleQuickSwitchUser('buyer@example.com');
        setActiveTab('marketplace');
        if (products.length > 0) {
          setSelectedProductDetails(products[0]);
        }
        break;
      case 12:
        await handleQuickSwitchUser('buyer@example.com');
        setIsPriceInsightsOpen(true);
        break;
      case 13:
        await handleQuickSwitchUser('buyer@example.com');
        if (products.length > 0 && cartItems.length === 0) {
          setCartItems([{ product: products[0], quantity: 5 }]);
        }
        setIsCartOpen(true);
        break;
      case 14:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        break;
      case 15:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        if (orders.length > 0) {
          handleUpdateOrderStatus(orders[0].id, 'Accepted', 'Harvest sorted in field');
        }
        break;
      case 16:
        await handleQuickSwitchUser('buyer@example.com');
        setActiveTab('marketplace');
        if (orders.length > 0) {
          setSelectedOrderForTracking(orders[0]);
        }
        break;
      case 17:
        if (orders.length > 0) {
          handleOpenChat(orders[0].farmerId, orders[0].farmerName, orders[0].id);
        }
        break;
      case 18:
        await handleQuickSwitchUser('farmer@example.com');
        setActiveTab('farmer_dashboard');
        if (orders.length > 0) {
          handleUpdateOrderStatus(orders[0].id, 'Delivered', 'Delivered to buyer');
        }
        break;
      case 19:
        await handleQuickSwitchUser('buyer@example.com');
        if (orders.length > 0) {
          setSelectedOrderForReview(orders[0]);
        }
        break;
      case 20:
        await handleQuickSwitchUser('admin@example.com');
        setActiveTab('admin_dashboard');
        break;
      default:
        break;
    }
  };

  const currentFarmerProfile =
    farmers.find((f) => f.userId === currentUser?.id || f.id === currentUser?.id) ||
    (currentUser?.role === 'farmer' ? farmers[0] : undefined);

  const activeBuyerOrders = orders.filter(
    (o) => o.buyerId === currentUser?.id || currentUser?.role === 'buyer'
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Top Main Navbar */}
      <Navbar
        currentUser={currentUser}
        currentLanguage={currentLanguage}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        unreadNotificationsCount={notifications.filter((n) => !n.isRead).length}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onChangeLanguage={setCurrentLanguage}
        onQuickSwitchUser={handleQuickSwitchUser}
        onOpenDemoTour={() => setSihTourState({ isOpen: true, currentStep: 1 })}
        onOpenPriceInsights={() => setIsPriceInsightsOpen(true)}
        onOpenBulkHub={() => setIsBulkHubOpen(true)}
        onOpenGroupHub={() => setIsGroupHubOpen(true)}
      />

      {/* Main Viewport Router */}
      <main className="flex-1 pb-20 lg:pb-0">
        {activeTab === 'landing' && (
          <HeroLanding
            currentLanguage={currentLanguage}
            priceInsights={priceInsights}
            onExploreMarketplace={() => setActiveTab('marketplace')}
            onSellProduce={() => {
              if (currentUser?.role === 'farmer') {
                setActiveTab('farmer_dashboard');
              } else {
                handleQuickSwitchUser('farmer@example.com');
              }
            }}
            onOpenPriceInsights={() => setIsPriceInsightsOpen(true)}
            onOpenDemoTour={() => setSihTourState({ isOpen: true, currentStep: 1 })}
          />
        )}

        {activeTab === 'marketplace' && (
          <BuyerDashboard
            products={products}
            activeOrders={activeBuyerOrders}
            currentLanguage={currentLanguage}
            onViewProduct={(product) => setSelectedProductDetails(product)}
            onAddToCart={(product) => handleAddToCart(product, product.minimumOrderQuantity || 1)}
            onOpenOrderTracking={(orderId) => {
              const ord = orders.find((o) => o.id === orderId);
              if (ord) setSelectedOrderForTracking(ord);
            }}
            onOpenPriceInsights={() => setIsPriceInsightsOpen(true)}
            onOpenBulkHub={() => setIsBulkHubOpen(true)}
            onOpenGroupHub={() => setIsGroupHubOpen(true)}
          />
        )}

        {activeTab === 'farmer_dashboard' && (
          <FarmerDashboard
            currentUser={currentUser}
            farmerProfile={currentFarmerProfile}
            products={products}
            orders={orders}
            onAddProduct={() => {
              setProductToEdit(null);
              setIsAddProductOpen(true);
            }}
            onEditProduct={(product) => {
              setProductToEdit(product);
              setIsAddProductOpen(true);
            }}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onOpenChat={handleOpenChat}
            onOpenPriceInsights={() => setIsPriceInsightsOpen(true)}
            onSubmitKYC={handleSubmitFarmerKYC}
          />
        )}

        {activeTab === 'admin_dashboard' && (
          <AdminDashboard
            currentUser={currentUser}
            farmers={farmers}
            products={products}
            orders={orders}
            complaints={complaints}
            onVerifyFarmer={handleVerifyFarmer}
            onResolveComplaint={handleResolveComplaint}
            onToggleProductStatus={handleToggleProductStatus}
          />
        )}
      </main>

      {/* Mobile Bottom App Navigation Bar */}
      <MobileBottomNav
        currentUser={currentUser}
        activeTab={activeTab}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        currentLanguage={currentLanguage}
        onSelectTab={setActiveTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPriceInsights={() => setIsPriceInsightsOpen(true)}
        onOpenBulkHub={() => setIsBulkHubOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onSelectTab={setActiveTab}
        onOpenPriceInsights={() => setIsPriceInsightsOpen(true)}
        onOpenBulkHub={() => setIsBulkHubOpen(true)}
        onOpenGroupHub={() => setIsGroupHubOpen(true)}
        onOpenDemoTour={() => setSihTourState({ isOpen: true, currentStep: 1 })}
        onChangeLanguage={setCurrentLanguage}
      />

      {/* --- Specialized Modals & Drawers --- */}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProductDetails}
        currentUser={currentUser}
        onClose={() => setSelectedProductDetails(null)}
        onAddToCart={(product, qty) => {
          handleAddToCart(product, qty);
          setSelectedProductDetails(null);
        }}
        onBuyNow={handleBuyNow}
        onMessageFarmer={handleOpenChat}
        onOpenPriceInsights={() => {
          setSelectedProductDetails(null);
          setIsPriceInsightsOpen(true);
        }}
      />

      {/* Add / Edit Product Modal */}
      {isAddProductOpen && (
        <AddProductModal
          currentUser={currentUser}
          productToEdit={productToEdit}
          onClose={() => {
            setIsAddProductOpen(false);
            setProductToEdit(null);
          }}
          onSubmit={handleSaveProduct}
        />
      )}

      {/* Price Transparency & Mandi Insights Modal */}
      {isPriceInsightsOpen && (
        <PriceInsightsModal
          priceInsights={priceInsights}
          onClose={() => setIsPriceInsightsOpen(false)}
        />
      )}

      {/* Commercial Bulk Requirements Hub */}
      {isBulkHubOpen && (
        <BulkRequirementsModal
          currentUser={currentUser}
          bulkRequirements={bulkRequirements}
          onClose={() => setIsBulkHubOpen(false)}
          onCreateRequirement={handleCreateBulkRequirement}
          onSubmitQuote={handleSubmitQuote}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* Community Group Buying Hub */}
      {isGroupHubOpen && (
        <GroupBuyingHub
          currentUser={currentUser}
          groupOrders={groupOrders}
          onClose={() => setIsGroupHubOpen(false)}
          onJoinGroupOrder={handleJoinGroupOrder}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* Cart & Direct Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        currentUser={currentUser}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        onOpenAuth={() => {
          setIsCartOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Order Tracking Modal (6 Stages) */}
      <OrderTrackingModal
        order={selectedOrderForTracking}
        onClose={() => setSelectedOrderForTracking(null)}
        onOpenChat={handleOpenChat}
        onCancelOrder={(id) => handleUpdateOrderStatus(id, 'Cancelled')}
        onOpenReview={(order) => {
          setSelectedOrderForTracking(null);
          setSelectedOrderForReview(order);
        }}
        onOpenFileDispute={(order) => {
          setSelectedOrderForTracking(null);
          setSelectedOrderForDispute(order);
        }}
      />

      {/* Review Modal */}
      <ReviewModal
        order={selectedOrderForReview}
        onClose={() => setSelectedOrderForReview(null)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Dispute / Complaint Filing Modal */}
      <ComplaintModal
        order={selectedOrderForDispute}
        onClose={() => setSelectedOrderForDispute(null)}
        onSubmitComplaint={handleSubmitComplaint}
      />

      {/* Direct In-App Farmer-Buyer Chat Drawer */}
      <ChatDrawer
        isOpen={chatState.isOpen}
        currentUser={currentUser}
        recipientId={chatState.recipientId}
        recipientName={chatState.recipientName}
        orderId={chatState.orderId}
        messages={messages}
        onClose={() => setChatState({ isOpen: false, recipientId: '', recipientName: '' })}
        onSendMessage={handleSendMessage}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        notifications={notifications}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAsRead={async (id) => {
          await api.markNotificationAsRead(id);
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
          );
        }}
        onClearAll={() => setNotifications([])}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* 20-Step Live Demo Presentation Guide Modal */}
      <SIHDemoGuideModal
        isOpen={sihTourState.isOpen}
        currentStep={sihTourState.currentStep}
        onClose={() => setSihTourState({ ...sihTourState, isOpen: false })}
        onJumpToStep={handleJumpToTourStep}
      />
    </div>
  );
}

export default App;
