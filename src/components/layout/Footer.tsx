import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">Shop<span className="text-primary">Zone</span></span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Your one-stop shop for the best products at unbeatable prices. Quality guaranteed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Contact Us</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">FAQs</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Shipping Info</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Returns</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-70 mb-3">Get exclusive deals & updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-lg text-foreground text-sm outline-none"
              />
              <button className="px-4 py-2 hero-gradient text-primary-foreground rounded-r-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-center text-sm opacity-50">
          © 2026 ShopZone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
