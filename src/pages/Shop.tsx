import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    result = result.filter((p) => p.discountPrice >= priceRange[0] && p.discountPrice <= priceRange[1]);
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.discountPrice - b.discountPrice); break;
      case "price-high": result.sort((a, b) => b.discountPrice - a.discountPrice); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, priceRange, minRating, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 10000]);
    setMinRating(0);
    setCurrentPage(1);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => { setSelectedCategory(""); setCurrentPage(1); }}
            className={`block text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
              className={`block text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${selectedCategory === cat.name ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full px-2 py-1.5 border border-border rounded-lg text-sm bg-background"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full px-2 py-1.5 border border-border rounded-lg text-sm bg-background"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Minimum Rating</h3>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => { setMinRating(r); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${minRating === r ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
            >
              {r === 0 ? "All" : `${r}+⭐`}
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearFilters} className="text-sm text-primary font-medium hover:underline">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Shop</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 rounded-lg border border-border"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-60 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-background p-6 md:hidden overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              <FilterSidebar />
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {paginated.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 product-grid">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;
