/*
  Mock API Service for Stadium Heritage Digital App
  Provides full backend functionality using localStorage for persistence.
  This enables the app to work without a real backend server.
*/

// Generate a unique ID
let idCounter = 0;
function uid() {
  return ++idCounter + Date.now() + Math.floor(Math.random() * 1000);
}

// localStorage helpers
function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function setStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Demo user data
const DEMO_USER = {
  id: 1,
  name: "Thabo Mokoena",
  email: "thabo@stadiumarea.co.ls",
  whatsapp: "+266 5800 1234",
  village: "Ha-Mabote",
  role: "member",
  createdAt: new Date().toISOString(),
};

const DEMO_ADMIN = {
  id: 2,
  name: "Admin User",
  email: "admin@stadiumarea.co.ls",
  whatsapp: "+266 5800 0000",
  village: "Maseru Central",
  role: "admin",
  createdAt: new Date().toISOString(),
};

function initDemoData() {
  if (!localStorage.getItem("mock_api_users")) {
    setStorage("mock_api_users", [DEMO_USER, DEMO_ADMIN]);
  }
  if (!localStorage.getItem("mock_api_events")) {
    const demoEvents = [
      { id: uid(), title: "Community Clean-up Day", description: "Join us for a community clean-up event at Setsoto Stadium area. Gloves and bags provided.", location: "Setsoto Stadium", eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: "approved", createdAt: new Date().toISOString(), userName: "Thabo Mokoena", userId: 1 },
      { id: uid(), title: "Youth Soccer Tournament", description: "Annual youth soccer tournament for teams under 18. Registration open until Friday.", location: "Setsoto Stadium", eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), status: "approved", createdAt: new Date().toISOString(), userName: "Admin User", userId: 2 },
      { id: uid(), title: "Heritage Week Celebration", description: "Celebrating the rich cultural heritage of Stadium Area with traditional food, music and dance.", location: "Stadium Area Community Hall", eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: "approved", createdAt: new Date().toISOString(), userName: "Admin User", userId: 2 },
    ];
    setStorage("mock_api_events", demoEvents);
  }
  if (!localStorage.getItem("mock_api_businesses")) {
    const demoBusinesses = [
      { id: uid(), name: "Setsoto Cafe", description: "A cozy cafe serving traditional Basotho cuisine and modern coffee drinks. Open daily from 7 AM.", category: "Food & Beverage", address: "Main Road, Stadium Area, Maseru", phone: "+266 2232 1234", whatsapp: "+266 5800 1234", website: "https://setsotocafe.co.ls", status: "approved", ownerName: "Mpho Letśela", ownerEmail: "mpho@setsotocafe.co.ls", createdAt: new Date().toISOString() },
      { id: uid(), name: "Stadium Hardware", description: "Building materials, tools, and home improvement supplies for the Stadium Area community.", category: "Construction & Property", address: "Commercial Street, Ha-Mabote, Maseru", phone: "+266 2232 5678", whatsapp: "+266 5800 5678", website: "", status: "approved", ownerName: "Mokhethi Mohapi", ownerEmail: "mohapi@stadiumhardware.co.ls", createdAt: new Date().toISOString() },
      { id: uid(), name: "Maseru Tailoring", description: "Custom tailoring services for traditional Basotho blankets (Basotho) and modern clothing.", category: "Arts & Crafts", address: "Market Lane, Stadium Area, Maseru", phone: "+266 2232 9012", whatsapp: "+266 5800 9012", website: "", status: "approved", ownerName: "Mamoletsane Thabane", ownerEmail: "mamoletsane@tailoring.co.ls", createdAt: new Date().toISOString() },
    ];
    setStorage("mock_api_businesses", demoBusinesses);
  }
  if (!localStorage.getItem("mock_api_marketplace")) {
    const demoMarketplace = [
      { id: uid(), title: "Traditional Basotho Blanket", description: "Hand-woven Basotho blanket in traditional patterns. Excellent condition, hardly used. Dimensions 180x150cm.", price: "2,500", category: "Clothing & Textiles", status: "approved", createdAt: new Date().toISOString(), userName: "Mamoletsane Thabane", userVillage: "Ha-Mabote", userWhatsapp: "+266 5800 9012", userId: 1 },
      { id: uid(), title: "Pre-owned Toyota Yaris", description: "2018 Toyota Yaris in good condition. 85,000 km on the clock. Full service history available.", price: "65,000", category: "General", status: "approved", createdAt: new Date().toISOString(), userName: "Thabo Mokoena", userVillage: "Stadium Area", userWhatsapp: "+266 5800 1234", userId: 1 },
      { id: uid(), title: "Maize Flour - 50kg Bags", description: "Fresh maize flour from local farms. 50kg bags available for bulk purchase. Delivery within Stadium Area.", price: "350", category: "Food & Produce", status: "approved", createdAt: new Date().toISOString(), userName: "Mokhethi Mohapi", userVillage: "Ha-Mabote", userWhatsapp: "+266 5800 5678", userId: 2 },
    ];
    setStorage("mock_api_marketplace", demoMarketplace);
  }
  if (!localStorage.getItem("mock_api_mokhosi")) {
    const demoAlerts = [
      { id: uid(), title: "Road Closure on Main Street", description: "Main Street between Setsoto Stadium and the traffic circle will be closed for repairs from Monday to Wednesday. Please use alternative routes via Ha-Mabote road.", location: "Main Street, Stadium Area", severity: "Warning", status: "approved", createdAt: new Date().toISOString(), userName: "Admin User", userId: 2, likes: 3, comments: [] },
      { id: uid(), title: "Water Supply Interruption", description: "Planned water supply interruption on Thursday from 9 AM to 3 PM for pipe maintenance. Please store water in advance.", location: "Stadium Area, Maseru", severity: "Info", status: "approved", createdAt: new Date().toISOString(), userName: "Admin User", userId: 2, likes: 5, comments: [] },
      { id: uid(), title: "Community Security Alert", description: "Increased reports of petty theft in the Stadium Area market. Please be vigilant and report suspicious activity to local authorities.", location: "Stadium Area Market", severity: "Urgent", status: "approved", createdAt: new Date().toISOString(), userName: "Thabo Mokoena", userId: 1, likes: 8, comments: [] },
    ];
    setStorage("mock_api_mokhosi", demoAlerts);
  }
  if (!localStorage.getItem("mock_api_tourism")) {
    const demoTourism = [
      { id: 1, name: "Setsoto Stadium", nameST: "Setsoto Stadium", category: "Sports & Entertainment", description: "The largest stadium in Lesotho, home to national football matches and major events. Capacity of 20,000 spectators.", descriptionST: "Stadium e kholo ka ho fetisisa Lesotho, sebaka sa lipapali tsa bolo le liketso tse kholo. Bokhoni ba batho ba 20,000.", address: "Main Road, Stadium Area, Maseru", phone: "+266 2232 1000" },
      { id: 2, name: "Stadium Area Market", nameST: "Maraka sa Sebakeng sa Setadieme", category: "Shopping & Culture", description: "A vibrant local market offering fresh produce, traditional crafts, clothing, and local delicacies.", descriptionST: "Maraka e phelang ea sechaba e fanoang ka lijo tsecha, litsebi tse khale, liaparo, le lijo tse fapaneng tse lekalekang.", address: "Market Street, Stadium Area, Maseru", phone: "+266 2232 2000" },
      { id: 3, name: "Maseru Mall", nameST: "Mall ea Maseru", category: "Shopping & Commerce", description: "The premier shopping destination in Maseru featuring international and local retail stores, restaurants, and entertainment.", descriptionST: "Sebaka sa ka sehloohong sa ho reka Maseru se nang le mabenkele a machaba le a sechaba, moo ho jehang, le tse thabisang.", address: "Kingsway Road, Maseru", phone: "+266 2232 3000" },
      { id: 4, name: "Thaba Bosiu Cultural Village", nameST: "Motse oa Setso sa Thaba Bosiu", category: "Culture & History", description: "A living museum showcasing traditional Basotho village life, crafts, and history. Guided tours available daily.", descriptionST: "Mooea oa bophelo o bontshang bophelo ba motse oa Basotho, litsebi, le histori. Maliele a laitsi a fumaneha ka letsatsi le letsatsi.", address: "Thaba Bosiu, Maseru District", phone: "+266 2232 4000" },
      { id: 5, name: "Our Lady of Victories Cathedral", nameST: "Kereke ea Rona Molelekeng", category: "Religious & Heritage", description: "A beautiful historic cathedral built in the early 20th century, featuring stunning architecture and stained glass windows.", descriptionST: "Kereke e kholo ea histori e hahiloeng khale, e nang le mokhaha o makatsang oa liphahloho le lifensetere tse ngoafetso.", address: "Cathedral Road, Maseru Central", phone: "+266 2232 5000" },
    ];
    setStorage("mock_api_tourism", demoTourism);
  }
  if (!localStorage.getItem("mock_api_messages")) {
    setStorage("mock_api_messages", []);
  }
  if (!localStorage.getItem("mock_api_ads")) {
    setStorage("mock_api_ads", []);
  }
  if (!localStorage.getItem("mock_api_current_user")) {
    // Not logged in by default
  }
}

