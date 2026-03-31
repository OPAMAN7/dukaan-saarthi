import { Product, DashboardStats, AIInsight, ChartDataPoint, Expense, Bill, SaleTransaction, MonthlySummary } from "@/types";

export const mockProducts: Product[] = [
  { id: "p1", name: "Aashirvaad Atta 5kg",          category: "Grains & Flour",  quantity: 42, minQuantity: 10, costPrice: 210, sellingPrice: 245, expiryDate: "2026-09-15", stockStatus: "healthy", daysToExpiry: 174, aiSuggestedPrice: 255, trend: "up" },
  { id: "p2", name: "Amul Butter 500g",              category: "Dairy",           quantity: 6,  minQuantity: 8,  costPrice: 240, sellingPrice: 270, expiryDate: "2026-04-10", stockStatus: "low",     daysToExpiry: 16,  aiSuggestedPrice: 280, trend: "up" },
  { id: "p3", name: "Maggi Noodles (pack of 12)",    category: "Instant Food",    quantity: 18, minQuantity: 5,  costPrice: 144, sellingPrice: 168, expiryDate: "2026-07-01", stockStatus: "healthy", daysToExpiry: 98,  aiSuggestedPrice: 165, trend: "stable" },
  { id: "p4", name: "Tropicana Orange 1L",           category: "Beverages",       quantity: 3,  minQuantity: 6,  costPrice: 95,  sellingPrice: 120, expiryDate: "2026-04-01", stockStatus: "critical",daysToExpiry: 7,   aiSuggestedPrice: 99,  trend: "down" },
  { id: "p5", name: "Colgate MaxFresh 150g",         category: "Personal Care",   quantity: 28, minQuantity: 5,  costPrice: 85,  sellingPrice: 105, stockStatus: "healthy", trend: "stable", aiSuggestedPrice: 108 },
  { id: "p6", name: "Fortune Sunflower Oil 1L",      category: "Oils & Ghee",     quantity: 11, minQuantity: 5,  costPrice: 148, sellingPrice: 175, expiryDate: "2027-01-20", stockStatus: "healthy", daysToExpiry: 301, aiSuggestedPrice: 180, trend: "up" },
  { id: "p7", name: "Tata Tea Premium 500g",         category: "Tea & Coffee",    quantity: 4,  minQuantity: 5,  costPrice: 230, sellingPrice: 265, expiryDate: "2026-12-05", stockStatus: "low",     daysToExpiry: 255, aiSuggestedPrice: 270, trend: "up" },
  { id: "p8", name: "Lifebuoy Handwash 250ml",       category: "Personal Care",   quantity: 15, minQuantity: 5,  costPrice: 65,  sellingPrice: 85,  expiryDate: "2027-03-10", stockStatus: "healthy", daysToExpiry: 350, aiSuggestedPrice: 85,  trend: "stable" },
];

export const mockExpenses: Expense[] = [
  { id: "e1", label: "Rent",            amount: 8000,  icon: "home" },
  { id: "e2", label: "Electricity",     amount: 2200,  icon: "bolt" },
  { id: "e3", label: "Salaries",        amount: 12000, icon: "group" },
  { id: "e4", label: "Internet & Phone",amount: 800,   icon: "wifi" },
  { id: "e5", label: "Packaging",       amount: 600,   icon: "inventory_2" },
];

export const mockStats: DashboardStats = {
  todayProfit: 3240, todayRevenue: 18450, monthlyGoal: 120000,
  monthlyProgress: 72, totalProducts: 8, lowStockCount: 3,
  expiringCount: 2, topProduct: "Aashirvaad Atta 5kg",
};

export const mockInsights: AIInsight[] = [
  { id: "i1", productId: "p2", productName: "Amul Butter 500g",       type: "price_increase", recommendation: "Increase price by ₹10",           impact: "Earn ₹60 extra per day",          currentPrice: 270, suggestedPrice: 280, priority: "high" },
  { id: "i2", productId: "p4", productName: "Tropicana Orange 1L",    type: "clearance",      recommendation: "Reduce price by ₹21 for quick sale",impact: "Avoid ₹285 loss from expiry",    currentPrice: 120, suggestedPrice: 99,  priority: "high" },
  { id: "i3", productId: "p7", productName: "Tata Tea Premium 500g",  type: "restock",        recommendation: "Reorder at least 10 units",         impact: "Avoid stockout in 2 days",       currentPrice: 265,                      priority: "medium" },
  { id: "i4", productId: "p6", productName: "Fortune Sunflower Oil 1L",type: "price_increase",recommendation: "Increase price by ₹5",              impact: "Earn ₹55 extra this week",       currentPrice: 175, suggestedPrice: 180, priority: "medium" },
  { id: "i5", productId: "p1", productName: "Aashirvaad Atta 5kg",    type: "trending",       recommendation: "Stock up — demand rising this week", impact: "Potential ₹1,200 extra revenue", currentPrice: 245,                      priority: "low" },
];

export const mockChartData: ChartDataPoint[] = [
  { day: "Mon", revenue: 14200, profit: 2840 },
  { day: "Tue", revenue: 16800, profit: 3360 },
  { day: "Wed", revenue: 13500, profit: 2700 },
  { day: "Thu", revenue: 19200, profit: 3840 },
  { day: "Fri", revenue: 22100, profit: 4420 },
  { day: "Sat", revenue: 24600, profit: 4920 },
  { day: "Sun", revenue: 18450, profit: 3240 },
];

