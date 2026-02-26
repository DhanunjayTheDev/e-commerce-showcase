import { useParams, Link } from "react-router-dom";
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc");

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary font-medium hover:underline">Back to Shop</Link>
        </div>
      </MainLayout>
    );
  }

  const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);
  const wishlisted = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className={`text-sm font-medium mb-6 ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : "✗ Out of Stock"}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-border rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-secondary rounded-l-xl transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-semibold text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2.5 hover:bg-secondary rounded-r-xl transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className={`p-3 rounded-xl border-2 transition-colors ${wishlisted ? "border-primary bg-accent text-primary" : "border-border text-foreground hover:border-primary"}`}
              >
                <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex items-center gap-2 p-4 rounded-xl bg-accent text-sm text-accent-foreground">
              <Truck className="w-5 h-5" />
              Free delivery on orders over ₹999
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex gap-4 border-b border-border mb-4">
                <button
                  onClick={() => setActiveTab("desc")}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "desc" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                >
                  Specifications
                </button>
              </div>
              {activeTab === "desc" ? (
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
