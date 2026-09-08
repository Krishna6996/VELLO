import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { primaryNav, whatsappNav } from "@/components/layout/nav";
import { Wordmark } from "@/components/layout/Wordmark";
import { SearchField } from "@/components/ui/SearchField";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-16 w-full max-w-page items-center gap-3 px-6 md:gap-6 md:px-10 lg:px-12">
        <Wordmark />

        <nav aria-label="Main" className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-input px-3 text-body font-medium text-ink-secondary hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 md:flex-none md:gap-4">
          <SearchField placeholder="Search a medicine or molecule" className="w-full md:w-72" />
          <Link
            href={whatsappNav.href}
            className="hidden min-h-11 shrink-0 items-center text-body font-medium text-primary hover:text-primary-pressed md:inline-flex"
          >
            {whatsappNav.label}
          </Link>
          <MobileNav links={[...primaryNav, whatsappNav]} />
        </div>
      </div>
    </header>
  );
}
