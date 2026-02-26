import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-6">Save items you love for later!</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Browse Products
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Wishlist ({items.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((product) => (
            <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden card-hover">
              <Link to={`/product/${product.id}`} className="block aspect-square bg-secondary">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}><h3 className="font-semibold text-sm text-foreground line-clamp-2 hover:text-primary">{product.name}</h3></Link>
                <p className="font-bold mt-1 text-foreground">₹{product.discountPrice.toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => { addToCart(product); removeFromWishlist(product.id); }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90"
                  >
                    <ShoppingCart className="w-3 h-3" /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2 rounded-lg border border-border text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Wishlist;
