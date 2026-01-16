import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);

  const product = useMemo(
    () => (id ? getProductById(id) : undefined),
    [id]
  );

  const relatedProducts = useMemo(
    () => products.filter((p) => p.id !== id),
    [id]
  );

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <button
            onClick={() => navigate("/")}
            className="btn-gold mt-4"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty
    );
    showToast("Added to cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* IMAGE (MINIMIZED) */}
          <div className="flex justify-center">
            <div className="card-premium w-full max-w-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold">
              {product.collection}
            </span>

            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            <p className="text-4xl font-bold text-gold">
              ${(product.price * qty).toFixed(2)}
            </p>

            {/* QTY */}
            <div className="flex items-center gap-4">
              <button
                className="h-8 w-8 rounded border"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{qty}</span>
              <button
                className="h-8 w-8 rounded border"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="btn-gold w-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="btn-gold-outline w-full"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* RELATED */}
        <section className="mt-20">
          <h2 className="mb-8 text-xl font-semibold">
            You may also like
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                variant="compact"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;
