import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Star, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/ProductCard";
import { products, categories, testimonials } from "@/data/products";
import { useState, useEffect } from "react";

const Index = () => {
  const featured = products.filter((p) => p.badge);
  const bestSellers = products.filter((p) => p.badge === "Best Seller");

  return (
    <MainLayout>
      {/* Hero */}
      <section className="hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl animate-slide-in-left">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4 animate-fade-in">
              🔥 Up to 50% Off This Season
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-4 animate-fade-up">
              Discover the<br />Best Deals
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-md animate-fade-up">
              Shop premium products at unbeatable prices. Free shipping on orders over ₹999.
            </p>
            <div className="flex gap-3 animate-fade-up">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-foreground text-primary font-semibold hover:opacity-90 transition-opacity"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders ₹999+" },
            { icon: Shield, label: "Secure Payment", desc: "100% protected" },
            { icon: RotateCcw, label: "Easy Returns", desc: "30 day policy" },
            { icon: Star, label: "Top Quality", desc: "Premium products" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent">
                <item.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link to="/shop" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 product-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.name}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border card-hover text-center"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div>
                <p className="font-semibold text-sm text-foreground">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 product-grid">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <FlashSaleSection />

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 product-grid">
          {(bestSellers.length > 0 ? bestSellers : products.slice(0, 4)).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8 animate-fade-up">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 product-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.avatar}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="hero-gradient rounded-3xl p-8 md:p-12 text-center animate-fade-up">
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">Get Exclusive Deals</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and get 10% off your first order!
          </p>
          <div className="flex max-w-md mx-auto gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-xl text-foreground text-sm outline-none"
            />
            <button className="px-6 py-3 bg-foreground text-background rounded-r-xl font-semibold text-sm hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

const FlashSaleSection = () => {
  const flashProducts = products.slice(0, 4);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">⚡ Flash Sale</h2>
            <p className="text-sm text-muted-foreground">Hurry! Deals end soon</p>
          </div>
          <div className="flex gap-2">
            {[
              { label: "HRS", value: pad(timeLeft.hours) },
              { label: "MIN", value: pad(timeLeft.minutes) },
              { label: "SEC", value: pad(timeLeft.seconds) },
            ].map((unit) => (
              <div key={unit.label} className="bg-foreground text-background rounded-xl px-4 py-2 text-center min-w-[60px]">
                <div className="text-xl font-bold">{unit.value}</div>
                <div className="text-[10px] opacity-60">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 product-grid">
          {flashProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
