import {
  User,
  FarmerProfile,
  BuyerProfile,
  Product,
  Order,
  Review,
  PriceInsight,
  BulkRequirement,
  GroupOrder,
  Message,
  Complaint,
  AppNotification
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr_farmer_1',
    name: 'Rajesh Patel',
    email: 'farmer@example.com',
    phone: '+91 98251 44521',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'usr_farmer_2',
    name: 'Mahesh Solanki',
    email: 'mahesh.farmer@example.com',
    phone: '+91 94280 12345',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-20T08:00:00Z'
  },
  {
    id: 'usr_farmer_3',
    name: 'Kiran Patel',
    email: 'kiran.farmer@example.com',
    phone: '+91 97230 67890',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-01T08:00:00Z'
  },
  {
    id: 'usr_farmer_4',
    name: 'Ramesh Chaudhary',
    email: 'ramesh.farmer@example.com',
    phone: '+91 98980 54321',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-10T08:00:00Z'
  },
  {
    id: 'usr_buyer_1',
    name: 'Anita Sharma',
    email: 'buyer@example.com',
    phone: '+91 98795 33210',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-15T08:00:00Z'
  },
  {
    id: 'usr_buyer_2',
    name: 'Vikram Mehta (FreshBite Restaurant)',
    email: 'restaurant@example.com',
    phone: '+91 98240 99887',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-18T08:00:00Z'
  },
  {
    id: 'usr_admin_1',
    name: 'Pooja Verma (SIH Admin)',
    email: 'admin@example.com',
    phone: '+91 99090 11223',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-01T08:00:00Z'
  }
];

