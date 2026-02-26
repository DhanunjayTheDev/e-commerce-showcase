import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const OrderSuccess = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-2 max-w-md mx-auto">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <p className="text-sm text-muted-foreground mb-8">Order ID: #SZ{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
        <div className="flex gap-3 justify-center">
          <Link to="/shop" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>
          <Link to="/profile" className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
            View Orders
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
