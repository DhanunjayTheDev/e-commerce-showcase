import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Heart, LogOut } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const mockOrders = [
    { id: "SZ-A1B2C3", date: "2026-02-20", total: 4498, status: "Delivered", items: 3 },
    { id: "SZ-D4E5F6", date: "2026-02-15", total: 2199, status: "In Transit", items: 1 },
    { id: "SZ-G7H8I9", date: "2026-02-10", total: 6997, status: "Processing", items: 5 },
  ];

  const tabs = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "account", label: "Account", icon: User },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center text-primary-foreground text-xl font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground text-sm">#{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date} · {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" :
                    order.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                    "bg-accent text-accent-foreground"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            {wishlistItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No items in your wishlist</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wishlistItems.map((p) => (
                  <div key={p.id} className="bg-card rounded-xl border border-border p-4">
                    <p className="font-semibold text-sm text-foreground truncate">{p.name}</p>
                    <p className="font-bold text-sm mt-1">₹{p.discountPrice.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "account" && (
          <div className="max-w-md space-y-4">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                <input type="text" value={user?.name || ""} readOnly className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-secondary text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input type="email" value={user?.email || ""} readOnly className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-secondary text-foreground" />
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