export const initialFarmerProfiles: Record<string, FarmerProfile> = {
  usr_farmer_1: {
    id: 'fp_1',
    userId: 'usr_farmer_1',
    farmName: 'Green Valley Organic Agro',
    location: 'Boriavi Village, Anand',
    district: 'Anand',
    state: 'Gujarat',
    pincode: '388310',
    coordinates: { lat: 22.5645, lng: 72.9289 },
    farmSizeAcres: 12.5,
    verificationStatus: 'identity_verified',
    verificationLevel: 'identity_verified',
    mainCrops: ['Tomatoes', 'Potatoes', 'Okra', 'Organic Wheat'],
    rating: 4.8,
    totalReviews: 48,
    completedOrders: 142,
    bio: 'Pioneering organic vegetable and fruit farming in Charotar belt using natural drip irrigation, neem bio-pest control, and vermicompost.',
    deliveryMethods: ['farmer_delivery', 'buyer_pickup', 'partner_delivery'],
    upiId: 'rajesh.patel@okhdfcbank',
    aadhaarNumber: 'XXXX-XXXX-8921',
    landRecord712Number: '712-GUJ-ANAND-889',
    organicCertNumber: 'NPOP/NAB/0018-ORG',
    soilHealthCardNumber: 'SHC-GUJ-2024-88219',
    kycDocuments: [
      { id: 'doc_1', type: 'aadhaar', title: 'Aadhaar Identity Card', documentNumber: 'XXXX-XXXX-8921', status: 'verified', fileName: 'Aadhaar_Verified_OTP.pdf', uploadedAt: '2024-01-16T10:00:00Z' },
      { id: 'doc_2', type: 'land_record_7_12', title: '7/12 RoR Land Record Extract', documentNumber: 'Survey No. 402/1 Boriavi', status: 'verified', fileName: '712_Boriavi_Anand.pdf', uploadedAt: '2024-01-16T10:05:00Z' },
      { id: 'doc_3', type: 'organic_cert', title: 'NPOP Certified Organic Certificate', documentNumber: 'NPOP/NAB/0018-ORG', status: 'verified', fileName: 'Organic_NPOP_2024.pdf', uploadedAt: '2024-01-17T11:00:00Z' }
    ]
  },
  usr_farmer_2: {
    id: 'fp_2',
    userId: 'usr_farmer_2',
    farmName: 'Solanki Wheat & Cotton Farms',
    location: 'Jasdan, Rajkot',
    district: 'Rajkot',
    state: 'Gujarat',
    pincode: '360050',
    coordinates: { lat: 22.0315, lng: 71.2056 },
    farmSizeAcres: 25.0,
    verificationStatus: 'farm_verified',
    verificationLevel: 'farm_verified',
    mainCrops: ['Sharbati Wheat', 'Groundnut', 'Cotton'],
    rating: 4.7,
    totalReviews: 32,
    completedOrders: 89,
    bio: 'Specialist in Tukdi and Sharbati whole wheat grains and high-yield groundnut crops with certified moisture testing.',
    deliveryMethods: ['farmer_delivery', 'partner_delivery'],
    upiId: 'mahesh.solanki@okaxis',
    aadhaarNumber: 'XXXX-XXXX-4412',
    landRecord712Number: '712-GUJ-RJK-140',
    soilHealthCardNumber: 'SHC-GUJ-2024-11092',
    kycDocuments: [
      { id: 'doc_4', type: 'aadhaar', title: 'Aadhaar Identity Card', documentNumber: 'XXXX-XXXX-4412', status: 'verified', fileName: 'Aadhaar_Mahesh.pdf', uploadedAt: '2024-01-21T09:00:00Z' },
      { id: 'doc_5', type: 'land_record_7_12', title: '7/12 Land Record Extract', documentNumber: 'Survey No. 112/3 Jasdan', status: 'pending', fileName: '712_Jasdan_Survey.pdf', uploadedAt: '2024-01-21T09:30:00Z' }
    ]
  },
  usr_farmer_3: {
    id: 'fp_3',
    userId: 'usr_farmer_3',
    farmName: 'Charotar Banana & Fruit Orchard',
    location: 'Samarkha, Anand',
    district: 'Anand',
    state: 'Gujarat',
    pincode: '388365',
    coordinates: { lat: 22.5921, lng: 73.0112 },
    farmSizeAcres: 8.0,
    verificationStatus: 'identity_verified',
    verificationLevel: 'identity_verified',
    mainCrops: ['Grand Naine Banana', 'Papaya', 'Guava'],
    rating: 4.9,
    totalReviews: 29,
    completedOrders: 76,
    bio: 'Grand Naine Cavendish bananas naturally ripened without carbide. Fresh papayas and organic seasonal citrus fruits.',
    deliveryMethods: ['farmer_delivery', 'buyer_pickup'],
    upiId: 'kiran.charotar@oksbi',
    aadhaarNumber: 'XXXX-XXXX-9901',
    landRecord712Number: '712-GUJ-ANAND-332',
    kycDocuments: [
      { id: 'doc_6', type: 'aadhaar', title: 'Aadhaar Identity Card', documentNumber: 'XXXX-XXXX-9901', status: 'verified', fileName: 'Aadhaar_Kiran.pdf', uploadedAt: '2024-02-02T14:00:00Z' },
      { id: 'doc_7', type: 'land_record_7_12', title: '7/12 Land Record Extract', documentNumber: 'Survey No. 89/1 Samarkha', status: 'verified', fileName: 'Samarkha_712.pdf', uploadedAt: '2024-02-02T14:15:00Z' }
    ]
  },
  usr_farmer_4: {
    id: 'fp_4',
    userId: 'usr_farmer_4',
    farmName: 'Gir Amrut A2 Dairy & Spices',
    location: 'Junagadh Foothills',
    district: 'Junagadh',
    state: 'Gujarat',
    pincode: '362001',
    coordinates: { lat: 21.5222, lng: 70.4579 },
    farmSizeAcres: 18.0,
    verificationStatus: 'identity_verified',
    verificationLevel: 'identity_verified',
    mainCrops: ['Gir Cow A2 Milk', 'Bilona Ghee', 'Cumin', 'Coriander'],
    rating: 4.95,
    totalReviews: 64,
    completedOrders: 210,
    bio: 'Pure Gir cow A2 raw milk, bilona ghee, along with organic cumin and coriander seeds harvested from Kathiawar soil.',
    deliveryMethods: ['farmer_delivery', 'partner_delivery'],
    upiId: 'ramesh.amrut@okicici',
    aadhaarNumber: 'XXXX-XXXX-2198',
    landRecord712Number: '712-GUJ-JND-501',
    organicCertNumber: 'NPOP/NAB/0091-ORG',
    kycDocuments: [
      { id: 'doc_8', type: 'aadhaar', title: 'Aadhaar Card', documentNumber: 'XXXX-XXXX-2198', status: 'verified', fileName: 'Aadhaar_Ramesh.pdf', uploadedAt: '2024-02-11T12:00:00Z' },
      { id: 'doc_9', type: 'land_record_7_12', title: '7/12 Land Records Extract', documentNumber: 'Survey No. 201 Junagadh', status: 'verified', fileName: 'Gir_Land_712.pdf', uploadedAt: '2024-02-11T12:20:00Z' }
    ]
  }
};

export const initialBuyerProfiles: Record<string, BuyerProfile> = {
  usr_buyer_1: {
    id: 'bp_1',
    userId: 'usr_buyer_1',
    buyerType: 'consumer',
    address: 'B-402 Shivalik Residences, Bodakdev',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380054',
    coordinates: { lat: 23.0368, lng: 72.5126 }
  },
  usr_buyer_2: {
    id: 'bp_2',
    userId: 'usr_buyer_2',
    buyerType: 'restaurant',
    businessName: 'FreshBite Organic Bistro & Catering',
    address: 'Plot 12, Sindhu Bhavan Road',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380059',
    coordinates: { lat: 23.0450, lng: 72.4980 }
  }
};

