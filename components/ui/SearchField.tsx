interface SearchFieldProps {
  placeholder: string;
  className?: string;
}

export function SearchField({ placeholder, className }: SearchFieldProps) {
  return (
    <form
      role="search"
      action="/search"
      method="get"
      className={["flex items-center", className].filter(Boolean).join(" ")}
    >
      <label htmlFor="header-search" className="sr-only">
        Search
      </label>
      <input
        id="header-search"
        type="search"
        name="q"
        placeholder={placeholder}
        autoComplete="off"
        className="h-11 w-full rounded-input border border-hairline bg-surface px-3.5 text-body text-ink focus:border-primary focus:outline focus:outline-[1.5px] focus:-outline-offset-[1.5px] focus:outline-primary [&::-webkit-search-cancel-button]:hidden"
      />
    </form>
  );
}
