import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal, tax, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({items.length})</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <Link to={`/product/${product.id}`} className="w-24 h-24 rounded-lg bg-secondary overflow-hidden shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-sm text-foreground truncate hover:text-primary">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <p className="font-bold text-foreground mt-1">₹{product.discountPrice.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary rounded-l-lg"><Minus className="w-3 h-3" /></button>
                      <span className="px-3 text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary rounded-r-lg"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
            <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (10%)</span><span className="text-foreground">₹{tax.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">₹{shipping}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span className="text-foreground">Total</span><span className="text-foreground">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-center hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="block w-full mt-3 text-center text-sm text-primary font-medium hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