export const initialProducts: Product[] = [
  {
    id: 'prod_tomato_1',
    farmerId: 'usr_farmer_1',
    farmerName: 'Rajesh Patel',
    farmName: 'Green Valley Organic Agro',
    farmerLocation: 'Anand, Gujarat',
    farmerRating: 4.8,
    farmerVerification: 'identity_verified',
    name: 'Fresh Farm Tomatoes (Hybrid Red)',
    category: 'vegetables',
    description: 'Juicy, vine-ripened tomatoes harvested at dawn. Grown with biological compost and zero chemical synthetic sprays. Ideal for household cooking, salads, and restaurants.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    quantity: 480,
    unit: 'kg',
    pricePerUnit: 25,
    marketAveragePrice: 28,
    referenceMandiPrice: 30,
    minimumOrderQuantity: 5,
    availableFrom: '2024-08-01',
    expectedHarvestDate: '2024-08-30',
    isOrganic: true,
    organicCertNumber: 'NPOP/NAB/0018-ORG',
    qualityGrade: 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: 8.5,
    createdAt: '2024-08-10T09:00:00Z'
  },
  {
    id: 'prod_potato_1',
    farmerId: 'usr_farmer_1',
    farmerName: 'Rajesh Patel',
    farmName: 'Green Valley Organic Agro',
    farmerLocation: 'Anand, Gujarat',
    farmerRating: 4.8,
    farmerVerification: 'identity_verified',
    name: 'Chandramukhi Potatoes (Fresh Harvest)',
    category: 'vegetables',
    description: 'Medium to large size fresh soil-harvested potatoes with low moisture, high starch, and thin skin. Excellent shelf life of 4+ weeks.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    quantity: 1200,
    unit: 'kg',
    pricePerUnit: 20,
    marketAveragePrice: 24,
    referenceMandiPrice: 26,
    minimumOrderQuantity: 10,
    availableFrom: '2024-08-05',
    expectedHarvestDate: '2024-08-28',
    isOrganic: false,
    qualityGrade: 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: 8.5,
    createdAt: '2024-08-12T10:30:00Z'
  },
  {
    id: 'prod_onion_1',
    farmerId: 'usr_farmer_2',
    farmerName: 'Mahesh Solanki',
    farmName: 'Solanki Wheat & Cotton Farms',
    farmerLocation: 'Rajkot, Gujarat',
    farmerRating: 4.7,
    farmerVerification: 'farm_verified',
    name: 'Nashik Red Onions (Dry & Graded)',
    category: 'vegetables',
    description: 'High pungency, sun-cured red onions. Graded at 45mm+ size with double skin layer preventing moisture rot during transit.',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80',
    quantity: 850,
    unit: 'kg',
    pricePerUnit: 32,
    marketAveragePrice: 38,
    referenceMandiPrice: 42,
    minimumOrderQuantity: 10,
    availableFrom: '2024-08-10',
    expectedHarvestDate: '2024-08-25',
    isOrganic: false,
    qualityGrade: 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: 42.0,
    createdAt: '2024-08-14T11:00:00Z'
  },
  {
    id: 'prod_wheat_1',
    farmerId: 'usr_farmer_2',
    farmerName: 'Mahesh Solanki',
    farmName: 'Solanki Wheat & Cotton Farms',
    farmerLocation: 'Rajkot, Gujarat',
    farmerRating: 4.7,
    farmerVerification: 'farm_verified',
    name: 'Premium Sharbati Whole Wheat (Cleaned)',
    category: 'grains',
    description: 'Golden, heavy grain Sharbati wheat cleaned and destoned. Makes super soft rotis with natural sweetness. Packed in clean food-grade bags.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    quantity: 35,
    unit: 'quintal',
    pricePerUnit: 3200,
    marketAveragePrice: 3600,
    referenceMandiPrice: 3800,
    minimumOrderQuantity: 1,
    availableFrom: '2024-07-20',
    expectedHarvestDate: '2024-07-15',
    isOrganic: true,
    qualityGrade: 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: 42.0,
    createdAt: '2024-08-01T08:00:00Z'
  },
  {
    id: 'prod_banana_1',
    farmerId: 'usr_farmer_3',
    farmerName: 'Kiran Patel',
    farmName: 'Charotar Banana & Fruit Orchard',
    farmerLocation: 'Anand, Gujarat',
    farmerRating: 4.9,
    farmerVerification: 'identity_verified',
    name: 'Grand Naine Cavendish Bananas (Farm Fresh)',
    category: 'fruits',
    description: 'Naturally ripened Grand Naine bananas directly from the orchard. Zero artificial carbide gas used. High potassium and creamy texture.',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    quantity: 300,
    unit: 'dozen',
    pricePerUnit: 45,
    marketAveragePrice: 55,
    referenceMandiPrice: 60,
    minimumOrderQuantity: 2,
    availableFrom: '2024-08-15',
    expectedHarvestDate: '2024-08-29',
    isOrganic: true,
    qualityGrade: 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: 12.0,
    createdAt: '2024-08-15T09:30:00Z'
  },
  {
    id: 'prod_milk_1',
    farmerId: 'usr_farmer_4',
    farmerName: 'Ramesh Chaudhary',
    farmName: 'Gir Amrut A2 Dairy & Spices',
    farmerLocation: 'Junagadh, Gujarat',
    farmerRating: 4.95,
    farmerVerification: 'identity_verified',
    name: 'Pure Gir Cow A2 Raw Milk (Chilled)',
    category: 'dairy',
    description: 'Fresh morning chilled A2 milk from grass-fed indigenous Gir cows. Unadulterated, non-homogenized, delivered in sealed sterile bottles.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    quantity: 150,
    unit: 'litre',
    pricePerUnit: 70,
    marketAveragePrice: 85,
    referenceMandiPrice: 90,
    minimumOrderQuantity: 2,
    availableFrom: '2024-08-20',
    expectedHarvestDate: '2024-08-30',
    isOrganic: true,
    qualityGrade: 'Organic Certified',
    status: 'active',
    distanceKm: 120.0,
    createdAt: '2024-08-20T06:00:00Z'
  },
  {
    id: 'prod_groundnut_1',
    farmerId: 'usr_farmer_2',
    farmerName: 'Mahesh Solanki',
    farmName: 'Solanki Wheat & Cotton Farms',
    farmerLocation: 'Rajkot, Gujarat',
    farmerRating: 4.7,
    farmerVerification: 'farm_verified',
    name: 'Saurashtra Bold Groundnut (Peanuts)',
    category: 'oilseeds',
    description: 'Sun-dried high oil content bold groundnuts. Tested for zero aflatoxin and high protein content. Ideal for snacking, cold-pressed oil, or roasting.',
    image: 'https://images.unsplash.com/photo-1567892323521-b0e6e76814e5?w=600&auto=format&fit=crop&q=80',
    quantity: 450,
    unit: 'kg',
    pricePerUnit: 85,
    marketAveragePrice: 98,
    referenceMandiPrice: 105,
    minimumOrderQuantity: 5,
    availableFrom: '2024-08-10',
    expectedHarvestDate: '2024-08-22',
    isOrganic: false,
    qualityGrade: 'Grade A (Export/Premium)',
    status: 'active',
    distanceKm: 42.0,
    createdAt: '2024-08-10T14:00:00Z'
  },
  {
    id: 'prod_cumin_1',
    farmerId: 'usr_farmer_4',
    farmerName: 'Ramesh Chaudhary',
    farmName: 'Gir Amrut A2 Dairy & Spices',
    farmerLocation: 'Junagadh, Gujarat',
    farmerRating: 4.95,
    farmerVerification: 'identity_verified',
    name: 'Aromatic Whole Jeera (Cumin Seeds)',
    category: 'spices',
    description: 'Export grade aromatic whole cumin seeds machine-cleaned with 99.5% purity. Rich natural essential oils with distinctive fragrant aroma.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    quantity: 200,
    unit: 'kg',
    pricePerUnit: 280,
    marketAveragePrice: 320,
    referenceMandiPrice: 340,
    minimumOrderQuantity: 1,
    availableFrom: '2024-08-01',
    expectedHarvestDate: '2024-07-28',
    isOrganic: true,
    qualityGrade: 'Organic Certified',
    status: 'active',
    distanceKm: 120.0,
    createdAt: '2024-08-05T12:00:00Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'FM10245',
    buyerId: 'usr_buyer_1',
    buyerName: 'Anita Sharma',
    buyerPhone: '+91 98795 33210',
    farmerId: 'usr_farmer_1',
    farmerName: 'Rajesh Patel',
    farmName: 'Green Valley Organic Agro',
    farmerPhone: '+91 98251 44521',
    items: [
      {
        productId: 'prod_tomato_1',
        productName: 'Fresh Farm Tomatoes (Hybrid Red)',
        productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        unit: 'kg',
        unitPrice: 25,
        quantity: 20,
        totalPrice: 500
      }
    ],
    produceAmount: 500,
    deliveryFee: 40,
    platformFee: 0,
    totalAmount: 540,
    deliveryType: 'farmer_delivery',
    deliveryAddress: 'B-402 Shivalik Residences, Bodakdev, Ahmedabad - 380054',
    orderStatus: 'Out for Delivery',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    notes: 'Please pack in eco-friendly crates if possible.',
    estimatedDeliveryDate: '2024-08-31',
    createdAt: '2024-08-30T10:15:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2024-08-30T10:15:00Z', note: 'Order placed by buyer via KisanDirect' },
      { status: 'Accepted', timestamp: '2024-08-30T10:30:00Z', note: 'Farmer Rajesh Patel accepted order' },
      { status: 'Preparing', timestamp: '2024-08-30T14:00:00Z', note: 'Harvested fresh from field & packed' },
      { status: 'Ready', timestamp: '2024-08-30T18:00:00Z', note: 'Checked for quality and weighed' },
      { status: 'Out for Delivery', timestamp: '2024-08-31T07:30:00Z', note: 'Dispatched via farm utility vehicle' }
    ]
  },
  {
    id: 'FM10240',
    buyerId: 'usr_buyer_2',
    buyerName: 'Vikram Mehta (FreshBite Restaurant)',
    buyerPhone: '+91 98240 99887',
    farmerId: 'usr_farmer_1',
    farmerName: 'Rajesh Patel',
    farmName: 'Green Valley Organic Agro',
    farmerPhone: '+91 98251 44521',
    items: [
      {
        productId: 'prod_potato_1',
        productName: 'Chandramukhi Potatoes (Fresh Harvest)',
        productImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
        unit: 'kg',
        unitPrice: 20,
        quantity: 100,
        totalPrice: 2000
      },
      {
        productId: 'prod_tomato_1',
        productName: 'Fresh Farm Tomatoes (Hybrid Red)',
        productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        unit: 'kg',
        unitPrice: 25,
        quantity: 50,
        totalPrice: 1250
      }
    ],
    produceAmount: 3250,
    deliveryFee: 120,
    platformFee: 0,
    totalAmount: 3370,
    deliveryType: 'partner_delivery',
    deliveryAddress: 'Plot 12, Sindhu Bhavan Road, Ahmedabad - 380059',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'NetBanking',
    estimatedDeliveryDate: '2024-08-28',
    createdAt: '2024-08-27T08:00:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2024-08-27T08:00:00Z' },
      { status: 'Accepted', timestamp: '2024-08-27T08:20:00Z' },
      { status: 'Preparing', timestamp: '2024-08-27T12:00:00Z' },
      { status: 'Ready', timestamp: '2024-08-27T16:00:00Z' },
      { status: 'Out for Delivery', timestamp: '2024-08-28T08:00:00Z' },
      { status: 'Delivered', timestamp: '2024-08-28T11:45:00Z', note: 'Received and verified by chef' }
    ]
  },
  {
    id: 'FM10238',
    buyerId: 'usr_buyer_1',
    buyerName: 'Anita Sharma',
    buyerPhone: '+91 98795 33210',
    farmerId: 'usr_farmer_3',
    farmerName: 'Kiran Patel',
    farmName: 'Charotar Banana & Fruit Orchard',
    farmerPhone: '+91 97230 67890',
    items: [
      {
        productId: 'prod_banana_1',
        productName: 'Grand Naine Cavendish Bananas (Farm Fresh)',
        productImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
        unit: 'dozen',
        unitPrice: 45,
        quantity: 5,
        totalPrice: 225
      }
    ],
    produceAmount: 225,
    deliveryFee: 30,
    platformFee: 0,
    totalAmount: 255,
    deliveryType: 'farmer_delivery',
    deliveryAddress: 'B-402 Shivalik Residences, Bodakdev, Ahmedabad - 380054',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    estimatedDeliveryDate: '2024-08-24',
    createdAt: '2024-08-23T14:30:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2024-08-23T14:30:00Z' },
      { status: 'Accepted', timestamp: '2024-08-23T15:00:00Z' },
      { status: 'Delivered', timestamp: '2024-08-24T10:00:00Z' }
    ]
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev_1',
    orderId: 'FM10240',
    productId: 'prod_tomato_1',
    productName: 'Fresh Farm Tomatoes (Hybrid Red)',
    buyerId: 'usr_buyer_2',
    buyerName: 'Vikram Mehta (FreshBite)',
    farmerId: 'usr_farmer_1',
    rating: 5,
    qualityRating: 5,
    deliveryRating: 5,
    comment: 'Super fresh, uniform size and delicious taste. Our restaurant guests noticed the quality difference in our pasta sauce. We saved ₹6/kg compared to our regular city supplier!',
    createdAt: '2024-08-28T16:00:00Z'
  },
  {
    id: 'rev_2',
    orderId: 'FM10238',
    productId: 'prod_banana_1',
    productName: 'Grand Naine Cavendish Bananas (Farm Fresh)',
    buyerId: 'usr_buyer_1',
    buyerName: 'Anita Sharma',
    farmerId: 'usr_farmer_3',
    rating: 5,
    qualityRating: 5,
    deliveryRating: 4,
    comment: 'Naturally sweet bananas with no chemical aftertaste! Very happy to support local farmers directly.',
    createdAt: '2024-08-24T18:30:00Z'
  }
];

