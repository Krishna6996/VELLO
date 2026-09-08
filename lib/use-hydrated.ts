import { useSyncExternalStore } from "react";
import { useCart } from "@/lib/cart";
import { useOrders } from "@/lib/orders";

function subscribeCart(onChange: () => void): () => void {
  return useCart.persist.onFinishHydration(onChange);
}

function subscribeOrders(onChange: () => void): () => void {
  return useOrders.persist.onFinishHydration(onChange);
}

/** True once the persisted cart has loaded on the client. False during SSR. */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    subscribeCart,
    () => useCart.persist.hasHydrated(),
    () => false,
  );
}

/** True once the persisted orders have loaded on the client. False during SSR. */
export function useOrdersHydrated(): boolean {
  return useSyncExternalStore(
    subscribeOrders,
    () => useOrders.persist.hasHydrated(),
    () => false,
  );
}
