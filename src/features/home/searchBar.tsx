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
}: {
  color?: string;
  padding?: string;
}) => {
  return (
    <Field className="">
      <InputGroup
        style={{
          backgroundColor: color,
          paddingBlock: padding,
          height: "60px",
          width: "750px",
          marginLeft: "auto",
        }}
      >
        <InputGroupInput
          id="inline-start-input"
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
