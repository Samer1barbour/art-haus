import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <nav className="flex items-center justify-between border-b px-6 py-4">
        <Link to="/" className="text-xl font-semibold">
          ArtHaus
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="relative text-sm"
        >
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 rounded-full bg-gold px-2 py-0.5 text-xs text-black">
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
