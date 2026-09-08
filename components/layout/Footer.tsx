import Link from "next/link";
import { footerLinks, primaryNav, whatsappNav } from "@/components/layout/nav";
import { Wordmark } from "@/components/layout/Wordmark";

const licenceBlock: readonly string[] = [
  "Dispensed by Sharma Medicos, B-12, Model Town, Ludhiana 141002. Drug licence no. PB-LDH-20/21-XXXXX.",
  "Pharmacist-in-charge: Anil Mehta, Registered Pharmacist, Reg no. PB-45821.",
  "Grievance officer: [name], grievance@vello.in. We respond within 48 hours.",
  "[Legal entity name] Private Limited. Registered office: DLF Prime Tower, Okhla, New Delhi.",
];

const linkClass =
  "inline-flex min-h-11 items-center text-body text-ink-secondary hover:text-ink md:min-h-9";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas print:hidden">
      <div className="mx-auto grid w-full max-w-page gap-10 px-6 py-12 md:grid-cols-3 md:gap-6 md:px-10 md:py-16 lg:px-12">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-body text-ink-secondary">Medicine, exactly as prescribed.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6">
          <ul className="flex flex-col">
            {[...primaryNav, whatsappNav].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          {licenceBlock.map((line) => (
            <p key={line} className="text-legal text-ink-muted">
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
