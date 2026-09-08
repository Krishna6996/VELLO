import { cx } from "@/lib/cx";

interface SearchFieldProps {
  placeholder: string;
  /** header: 44px in the sticky header. hero: 56px, the landing page's primary action. */
  variant?: "header" | "hero";
  id?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchField({
  placeholder,
  variant = "header",
  id = "header-search",
  defaultValue,
  className,
}: SearchFieldProps) {
  return (
    <form
      role="search"
      action="/search"
      method="get"
      className={cx("flex items-center", className)}
    >
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <input
        id={id}
        type="search"
        name="q"
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete="off"
        className={cx(
          "w-full rounded-input border border-hairline bg-surface text-ink focus:border-primary focus:outline focus:outline-[1.5px] focus:-outline-offset-[1.5px] focus:outline-primary [&::-webkit-search-cancel-button]:hidden",
          variant === "hero" ? "h-14 px-4 text-input" : "h-11 px-3.5 text-body",
        )}
      />
    </form>
  );
}
