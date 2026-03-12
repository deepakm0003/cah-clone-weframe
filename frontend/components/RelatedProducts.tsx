"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const relatedProducts = [
  {
    id: 1,
    title: "Tales Vol. 1",
    description: "A book of fill-in-the-blank stories to play with your CAH cards.",
    image: "/images/image.png",
    price: "€19.99",
    priceNum: 19.99,
    isNew: true,
    available: true,
    href: "https://www.cardsagainsthumanity.com/products/tales-vol-1",
  },
  {
    id: 2,
    title: "Shit List",
    description: "A fresh way to play CAH where YOU write the answers, plus 80 black cards.",
    image: "/images/1.png",
    price: "€22.99",
    priceNum: 22.99,
    isNew: true,
    available: true,
    href: "https://www.cardsagainsthumanity.com/products/shit-list",
  },
  {
    id: 3,
    title: "Twists Bundle",
    description: "It's like playing for the first time again, four more times.",
    image: "/images/2.png",
    price: null,
    priceNum: 0,
    isNew: true,
    available: false,
    href: "https://www.cardsagainsthumanity.com/products/twists-bundle",
  },
];

type Product = (typeof relatedProducts)[0];
type CartItem = { product: Product; qty: number };

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({
  items,
  onClose,
  onUpdateQty,
  onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const subtotal = items.reduce((sum, i) => sum + i.product.priceNum * i.qty, 0);

  return (
    <div
      className="fixed right-0 bottom-0 w-[380px] bg-white flex flex-col"
      style={{
        top: "80px",
        zIndex: 999,
        animation: "cartSlideIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-center px-6 pt-6 pb-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="absolute left-6 w-9 h-9 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
        <h2 className="text-black font-black text-[30px] tracking-tight">Cart</h2>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-gray-400 text-[15px] text-center mt-10">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.product.id}>
              <div className="flex items-start gap-4">
                <div className="relative w-[72px] h-[90px] flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-black font-bold text-[16px] leading-tight">
                      {item.product.title}
                    </span>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-black transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-500" strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-[10px]">
                      <button
                        onClick={() =>
                          item.qty <= 1
                            ? onRemove(item.product.id)
                            : onUpdateQty(item.product.id, item.qty - 1)
                        }
                        className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all text-[15px] font-bold"
                      >
                        −
                      </button>
                      <span className="text-black font-bold text-[15px] w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all text-[15px] font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-black font-bold text-[16px]">
                      €{(item.product.priceNum * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-b border-gray-200" />
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-3">
        <div className="flex items-center justify-between py-3 border-t border-gray-300">
          <span className="text-black font-black text-[18px]">Subtotal</span>
          <span className="text-black font-black text-[18px]">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="border-b border-gray-300 mb-5" />
        <button className="w-full bg-black text-white font-black text-[18px] py-[16px] rounded-full hover:bg-gray-900 transition-colors">
          Check Out
        </button>
      </div>
    </div>
  );
}

// ─── TiltImage ────────────────────────────────────────────────────────────────
function TiltImage({ src, alt }: { src: string; alt: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ height: "340px", perspective: "800px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          transform: "translateX(-50%)",
          width: isHovered ? "70%" : "40%",
          height: "24px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.7)",
          filter: "blur(14px)",
          opacity: isHovered ? 0.9 : 0.3,
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      <div
        className="relative w-full h-full"
        style={{
          transform: isHovered
            ? "rotateY(20deg) scale(1.22) translateY(-14px)"
            : "rotateY(0deg) scale(1) translateY(0px)",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease",
          filter: isHovered
            ? "brightness(1.25) contrast(1.05) drop-shadow(0 30px 50px rgba(0,0,0,0.95))"
            : "brightness(0.78) drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
          willChange: "transform",
        }}
      >
        <Image src={src} alt={alt} fill className="object-contain px-8 py-4" />
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  cartItem,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  product: Product;
  cartItem: CartItem | undefined;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const isAdded = !!cartItem;
  const qty = cartItem?.qty ?? 0;

  return (
    <div
      className="relative flex flex-col rounded-[18px] overflow-visible"
      style={{
        border: "1.5px solid rgba(255,255,255,0.85)",
        background: "#000",
        height: "620px",
      }}
    >
      {product.isNew && (
        <div className="absolute -top-5 -right-5 z-20">
          <img
            src="https://img.cah.io/images/vc07edlh/production/c0ee4be15f90a7322e8c9ed463201e62418be4f7-103x102.svg?auto=format&q=75&w=200"
            alt="New!"
            width={72}
            height={72}
            style={{ animation: "wobble 2.5s ease-in-out infinite", transformOrigin: "center center" }}
            className="drop-shadow-md"
          />
        </div>
      )}

      <div className="px-6 pt-6" style={{ minHeight: "108px" }}>
        <h3 className="text-white font-black text-[24px] leading-[1.1] tracking-tight mb-[10px]">
          {product.title}
        </h3>
        <p className="text-white/80 text-[15px] leading-[1.45] font-normal">
          {product.description}
        </p>
      </div>

      <div className="flex-1 relative" style={{ minHeight: 0 }}>
        <TiltImage src={product.image} alt={product.title} />
      </div>

      <div className="px-5 pb-5 pt-3">
        {product.available ? (
          isAdded ? (
            <div
              className="flex items-center justify-between w-full rounded-full px-2 py-2"
              style={{ background: "#fff", border: "1.5px solid #fff" }}
            >
              <div className="flex items-center justify-between flex-1 px-4">
                <span className="text-black font-black text-[17px]">Added!</span>
                <span className="text-black font-black text-[17px]">{product.price}</span>
              </div>
              <div className="flex items-center gap-2 bg-black rounded-full px-4 py-[10px] ml-2 flex-shrink-0">
                <button
                  onClick={onDecrement}
                  className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-black text-[13px] hover:bg-white hover:text-black transition-all duration-200"
                >
                  −
                </button>
                <span className="text-white font-black text-[15px] w-4 text-center">{qty}</span>
                <button
                  onClick={onIncrement}
                  className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-black text-[13px] hover:bg-white hover:text-black transition-all duration-200"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="w-full border-2 border-white text-white font-black text-[18px] py-[15px] px-7 rounded-full flex items-center justify-between hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Add to Cart</span>
              <span>{product.price}</span>
            </button>
          )
        ) : (
          <button
            disabled
            className="w-full border-2 border-white text-white font-black text-[16px] py-[15px] px-7 rounded-full flex items-center justify-center cursor-not-allowed opacity-60"
          >
            Unavailable In Your Region
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function RelatedProducts({
  onCartCountChange,
  onCartOpenChange,
}: {
  onCartCountChange?: (count: number) => void;
  onCartOpenChange?: (open: boolean) => void;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // ✅ cartOpen lives HERE — not in parent
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => {
    setCartOpen(true);
    onCartOpenChange?.(true);
  };

  const closeCart = () => {
    setCartOpen(false);
    onCartOpenChange?.(false);
  };

  const syncCart = (updated: CartItem[]) => {
    setCartItems(updated);
    onCartCountChange?.(updated.reduce((s, i) => s + i.qty, 0));
  };

  const handleAdd = (product: Product) => {
    const existing = cartItems.find((i) => i.product.id === product.id);
    syncCart(
      existing
        ? cartItems.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
        : [...cartItems, { product, qty: 1 }]
    );
    openCart(); // ✅ always opens immediately on add
  };

  const handleIncrement = (id: number) =>
    syncCart(cartItems.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const handleDecrement = (id: number) => {
    const item = cartItems.find((i) => i.product.id === id);
    if (!item) return;
    item.qty <= 1
      ? syncCart(cartItems.filter((i) => i.product.id !== id))
      : syncCart(cartItems.map((i) => (i.product.id === id ? { ...i, qty: i.qty - 1 } : i)));
  };

  const handleRemove = (id: number) =>
    syncCart(cartItems.filter((i) => i.product.id !== id));

  const handleUpdateQty = (id: number, qty: number) =>
    syncCart(cartItems.map((i) => (i.product.id === id ? { ...i, qty } : i)));

  return (
    <>
      <style>{`
        @keyframes wobble {
          0%   { transform: rotate(15deg); }
          25%  { transform: rotate(10deg); }
          50%  { transform: rotate(18deg); }
          75%  { transform: rotate(12deg); }
          100% { transform: rotate(15deg); }
        }
        @keyframes cartSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <section className="bg-black py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-white text-[30px] sm:text-[34px] font-black mb-10 tracking-tight">
            You should check out:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cartItems.find((i) => i.product.id === product.id)}
                onAdd={() => handleAdd(product)}
                onIncrement={() => handleIncrement(product.id)}
                onDecrement={() => handleDecrement(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ cartOpen state is local — always works */}
      {cartOpen && (
        <CartSidebar
          items={cartItems}
          onClose={closeCart}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
        />
      )}
    </>
  );
}