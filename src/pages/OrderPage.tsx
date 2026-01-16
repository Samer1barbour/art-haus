import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Minus, Plus } from "lucide-react";
import { getProductById } from "@/data/products";
import { generateWhatsAppMessage, getWhatsAppUrl } from "@/config/whatsapp";
import { z } from "zod";

const orderSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone too long"),
  address: z.string().trim().min(1, "Address is required").max(300, "Address too long"),
});

const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <button onClick={() => navigate("/")} className="btn-gold mt-4">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Generate WhatsApp message and redirect
    const message = generateWhatsAppMessage(
      product.name,
      quantity,
      totalPrice,
      formData.fullName,
      formData.phone,
      formData.address
    );
    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Collection</span>
          </button>
          <span className="ml-auto text-gradient-gold text-lg font-bold">
            ART HAUS
          </span>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Product Summary */}
          <div className="card-premium overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                {product.collection}
              </span>
              <h1 className="mt-2 text-2xl font-bold md:text-3xl">
                {product.name}
              </h1>
              <p className="mt-2 text-muted-foreground">{product.description}</p>
              
              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Quantity:
                </span>
                <div className="flex items-center gap-3 rounded-full border border-border bg-muted/50 px-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2rem] text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gold">
                  ${totalPrice.toFixed(2)}
                </span>
                {quantity > 1 && (
                  <span className="text-sm text-muted-foreground">
                    (${product.price.toFixed(2)} each)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold md:text-2xl">Order Details</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your details to complete your order via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  maxLength={100}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+961 XX XXX XXX"
                  className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  maxLength={20}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, Building, Floor, City"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  maxLength={300}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="rounded-xl border border-border bg-charcoal p-5">
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Package className="h-5 w-5 text-gold" />
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit Price</span>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
                    <span>Total</span>
                    <span className="text-gold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-[#22c55e] hover:shadow-xl"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Place Order via WhatsApp
              </motion.button>

              <p className="text-center text-xs text-muted-foreground">
                Cash on delivery • No payment required now
              </p>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default OrderPage;
