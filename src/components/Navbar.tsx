import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "cartDrawerOpen";

const Navbar = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [bump, setBump] = useState(false);

  const count = cart.reduce((s, i) => s + i.quantity, 0);

  // persist drawer open state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(open));
  }, [open]);

  // animate cart icon when items change
  useEffect(() => {
    if (count > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 300);
      return () => clearTimeout(t);
    }
  }, [count]);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-4 py-3 md:px-6">
        <Link to="/" className="text-lg font-semibold md:text-xl">
          ArtHaus
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
          aria-label="Open cart"
        >
          <AnimatePresence>
            <motion.span
              key={bump ? "bump" : "static"}
              initial={{ scale: 1 }}
              animate={{ scale: bump ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
              className="font-medium"
            >
              Cart
            </motion.span>
          </AnimatePresence>

          {count > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-gold px-2 py-0.5 text-xs text-black">
              {count}
            </span>
          )}
        </button>
      </nav>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
