import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-card rounded-xl border border-border card-hover overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary text-primary-foreground">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 text-[11px] font-semibold rounded-full bg-destructive text-destructive-foreground">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
            wishlisted
              ? "bg-primary text-primary-foreground"
              : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-foreground leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-border"}`}
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
            {product.price !== product.discountPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
