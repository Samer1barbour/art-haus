import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  variant?: "default" | "compact";
}

const ProductCard = ({
  product,
  index,
  variant = "default",
}: ProductCardProps) => {
  const navigate = useNavigate();
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="card-premium cursor-pointer"
    >
      {/* IMAGE */}
      <div
        className={`relative mx-auto overflow-hidden bg-charcoal ${
          isCompact
            ? "aspect-square max-h-40"
            : "aspect-[4/5] max-h-56"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        {/* Collection badge (kept subtle) */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur">
            {product.collection}
          </span>
        </div>
      </div>

      {/* INFO */}
      <div className={isCompact ? "p-4" : "p-5 md:p-6"}>
        <h3
          className={`font-semibold text-foreground ${
            isCompact ? "text-base" : "text-lg md:text-xl"
          }`}
        >
          {product.name}
        </h3>

        {!isCompact && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        <p
          className={`mt-3 font-bold text-gold ${
            isCompact ? "text-lg" : "text-xl md:text-2xl"
          }`}
        >
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
