import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(`/order/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium group"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Collection badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
            {product.collection}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 md:p-6">
        <h3 className="text-xl font-semibold text-foreground md:text-2xl">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-bold text-gold md:text-3xl">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <motion.button
          onClick={handleOrderClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-gold mt-5 w-full text-base"
        >
          Order Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
