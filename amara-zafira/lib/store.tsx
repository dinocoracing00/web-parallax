"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import type { Product } from "@/data/types";
import { WELCOME_CODE, shipping } from "@/lib/site";

export interface CartItem {
  slug: string;
  color: string;
  size: string;
  qty: number;
}

export interface CartLine extends CartItem {
  key: string;
  product: Product;
  lineTotal: number;
}

interface State {
  cart: CartItem[];
  wishlist: string[];
  promo: string | null;
  /** true cuando ya se ha leído lo guardado en el navegador. */
  ready: boolean;
}

type Action =
  | { type: "hydrate"; state: Omit<State, "ready"> }
  | { type: "add"; item: CartItem }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "toggleWish"; slug: string }
  | { type: "promo"; code: string | null };

const STORAGE_KEY = "amara-zafira:v1";
const itemKey = (i: Pick<CartItem, "slug" | "color" | "size">) => `${i.slug}|${i.color}|${i.size}`;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { ...action.state, ready: true };
    case "add": {
      const key = itemKey(action.item);
      const existing = state.cart.find((i) => itemKey(i) === key);
      const cart = existing
        ? state.cart.map((i) => (itemKey(i) === key ? { ...i, qty: Math.min(10, i.qty + action.item.qty) } : i))
        : [...state.cart, action.item];
      return { ...state, cart };
    }
    case "setQty":
      return {
        ...state,
        cart: state.cart
          .map((i) => (itemKey(i) === action.key ? { ...i, qty: Math.max(0, Math.min(10, action.qty)) } : i))
          .filter((i) => i.qty > 0),
      };
    case "remove":
      return { ...state, cart: state.cart.filter((i) => itemKey(i) !== action.key) };
    case "clear":
      return { ...state, cart: [], promo: null };
    case "toggleWish":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.slug)
          ? state.wishlist.filter((s) => s !== action.slug)
          : [...state.wishlist, action.slug],
      };
    case "promo":
      return { ...state, promo: action.code };
  }
}

interface StoreValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  promo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  addToCart: (item: CartItem) => void;
  setQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  isWished: (slug: string) => boolean;
  toggleWish: (slug: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  hydrated: boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { cart: [], wishlist: [], promo: null, ready: false });
  const hydrated = state.ready;
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Recupera la cesta y favoritos guardados.
  useEffect(() => {
    let saved: Partial<State> = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      // Almacenamiento no disponible: la tienda funciona igual sin persistencia.
    }
    dispatch({
      type: "hydrate",
      state: {
        cart: (saved.cart ?? []).filter((i) => getProduct(i.slug)),
        wishlist: (saved.wishlist ?? []).filter((s) => getProduct(s)),
        promo: saved.promo ?? null,
      },
    });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    try {
      const { cart, wishlist, promo } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, promo }));
    } catch {}
  }, [state]);

  const lines = useMemo<CartLine[]>(
    () =>
      state.cart.flatMap((item) => {
        const product = getProduct(item.slug);
        return product ? [{ ...item, key: itemKey(item), product, lineTotal: product.price * item.qty }] : [];
      }),
    [state.cart],
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const discount = state.promo === WELCOME_CODE ? Math.round(subtotal * 10) / 100 : 0;
  const shippingCost = subtotal === 0 || subtotal - discount >= shipping.freeFrom ? 0 : shipping.standard;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const addToCart = useCallback((item: CartItem) => {
    dispatch({ type: "add", item });
    setCartOpen(true);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === WELCOME_CODE;
    if (ok) dispatch({ type: "promo", code: WELCOME_CODE });
    return ok;
  }, []);

  const value: StoreValue = {
    lines,
    count,
    subtotal,
    discount,
    shippingCost,
    total,
    promo: state.promo,
    applyPromo,
    removePromo: () => dispatch({ type: "promo", code: null }),
    addToCart,
    setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
    removeFromCart: (key) => dispatch({ type: "remove", key }),
    clearCart: () => dispatch({ type: "clear" }),
    wishlist: state.wishlist,
    isWished: (slug) => state.wishlist.includes(slug),
    toggleWish: (slug) => dispatch({ type: "toggleWish", slug }),
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    hydrated,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de <StoreProvider>");
  return ctx;
}
