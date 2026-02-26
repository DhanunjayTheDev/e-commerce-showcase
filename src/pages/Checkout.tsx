import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", zip: "", payment: "cod",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/order-success");
  };

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Billing */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-bold text-foreground mb-4">Billing Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: "Phone", type: "tel" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-sm font-medium text-foreground mb-1 block">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      value={(form as any)[f.key]}
                      onChange={(e) => updateField(f.key, e.target.value)}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-bold text-foreground mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Street Address</label>
                  <input
                    type="text" required value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: "city", label: "City" },
                    { key: "state", label: "State" },
                    { key: "zip", label: "ZIP" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-sm font-medium text-foreground mb-1 block">{f.label}</label>
                      <input
                        type="text" required value={(form as any)[f.key]}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-bold text-foreground mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "card", label: "Credit / Debit Card" },
                  { value: "upi", label: "UPI" },
                ].map((p) => (
                  <label key={p.value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${form.payment === p.value ? "border-primary bg-accent" : "border-border"}`}>
                    <input type="radio" name="payment" value={p.value} checked={form.payment === p.value} onChange={(e) => updateField("payment", e.target.value)} className="accent-primary" />
                    <span className="text-sm font-medium text-foreground">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
            <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">{product.name} × {quantity}</span>
                  <span className="text-foreground shrink-0">₹{(product.discountPrice * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>₹{tax.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>₹{shipping}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button type="submit" className="w-full mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;
