import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

type CheckoutForm = {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
};

const OrderPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    total,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const itemsCount = useMemo(
    () => cart.reduce((s, i) => s + i.quantity, 0),
    [cart]
  );

  /* Auto redirect after success */
  useEffect(() => {
    if (step === "success") {
      const t = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(t);
    }
  }, [step, navigate]);

  /* ===============================
     PLACE ORDER VIA WHATSAPP
  =============================== */
  const placeOrderWhatsApp = () => {
    if (!form.fullName || !form.phone || !form.address) {
      alert("Please fill all required fields.");
      return;
    }

    const itemsText = cart
      .map(
        (i) =>
          `• ${i.name} x${i.quantity} = $${(
            i.price * i.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const message = `Hello Art Haus 👋
I would like to place an order.

👤 Name: ${form.fullName}
📞 Phone: ${form.phone}
📍 Address: ${form.address}

📦 Items:
${itemsText}

💰 Total: $${total.toFixed(2)}

Thank you!`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/96170073526?text=${encodedMessage}`;

    // ✅ IMPORTANT: do NOT use navigate or Link
    window.open(whatsappUrl, "_blank");

    clearCart();
    setStep("success");
  };

  /* ===============================
     SUCCESS SCREEN
  =============================== */
  if (step === "success") {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-10 text-center"
        >
          <h1 className="text-3xl font-semibold">🎉 Order Sent</h1>
          <p className="mt-4 text-muted-foreground">
            Redirecting to home in 5 seconds…
          </p>

          <button
            className="btn-gold mt-8"
            onClick={() => navigate("/")}
          >
            Go Home Now
          </button>
        </motion.div>
      </div>
    );
  }

  /* ===============================
     CART + CHECKOUT
  =============================== */
  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* BACK TO SHOP */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue shopping
      </button>

      <div className="card-premium p-6 md:p-8">
        <h1 className="text-2xl font-bold">
          {step === "cart" ? "Shopping Cart" : "Checkout"}
        </h1>

        {step === "cart" ? (
          <>
            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button onClick={() => decreaseQty(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-sm text-red-500 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="text-2xl font-bold text-gold">
                ${total.toFixed(2)}
              </p>
              <button
                className="btn-gold"
                onClick={() => setStep("checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 grid gap-4">
              <input
                placeholder="Full name"
                className="input"
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
              />
              <input
                placeholder="Phone"
                className="input"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <input
                placeholder="Address"
                className="input"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
              />
              <textarea
                placeholder="Notes"
                className="input min-h-[100px]"
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
              />
            </div>

            <div className="mt-8 flex justify-between">
              <button
                className="text-sm underline"
                onClick={() => setStep("cart")}
              >
                Back to cart
              </button>

              <button
                className="btn-gold"
                onClick={placeOrderWhatsApp}
              >
                Place Order via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
