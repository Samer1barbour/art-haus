import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: Props) => {
  const { cart, total, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28 }}
            className="fixed right-0 top-0 z-[60] h-full w-full max-w-md bg-background"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Shopping Cart</p>
                  <h2 className="text-lg font-bold text-foreground">Your Items</h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-border bg-muted/40 p-2 hover:bg-muted/60"
                  aria-label="Close cart"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                {cart.length === 0 ? (
                  <div className="card-premium p-6 text-center">
                    <p className="text-muted-foreground">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="card-premium p-4 hover:translate-y-0"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-16 rounded-xl bg-charcoal object-cover"
                          />

                          <div className="flex-1">
                            <p className="font-semibold text-foreground">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                              <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-2 py-1">
                                <button
                                  type="button"
                                  onClick={() => decreaseQty(item.id)}
                                  className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="min-w-[2rem] text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => increaseQty(item.id)}
                                  className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </button>
                            </div>

                            <p className="mt-3 text-sm font-semibold text-gold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-xl font-bold text-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/order"
                  onClick={onClose}
                  className="btn-gold mt-4 block w-full text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
