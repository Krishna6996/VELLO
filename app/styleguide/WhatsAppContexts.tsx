import { WhatsAppOrderCard } from "@/components/whatsapp/WhatsAppOrderCard";
import { getBySlug } from "@/lib/catalog/queries";
import { Example, Section } from "./Section";

export function WhatsAppContexts() {
  const outOfStock = getBySlug("glycomet-850");
  return (
    <Section
      id="whatsapp"
      title="WhatsAppOrderCard"
      note="The second front door. One component; the copy changes with the context it appears in. Never a bubble, never a floating button, never green."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Example label="Landing">
          <WhatsAppOrderCard context={{ kind: "landing" }} />
        </Example>
        <Example label="Search miss">
          <WhatsAppOrderCard context={{ kind: "search-miss", query: "wegovy" }} />
        </Example>
        {outOfStock ? (
          <Example label="Out of stock">
            <WhatsAppOrderCard context={{ kind: "out-of-stock", sku: outOfStock }} />
          </Example>
        ) : null}
        <Example label="Pincode not serviceable">
          <WhatsAppOrderCard context={{ kind: "not-serviceable", pincode: "110001" }} />
        </Example>
        <Example label="Cart">
          <WhatsAppOrderCard
            context={{
              kind: "cart",
              lines: [
                { brand: "Glycomet 500 SR", strength: "500mg", qty: 2 },
                { brand: "Dolo 650", strength: "650mg", qty: 1 },
              ],
              pincode: "141002",
            }}
          />
        </Example>
      </div>
    </Section>
  );
}
