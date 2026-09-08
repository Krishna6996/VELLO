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

export type RejectionReason =
  | "the prescription was too unclear to read"
  | "the doctor's name or registration number is missing"
  | "this medicine isn't on the prescription"
  | "the prescription is older than six months"
  | "there was nothing left to dispense";

export const rejectionReasons: readonly RejectionReason[] = [
  "the prescription was too unclear to read",
  "the doctor's name or registration number is missing",
  "this medicine isn't on the prescription",
  "the prescription is older than six months",
];

export interface Hold {
  /** The line that isn't in stock at the pharmacy. */
  slug: string;
  /** The pharmacist's suggested equivalent. */
  substitute: string;
}

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
  rejectionReason?: RejectionReason;
  hold?: Hold;
  /** ISO time the rider now expects to arrive. */
  delayedUntil?: string;
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
  update: (id: string, patch: Partial<Order>) => void;
  /** Answer an on-hold order: take the equivalent, or cancel that line. */
  resolveHold: (id: string, accept: boolean) => void;
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
      update: (id, patch) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, ...patch } : order)),
        })),
      resolveHold: (id, accept) =>
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== id || !order.hold) return order;
            const { slug, substitute } = order.hold;
            const lines = accept
              ? order.lines.map((line) =>
                  line.slug === slug ? { ...line, slug: substitute } : line,
                )
              : order.lines.filter((line) => line.slug !== slug);
            if (lines.length === 0) {
              return {
                ...order,
                lines,
                hold: undefined,
                status: "rejected",
                rejectionReason: "there was nothing left to dispense",
              };
            }
            return { ...order, lines, hold: undefined, status: "verified" };
          }),
        })),
    }),
    { name: "vello-orders", version: 1 },
  ),
);