export const initialPriceInsights: PriceInsight[] = [
  {
    productName: 'Tomato (Hybrid Red)',
    category: 'vegetables',
    farmerDirectPrice: 25,
    marketplaceAvg: 28,
    referenceMandiPrice: 30,
    retailSupermarketPrice: 42,
    unit: 'kg',
    mandiLocation: 'APMC Ahmedabad & Anand Mandi',
    trend: 'down',
    changePercentage: -4.2,
    historicalTrend: [
      { date: 'Aug 01', farmerPrice: 28, mandiPrice: 34, retailPrice: 48 },
      { date: 'Aug 08', farmerPrice: 27, mandiPrice: 32, retailPrice: 46 },
      { date: 'Aug 15', farmerPrice: 26, mandiPrice: 31, retailPrice: 44 },
      { date: 'Aug 22', farmerPrice: 25, mandiPrice: 30, retailPrice: 42 },
      { date: 'Aug 30', farmerPrice: 25, mandiPrice: 30, retailPrice: 42 }
    ],
    intermediaryBreakdown: [
      { stage: 'Farmer Gate Price (Cost + Fair Profit)', costAdded: 25, description: 'Direct payment to grower (60% higher realization)' },
      { stage: 'Direct Logistics & Packaging', costAdded: 3, description: 'Direct transit to buyer location' },
      { stage: 'Traditional Village Trader (Aadtiya)', costAdded: 4, description: 'Avoided under KisanSetu Direct' },
      { stage: 'APMC Commission & Cess (Market Layer 1)', costAdded: 3, description: 'Avoided under KisanSetu Direct' },
      { stage: 'Wholesaler / Secondary Distributor (Layer 2)', costAdded: 4, description: 'Avoided under KisanSetu Direct' },
      { stage: 'Urban Retailer / Supermarket Margin (Layer 3)', costAdded: 6, description: 'Avoided under KisanSetu Direct' }
    ]
  },
  {
    productName: 'Nashik Red Onion',
    category: 'vegetables',
    farmerDirectPrice: 32,
    marketplaceAvg: 38,
    referenceMandiPrice: 42,
    retailSupermarketPrice: 52,
    unit: 'kg',
    mandiLocation: 'APMC Lasalgaon & Rajkot Mandi',
    trend: 'up',
    changePercentage: 6.8,
    historicalTrend: [
      { date: 'Aug 01', farmerPrice: 29, mandiPrice: 35, retailPrice: 44 },
      { date: 'Aug 08', farmerPrice: 30, mandiPrice: 37, retailPrice: 46 },
      { date: 'Aug 15', farmerPrice: 31, mandiPrice: 39, retailPrice: 48 },
      { date: 'Aug 22', farmerPrice: 32, mandiPrice: 41, retailPrice: 50 },
      { date: 'Aug 30', farmerPrice: 32, mandiPrice: 42, retailPrice: 52 }
    ],
    intermediaryBreakdown: [
      { stage: 'Farmer Gate Price', costAdded: 32, description: 'Direct farmer share' },
      { stage: 'Logistics / Bagging', costAdded: 4, description: 'Transport from field' },
      { stage: 'Intermediate Trader Margin', costAdded: 5, description: 'Avoided under KisanSetu' },
      { stage: 'APMC Yard Mandi Brokerage', costAdded: 3, description: 'Avoided under KisanSetu' },
      { stage: 'City Retail Markup', costAdded: 8, description: 'Avoided under KisanSetu' }
    ]
  },
  {
    productName: 'Sharbati Whole Wheat',
    category: 'grains',
    farmerDirectPrice: 32,
    marketplaceAvg: 36,
    referenceMandiPrice: 38,
    retailSupermarketPrice: 48,
    unit: 'kg',
    mandiLocation: 'APMC Sehore & Rajkot Yard',
    trend: 'stable',
    changePercentage: 0.5,
    historicalTrend: [
      { date: 'Aug 01', farmerPrice: 31, mandiPrice: 37, retailPrice: 47 },
      { date: 'Aug 08', farmerPrice: 32, mandiPrice: 37, retailPrice: 47 },
      { date: 'Aug 15', farmerPrice: 32, mandiPrice: 38, retailPrice: 48 },
      { date: 'Aug 22', farmerPrice: 32, mandiPrice: 38, retailPrice: 48 },
      { date: 'Aug 30', farmerPrice: 32, mandiPrice: 38, retailPrice: 48 }
    ],
    intermediaryBreakdown: [
      { stage: 'Farmer Harvest Price', costAdded: 32, description: 'High-purity grade farmgate' },
      { stage: 'Direct Milling / Clean Sacks', costAdded: 2, description: 'Food grade bag packing' },
      { stage: 'Grain Trader & Silo Storage Cut', costAdded: 6, description: 'Traditional middle tier' },
      { stage: 'Brand Packaging & Wholesale Cut', costAdded: 4, description: 'Traditional branding overhead' },
      { stage: 'Retail Store Margin', costAdded: 4, description: 'End retailer markup' }
    ]
  },
  {
    productName: 'Chandramukhi Potatoes',
    category: 'vegetables',
    farmerDirectPrice: 20,
    marketplaceAvg: 24,
    referenceMandiPrice: 26,
    retailSupermarketPrice: 34,
    unit: 'kg',
    mandiLocation: 'APMC Deesa & Anand Mandi',
    trend: 'stable',
    changePercentage: -1.2,
    historicalTrend: [
      { date: 'Aug 01', farmerPrice: 21, mandiPrice: 27, retailPrice: 35 },
      { date: 'Aug 08', farmerPrice: 20, mandiPrice: 26, retailPrice: 34 },
      { date: 'Aug 15', farmerPrice: 20, mandiPrice: 26, retailPrice: 34 },
      { date: 'Aug 22', farmerPrice: 20, mandiPrice: 26, retailPrice: 34 },
      { date: 'Aug 30', farmerPrice: 20, mandiPrice: 26, retailPrice: 34 }
    ],
    intermediaryBreakdown: [
      { stage: 'Farmer Gate Price', costAdded: 20, description: 'Grade A sorted harvest' },
      { stage: 'Direct Transport', costAdded: 2, description: 'Direct logistics' },
      { stage: 'Cold Storage Speculator Margin', costAdded: 4, description: 'Avoided under KisanSetu' },
      { stage: 'Mandi Commission Agent', costAdded: 3, description: 'Avoided under KisanSetu' },
      { stage: 'Neighborhood Vendor Markup', costAdded: 5, description: 'Avoided under KisanSetu' }
    ]
  }
];

