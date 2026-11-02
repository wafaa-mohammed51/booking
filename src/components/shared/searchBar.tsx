import { useRef } from "react";
import { SearchIcon } from "lucide-react";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const SearchBar = ({
  color,
  padding,
  handleSearch,
  onQuerySubmit,
}: {
  color?: string;
  padding?: string;
  // Optional: live-typing handler (used by the specialists page filter).
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Optional: pressing Enter (or clicking the icon) routes the query — used by
  // the nav search, which has no local results page, to jump to the
  // specialists page with the query applied.
  onQuerySubmit?: (query: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (!onQuerySubmit) return;
    onQuerySubmit(inputRef.current?.value.trim() ?? "");
  };

  return (
    <Field
      className="hidden md:block"
      onClick={(e) => {
        // The magnifier icon doubles as a submit button when the nav search
        // has a destination. Clicks on the input itself must not trigger it.
        if (onQuerySubmit && (e.target as HTMLElement).closest("svg")) {
          e.preventDefault();
          submit();
        }
      }}
    >
      <InputGroup
        className="bg-grey border-transparent shadow-card"
        style={{ backgroundColor: color, paddingBlock: `${padding}px` }}
      >
        <InputGroupInput
          ref={inputRef}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (onQuerySubmit && e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Search about specialty, doctor "
          className="placeholder:text-text/50"
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};

export default SearchBar;
