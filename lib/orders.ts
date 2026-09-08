import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/lib/cart";

export type OrderStatus =
  "checking" | "verified" | "packing" | "out-for-delivery" | "delivered" | "rejected" | "on-hold";

export type DeliverySlot = "today" | "tomorrow";
export type PaymentMethod = "cod" | "upi-after-check";

export interface Address {
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

export type Prescription =
  { via: "upload"; files: string[] } | { via: "whatsapp" } | { via: "none" };

export interface Order {
  id: string;
  createdAt: string;
  lines: CartLine[];
  address: Address;
  slot: DeliverySlot;
  payment: PaymentMethod;
  prescription: Prescription;
  note?: string;
  status: OrderStatus;
  /** Set when a pharmacist has checked the order. */
  verifiedBy?: { name: string; reg: string; date: string };
}

export interface NewOrder {
  id: string;
  lines: CartLine[];
  address: Address;
  slot: DeliverySlot;
  payment: PaymentMethod;
  prescription: Prescription;
  note?: string;
}

interface OrdersState {
  orders: Order[];
  place: (input: NewOrder) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
}

/** "VL-20817": VL and five digits. */
export function newOrderId(): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `VL-${digits}`;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      place: (input) => {
        const order: Order = {
          ...input,
          createdAt: new Date().toISOString(),
          status: "checking",
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
        })),
    }),
    { name: "vello-orders", version: 1 },
  ),
);