export const initialBulkRequirements: BulkRequirement[] = [
  {
    id: 'blk_101',
    buyerId: 'usr_buyer_2',
    buyerName: 'Vikram Mehta (FreshBite Bistro)',
    buyerType: 'restaurant',
    businessName: 'FreshBite Bistro',
    productName: 'Fresh Tomatoes (Hybrid Red)',
    category: 'vegetables',
    requiredQuantity: 500,
    unit: 'kg',
    targetMaxPrice: 24,
    deliveryLocation: 'Sindhu Bhavan Road, Ahmedabad',
    requiredByDate: '2024-09-05',
    status: 'open',
    proposalsCount: 2,
    proposals: [
      {
        farmerId: 'usr_farmer_1',
        farmerName: 'Rajesh Patel',
        quotedPrice: 23.5,
        availableQuantity: 500,
        deliveryDate: '2024-09-04',
        notes: 'Can supply directly from harvest on Sept 3rd with farm vehicle.',
        createdAt: '2024-08-30T12:00:00Z'
      }
    ],
    createdAt: '2024-08-29T10:00:00Z'
  },
  {
    id: 'blk_102',
    buyerId: 'usr_buyer_2',
    buyerName: 'FreshBite Catering Hub',
    buyerType: 'restaurant',
    businessName: 'FreshBite Catering',
    productName: 'Nashik Red Onions',
    category: 'vegetables',
    requiredQuantity: 1000,
    unit: 'kg',
    targetMaxPrice: 30,
    deliveryLocation: 'Sanand Industrial Area, Ahmedabad',
    requiredByDate: '2024-09-10',
    status: 'open',
    proposalsCount: 1,
    proposals: [
      {
        farmerId: 'usr_farmer_2',
        farmerName: 'Mahesh Solanki',
        quotedPrice: 29.0,
        availableQuantity: 1000,
        deliveryDate: '2024-09-08',
        notes: 'Graded 50mm size packed in 50kg gunny bags.',
        createdAt: '2024-08-30T14:30:00Z'
      }
    ],
    createdAt: '2024-08-28T15:00:00Z'
  }
];