initDemoData();

// Auth helpers
function getCurrentUser() {
  const raw = localStorage.getItem("mock_api_current_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch { return null; }
}
function setCurrentUser(user: any | null) {
  if (user) localStorage.setItem("mock_api_current_user", JSON.stringify(user));
  else localStorage.removeItem("mock_api_current_user");
}

export function clearMockData() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith("mock_api_"));
  keys.forEach(k => localStorage.removeItem(k));
  initDemoData();
}

export function isMockApiEnabled() {
  return localStorage.getItem("mock_api_enabled") === "true";
}
export function enableMockApi() {
  localStorage.setItem("mock_api_enabled", "true");
}
export function disableMockApi() {
  localStorage.removeItem("mock_api_enabled");
}

export async function mockApiFetch(url: string, options: RequestInit = {}): Promise<any> {
  const path = url.replace("/api", "");
  const method = options.method || "GET";
  const body = options.body ? JSON.parse(options.body as string) : undefined;

  await new Promise(r => setTimeout(r, 150 + Math.random() * 300)); // simulate network latency

  // Auth endpoints
  if (path === "/auth/me") {
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    return { ...user };
  }
  if (path === "/auth/login") {
    const users = getStorage<any[]>("mock_api_users", []);
    const user = users.find(u => u.email === body?.email);
    if (!user) throw new Error("Invalid credentials");
    setCurrentUser(user);
    return { ...user };
  }
  if (path === "/auth/register") {
    const users = getStorage<any[]>("mock_api_users", []);
    if (users.find(u => u.email === body?.email)) throw new Error("Email already registered");
    const newUser = { id: uid(), ...body, role: "member", createdAt: new Date().toISOString() };
    users.push(newUser);
    setStorage("mock_api_users", users);
    setCurrentUser(newUser);
    return { ...newUser };
  }
  if (path === "/auth/logout") {
    setCurrentUser(null);
    return { success: true };
  }

  // Events
  if (path === "/events" && method === "GET") {
    const events = getStorage<any[]>("mock_api_events", []);
    const user = getCurrentUser();
    if (user && user.role === "admin") return events;
    return events.filter(e => e.status === "approved");
  }
  if (path === "/events" && method === "POST") {
    const events = getStorage<any[]>("mock_api_events", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const newEvent = {
      id: uid(),
      ...body,
      status: user.role === "admin" ? "approved" : "pending",
      createdAt: new Date().toISOString(),
      userName: user.name,
      userId: user.id,
    };
    events.push(newEvent);
    setStorage("mock_api_events", events);
    return newEvent;
  }

  // Businesses
  if (path === "/businesses" && method === "GET") {
    const businesses = getStorage<any[]>("mock_api_businesses", []);
    return businesses.filter(b => b.status === "approved");
  }
  if (path === "/businesses" && method === "POST") {
    const businesses = getStorage<any[]>("mock_api_businesses", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const newBusiness = {
      id: uid(),
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
      ownerName: user.name,
      ownerEmail: user.email,
    };
    businesses.push(newBusiness);
    setStorage("mock_api_businesses", businesses);
    return newBusiness;
  }
  if (path === "/businesses/all" && method === "GET") {
    return getStorage<any[]>("mock_api_businesses", []);
  }

  // Marketplace
  if (path === "/marketplace" && method === "GET") {
    const posts = getStorage<any[]>("mock_api_marketplace", []);
    return posts.filter(p => p.status === "approved");
  }
  if (path === "/marketplace" && method === "POST") {
    const posts = getStorage<any[]>("mock_api_marketplace", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const newPost = {
      id: uid(),
      ...body,
      status: "approved",
      createdAt: new Date().toISOString(),
      userName: user.name,
      userVillage: user.village || "Stadium Area",
      userWhatsapp: user.whatsapp || "",
      userId: user.id,
    };
    posts.push(newPost);
    setStorage("mock_api_marketplace", posts);
    return newPost;
  }
  if (path === "/marketplace/mine" && method === "GET") {
    const posts = getStorage<any[]>("mock_api_marketplace", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    return posts.filter(p => p.userId === user.id);
  }

  // Messages
  if (path === "/messages" && method === "POST") {
    const messages = getStorage<any[]>("mock_api_messages", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const newMsg = {
      id: uid(),
      ...body,
      senderId: user.id,
      senderName: user.name,
      createdAt: new Date().toISOString(),
      read: false,
    };
    messages.push(newMsg);
    setStorage("mock_api_messages", messages);
    return newMsg;
  }
  if (path === "/messages/inbox" && method === "GET") {
    const messages = getStorage<any[]>("mock_api_messages", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    return messages.filter(m => m.recipientId === user.id);
  }

  // Mokhosi (Alerts)
  if (path === "/mokhosi" && method === "GET") {
    const alerts = getStorage<any[]>("mock_api_mokhosi", []);
    const user = getCurrentUser();
    if (user && user.role === "admin") return alerts;
    return alerts.filter(a => a.status === "approved");
  }
  if (path === "/mokhosi" && method === "POST") {
    const alerts = getStorage<any[]>("mock_api_mokhosi", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const newAlert = {
      id: uid(),
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
      userName: user.name,
      userId: user.id,
      likes: 0,
      comments: [],
    };
    alerts.push(newAlert);
    setStorage("mock_api_mokhosi", alerts);
    return newAlert;
  }
  if (path.match(/\/mokhosi\/\d+\/like/) && method === "POST") {
    const alertId = parseInt(path.match(/\d+/)?.[0] || "0");
    const alerts = getStorage<any[]>("mock_api_mokhosi", []);
    const idx = alerts.findIndex(a => a.id === alertId);
    if (idx >= 0) {
      alerts[idx].likes = (alerts[idx].likes || 0) + 1;
      setStorage("mock_api_mokhosi", alerts);
    }
    return { success: true };
  }
  if (path.match(/\/mokhosi\/\d+\/comments/) && method === "POST") {
    const alertId = parseInt(path.match(/\d+/)?.[0] || "0");
    const alerts = getStorage<any[]>("mock_api_mokhosi", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const idx = alerts.findIndex(a => a.id === alertId);
    if (idx >= 0) {
      const newComment = {
        id: uid(),
        alertId,
        userId: user.id,
        userName: user.name,
        content: body?.content || "",
        createdAt: new Date().toISOString(),
      };
      alerts[idx].comments = alerts[idx].comments || [];
      alerts[idx].comments.push(newComment);
      setStorage("mock_api_mokhosi", alerts);
    }
    return { success: true };
  }

  // Tourism
  if (path === "/tourism" && method === "GET") {
    return getStorage<any[]>("mock_api_tourism", []);
  }

  // Admin
  if (path === "/admin/stats" && method === "GET") {
    const user = getCurrentUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");
    const businesses = getStorage<any[]>("mock_api_businesses", []);
    const events = getStorage<any[]>("mock_api_events", []);
    const alerts = getStorage<any[]>("mock_api_mokhosi", []);
    const ads = getStorage<any[]>("mock_api_ads", []);
    const users = getStorage<any[]>("mock_api_users", []);
    return {
      userCount: users.length,
      pendingBusinesses: businesses.filter(b => b.status === "pending").length,
      pendingEvents: events.filter(e => e.status === "pending").length,
      pendingAlerts: alerts.filter(a => a.status === "pending").length,
      pendingAds: ads.filter(a => a.status === "pending").length,
    };
  }
  if (path === "/admin/users" && method === "GET") {
    const user = getCurrentUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");
    return getStorage<any[]>("mock_api_users", []);
  }
  if (path === "/advertisements/all" && method === "GET") {
    return getStorage<any[]>("mock_api_ads", []);
  }
  if (path === "/advertisements" && method === "POST") {
    const ads = getStorage<any[]>("mock_api_ads", []);
    const user = getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const newAd = {
      id: uid(),
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
      ownerName: user.name,
      ownerEmail: user.email,
    };
    ads.push(newAd);
    setStorage("mock_api_ads", ads);
    return newAd;
  }

  // Generic approval/rejection actions (used by admin panel)
  if (path.match(/\/(businesses|events|mokhosi|advertisements)\/\d+/) && (method === "PATCH" || method === "PUT")) {
    const user = getCurrentUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");
    const parts = path.split("/");
    const collection = "mock_api_" + parts[1];
    const id = parseInt(parts[2]);
    const items = getStorage<any[]>(collection, []);
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], ...body };
      setStorage(collection, items);
    }
    return { success: true };
  }
  if (path.match(/\/(businesses|events|mokhosi|advertisements|users)\/\d+/) && method === "DELETE") {
    const user = getCurrentUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");
    const parts = path.split("/");
    const collection = "mock_api_" + parts[1];
    const id = parseInt(parts[2]);
    let items = getStorage<any[]>(collection, []);
    items = items.filter(i => i.id !== id);
    setStorage(collection, items);
    return { success: true };
  }

  throw new Error(`Mock API: Unknown endpoint ${method} ${path}`);
}
