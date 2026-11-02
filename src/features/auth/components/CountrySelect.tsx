import { useState, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Search } from "lucide-react";
import { countries, type Country } from "@/features/auth/data/countries";
import Flag from "@/features/auth/components/Flag";

type CountrySelectProps = {
  country: Country;
  onSelect: (c: Country) => void;
};

function CountrySelect({ country, onSelect }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q),
    );
  }, [query]);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="Select country"
          className="flex h-full items-center gap-1.5 border-r border-border-secondary pl-4 pr-3 text-text transition-colors hover:bg-(--Auth-bg)"
        >
          <Flag code={country.code} />
          <ChevronDown className="size-4" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="z-50 w-72 overflow-hidden rounded-lg border border-border-secondary bg-(--bg) shadow-lg"
        >
          <div className="flex items-center gap-2 border-b border-border-secondary px-3">
            <Search className="size-4 text-text" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="h-10 w-full bg-transparent text-sm text-text-h placeholder:text-text outline-none"
            />
          </div>

          <ul className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-text">
                No results
              </li>
            )}
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(c);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm hover:bg-(--Auth-bg) ${
                    c.code === country.code ? "bg-(--Auth-bg)" : ""
                  }`}
                >
                  <Flag code={c.code} />
                  <span className="flex-1 text-left text-text-h">{c.name}</span>
                  <span className="text-text">+{c.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default CountrySelect;
