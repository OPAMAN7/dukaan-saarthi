import { Product, DashboardStats, AIInsight, ChartDataPoint, Expense } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "p1", name: "Aashirvaad Atta 5kg", category: "Grains & Flour",
    quantity: 42, minQuantity: 10, costPrice: 210, sellingPrice: 245,
    expiryDate: "2026-09-15", stockStatus: "healthy", daysToExpiry: 174,
    aiSuggestedPrice: 255, trend: "up",
  },
  {
    id: "p2", name: "Amul Butter 500g", category: "Dairy",
    quantity: 6, minQuantity: 8, costPrice: 240, sellingPrice: 270,
    expiryDate: "2026-04-10", stockStatus: "low", daysToExpiry: 16,
    aiSuggestedPrice: 280, trend: "up",
  },
  {
    id: "p3", name: "Maggi Noodles 70g (pack of 12)", category: "Instant Food",
    quantity: 18, minQuantity: 5, costPrice: 144, sellingPrice: 168,
    expiryDate: "2026-07-01", stockStatus: "healthy", daysToExpiry: 98,
    aiSuggestedPrice: 165, trend: "stable",
  },
  {
    id: "p4", name: "Tropicana Orange 1L", category: "Beverages",
    quantity: 3, minQuantity: 6, costPrice: 95, sellingPrice: 120,
    expiryDate: "2026-04-01", stockStatus: "critical", daysToExpiry: 7,
    aiSuggestedPrice: 99, trend: "down",
  },
  {
    id: "p5", name: "Colgate MaxFresh 150g", category: "Personal Care",
    quantity: 28, minQuantity: 5, costPrice: 85, sellingPrice: 105,
    stockStatus: "healthy", trend: "stable",
    aiSuggestedPrice: 108,
  },
  {
    id: "p6", name: "Fortune Sunflower Oil 1L", category: "Oils & Ghee",
    quantity: 11, minQuantity: 5, costPrice: 148, sellingPrice: 175,
    expiryDate: "2027-01-20", stockStatus: "healthy", daysToExpiry: 301,
    aiSuggestedPrice: 180, trend: "up",
  },
  {
    id: "p7", name: "Tata Tea Premium 500g", category: "Tea & Coffee",
    quantity: 4, minQuantity: 5, costPrice: 230, sellingPrice: 265,
    expiryDate: "2026-12-05", stockStatus: "low", daysToExpiry: 255,
    aiSuggestedPrice: 270, trend: "up",
  },
  {
    id: "p8", name: "Lifebuoy Handwash 250ml", category: "Personal Care",
    quantity: 15, minQuantity: 5, costPrice: 65, sellingPrice: 85,
    expiryDate: "2027-03-10", stockStatus: "healthy", daysToExpiry: 350,
    aiSuggestedPrice: 85, trend: "stable",
  },
];

export const mockExpenses: Expense[] = [
  { id: "e1", label: "Rent", amount: 8000, icon: "home" },
  { id: "e2", label: "Electricity", amount: 2200, icon: "bolt" },
  { id: "e3", label: "Salaries", amount: 12000, icon: "group" },
  { id: "e4", label: "Internet & Phone", amount: 800, icon: "wifi" },
  { id: "e5", label: "Packaging", amount: 600, icon: "inventory_2" },
];

export const mockStats: DashboardStats = {
  todayProfit: 3240,
  todayRevenue: 18450,
  monthlyGoal: 120000,
  monthlyProgress: 72,
  totalProducts: 8,
  lowStockCount: 3,
  expiringCount: 2,
  topProduct: "Aashirvaad Atta 5kg",
};

export const mockInsights: AIInsight[] = [
  {
    id: "i1", productId: "p2", productName: "Amul Butter 500g",
    type: "price_increase", recommendation: "Increase price by ₹10",
    impact: "Earn ₹60 extra per day", currentPrice: 270, suggestedPrice: 280,
    priority: "high",
  },
  {
    id: "i2", productId: "p4", productName: "Tropicana Orange 1L",
    type: "clearance", recommendation: "Reduce price by ₹21 for quick sale",
    impact: "Avoid ₹285 loss from expiry", currentPrice: 120, suggestedPrice: 99,
    priority: "high",
  },
  {
    id: "i3", productId: "p7", productName: "Tata Tea Premium 500g",
    type: "restock", recommendation: "Reorder at least 10 units",
    impact: "Avoid stockout in 2 days", currentPrice: 265,
    priority: "medium",
  },
  {
    id: "i4", productId: "p6", productName: "Fortune Sunflower Oil 1L",
    type: "price_increase", recommendation: "Increase price by ₹5",
    impact: "Earn ₹55 extra this week", currentPrice: 175, suggestedPrice: 180,
    priority: "medium",
  },
  {
    id: "i5", productId: "p1", productName: "Aashirvaad Atta 5kg",
    type: "trending", recommendation: "Stock up — demand rising this week",
    impact: "Potential ₹1,200 extra revenue", currentPrice: 245,
    priority: "low",
  },
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
