import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductGrid = () => {
  return (
    <section id="collection" className="relative py-20 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-gold">
            Our Collection
          </span>
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Designer Arts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Each piece is meticulously crafted to bring character and elegance to your space.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