export const initialGroupOrders: GroupOrder[] = [
  {
    id: 'grp_201',
    productId: 'prod_tomato_1',
    productName: 'Fresh Farm Tomatoes (Hybrid Red)',
    productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    farmerId: 'usr_farmer_1',
    farmerName: 'Rajesh Patel',
    farmLocation: 'Anand, Gujarat',
    targetQuantity: 100,
    currentQuantity: 72,
    unit: 'kg',
    groupPricePerUnit: 22,
    normalPricePerUnit: 25,
    discountPercentage: 12,
    deliveryPincode: '380054',
    dropLocation: 'Bodakdev Community Drop Center, Ahmedabad',
    expiryDate: '2024-09-02T18:00:00Z',
    participantsCount: 4,
    status: 'active',
    participants: [
      { buyerId: 'usr_buyer_1', buyerName: 'Anita Sharma', quantity: 20, joinedAt: '2024-08-30T10:00:00Z' },
      { buyerId: 'usr_buyer_p2', buyerName: 'Sanjay Rawal', quantity: 25, joinedAt: '2024-08-30T11:30:00Z' },
      { buyerId: 'usr_buyer_p3', buyerName: 'Neha Desai', quantity: 15, joinedAt: '2024-08-30T14:00:00Z' },
      { buyerId: 'usr_buyer_p4', buyerName: 'Pravin Shah', quantity: 12, joinedAt: '2024-08-30T16:20:00Z' }
    ]
  },
  {
    id: 'grp_202',
    productId: 'prod_wheat_1',
    productName: 'Premium Sharbati Whole Wheat (Cleaned)',
    productImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    farmerId: 'usr_farmer_2',
    farmerName: 'Mahesh Solanki',
    farmLocation: 'Rajkot, Gujarat',
    targetQuantity: 20,
    currentQuantity: 16,
    unit: 'quintal',
    groupPricePerUnit: 3000,
    normalPricePerUnit: 3200,
    discountPercentage: 6.25,
    deliveryPincode: '380015',
    dropLocation: 'Vastrapur Society Common Plot, Ahmedabad',
    expiryDate: '2024-09-04T18:00:00Z',
    participantsCount: 3,
    status: 'active',
    participants: [
      { buyerId: 'usr_buyer_w1', buyerName: 'Girish Joshi', quantity: 6, joinedAt: '2024-08-29T09:00:00Z' },
      { buyerId: 'usr_buyer_w2', buyerName: 'Sunita Nair', quantity: 5, joinedAt: '2024-08-29T14:15:00Z' },
      { buyerId: 'usr_buyer_w3', buyerName: 'Ravi Trivedi', quantity: 5, joinedAt: '2024-08-30T08:45:00Z' }
    ]
  }
];