// ── Finances mock data ────────────────────────────────────────────────────────

export const mockBills: Bill[] = [
  { id: "b1", label: "Shop Rent",          category: "rent",        amount: 8000,  dueDate: "2026-04-01", status: "paid",    icon: "home",           recurring: true,  paidDate: "2026-03-31" },
  { id: "b2", label: "Electricity Bill",   category: "electricity", amount: 2200,  dueDate: "2026-04-05", status: "unpaid",  icon: "bolt",           recurring: true  },
  { id: "b3", label: "Staff Salaries",     category: "salaries",    amount: 12000, dueDate: "2026-04-07", status: "unpaid",  icon: "group",          recurring: true  },
  { id: "b4", label: "Internet & Phone",   category: "internet",    amount: 800,   dueDate: "2026-04-10", status: "unpaid",  icon: "wifi",           recurring: true  },
  { id: "b5", label: "Packaging Materials",category: "supplies",    amount: 1400,  dueDate: "2026-04-12", status: "unpaid",  icon: "inventory_2",    recurring: false },
  { id: "b6", label: "Shop Maintenance",   category: "maintenance", amount: 500,   dueDate: "2026-03-28", status: "overdue", icon: "construction",   recurring: false },
  { id: "b7", label: "Water Bill",         category: "electricity", amount: 350,   dueDate: "2026-04-15", status: "unpaid",  icon: "water_drop",     recurring: true  },
  { id: "b8", label: "Wholesale Supplies", category: "supplies",    amount: 34000, dueDate: "2026-04-03", status: "paid",    icon: "local_shipping", recurring: false, paidDate: "2026-04-02" },
];

export const mockSales: SaleTransaction[] = [
  { id: "s1",  date: "2026-03-31", productName: "Aashirvaad Atta 5kg",       category: "Grains & Flour", qty: 8,  unitPrice: 245, totalRevenue: 1960, totalCost: 1680, profit: 280 },
  { id: "s2",  date: "2026-03-31", productName: "Amul Butter 500g",           category: "Dairy",          qty: 4,  unitPrice: 270, totalRevenue: 1080, totalCost: 960,  profit: 120 },
  { id: "s3",  date: "2026-03-31", productName: "Maggi Noodles (pack of 12)", category: "Instant Food",   qty: 6,  unitPrice: 168, totalRevenue: 1008, totalCost: 864,  profit: 144 },
  { id: "s4",  date: "2026-03-30", productName: "Colgate MaxFresh 150g",      category: "Personal Care",  qty: 12, unitPrice: 105, totalRevenue: 1260, totalCost: 1020, profit: 240 },
  { id: "s5",  date: "2026-03-30", productName: "Fortune Sunflower Oil 1L",   category: "Oils & Ghee",    qty: 5,  unitPrice: 175, totalRevenue: 875,  totalCost: 740,  profit: 135 },
  { id: "s6",  date: "2026-03-30", productName: "Tata Tea Premium 500g",      category: "Tea & Coffee",   qty: 3,  unitPrice: 265, totalRevenue: 795,  totalCost: 690,  profit: 105 },
  { id: "s7",  date: "2026-03-29", productName: "Lifebuoy Handwash 250ml",    category: "Personal Care",  qty: 9,  unitPrice: 85,  totalRevenue: 765,  totalCost: 585,  profit: 180 },
  { id: "s8",  date: "2026-03-29", productName: "Aashirvaad Atta 5kg",        category: "Grains & Flour", qty: 10, unitPrice: 245, totalRevenue: 2450, totalCost: 2100, profit: 350 },
  { id: "s9",  date: "2026-03-28", productName: "Tropicana Orange 1L",        category: "Beverages",      qty: 7,  unitPrice: 120, totalRevenue: 840,  totalCost: 665,  profit: 175 },
  { id: "s10", date: "2026-03-28", productName: "Maggi Noodles (pack of 12)", category: "Instant Food",   qty: 11, unitPrice: 168, totalRevenue: 1848, totalCost: 1584, profit: 264 },
  { id: "s11", date: "2026-03-27", productName: "Amul Butter 500g",           category: "Dairy",          qty: 6,  unitPrice: 270, totalRevenue: 1620, totalCost: 1440, profit: 180 },
  { id: "s12", date: "2026-03-27", productName: "Fortune Sunflower Oil 1L",   category: "Oils & Ghee",    qty: 4,  unitPrice: 175, totalRevenue: 700,  totalCost: 592,  profit: 108 },
];

export const mockMonthlySummary: MonthlySummary[] = [
  { month: "Oct", revenue: 82000,  expenses: 28000, profit: 54000 },
  { month: "Nov", revenue: 91000,  expenses: 29500, profit: 61500 },
  { month: "Dec", revenue: 115000, expenses: 32000, profit: 83000 },
  { month: "Jan", revenue: 98000,  expenses: 30000, profit: 68000 },
  { month: "Feb", revenue: 87000,  expenses: 28800, profit: 58200 },
  { month: "Mar", revenue: 104000, expenses: 31200, profit: 72800 },
];
