import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";

const STORAGE_KEY = "cartDrawerOpen";

const Header = () => {
  const { cart } = useCart();

  const count = cart.reduce((s, i) => s + i.quantity, 0);

  const [open, setOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [bump, setBump] = useState(false);

  // persist open state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(open));
    } catch {
      // ignore
    }
  }, [open]);

  // bump animation when cart count changes
  useEffect(() => {
    if (count > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 250);
      return () => clearTimeout(t);
    }
  }, [count]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 right-0 top-0 z-40 bg-background/80 backdrop-blur-lg"
      >
        <div className="container flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-gradient-gold text-xl font-bold tracking-tight md:text-2xl">
              ART HAUS
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#collection"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Collection
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              About
            </a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Shop Now (desktop) */}
            <a
              href="#collection"
              className="hidden md:inline-flex btn-gold-outline px-6 py-2 text-sm"
            >
              Shop Now
            </a>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center justify-center rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted/60"
              aria-label="Open cart"
            >
              <AnimatePresence>
                <motion.span
                  key={bump ? "bump" : "static"}
                  initial={{ scale: 1 }}
                  animate={{ scale: bump ? 1.12 : 1 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4 text-gold" />
                  <span className="hidden sm:inline">Cart</span>
                </motion.span>
              </AnimatePresence>

              {count > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-black">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