export const initialMessages: Message[] = [
  {
    id: 'msg_1',
    senderId: 'usr_buyer_1',
    senderName: 'Anita Sharma',
    senderRole: 'buyer',
    receiverId: 'usr_farmer_1',
    receiverName: 'Rajesh Patel',
    relatedOrderId: 'FM10245',
    relatedProductId: 'prod_tomato_1',
    text: 'Namaste Rajeshji! I placed an order for 20kg tomatoes for our society. Can you please dispatch early in the morning so they remain crisp?',
    createdAt: '2024-08-30T10:20:00Z'
  },
  {
    id: 'msg_2',
    senderId: 'usr_farmer_1',
    senderName: 'Rajesh Patel',
    senderRole: 'farmer',
    receiverId: 'usr_buyer_1',
    receiverName: 'Anita Sharma',
    relatedOrderId: 'FM10245',
    relatedProductId: 'prod_tomato_1',
    text: 'Namaste Anitaben! Yes, we harvest at 5:30 AM and pack them in cushioned crates. The delivery vehicle will reach your address before 9:00 AM. Thank you for choosing direct farm produce!',
    createdAt: '2024-08-30T10:28:00Z'
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: 'cmp_301',
    orderId: 'FM10238',
    userId: 'usr_buyer_1',
    userName: 'Anita Sharma',
    userRole: 'buyer',
    category: 'Delivery problem',
    description: 'Minor delay in delivery arrival due to rain on the highway. Produce was intact and farmer notified us beforehand.',
    status: 'Resolved',
    adminResponse: 'Reviewed with farmer delivery logs. Farmer communicated in advance. Matter resolved amicably with courtesy credit.',
    createdAt: '2024-08-24T19:00:00Z',
    resolvedAt: '2024-08-25T11:00:00Z'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif_1',
    userId: 'usr_farmer_1',
    title: 'New Order Received! 🛒',
    message: 'Anita Sharma placed order #FM10245 for 20 kg Tomatoes (₹540).',
    type: 'order',
    isRead: false,
    relatedId: 'FM10245',
    createdAt: '2024-08-30T10:15:00Z'
  },
  {
    id: 'notif_2',
    userId: 'usr_buyer_1',
    title: 'Order Status Update 🚚',
    message: 'Your order #FM10245 is now Out for Delivery by farmer Rajesh Patel.',
    type: 'order',
    isRead: false,
    relatedId: 'FM10245',
    createdAt: '2024-08-31T07:30:00Z'
  },
  {
    id: 'notif_3',
    userId: 'usr_farmer_1',
    title: 'Bulk Requirement Alert 📢',
    message: 'FreshBite Bistro posted a requirement for 500 kg Tomatoes near you.',
    type: 'price',
    isRead: true,
    relatedId: 'blk_101',
    createdAt: '2024-08-29T10:05:00Z'
  }
];
