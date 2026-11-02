import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

const dateCheckBoxes = [
  {
    label: "today",
  },
  {
    label: "tomorrow",
  },
];
const consultationCheckBoxes = [
  {
    label: "in-clinic",
  },
  {
    label: "Home Visit",
  },
];

/** Sort chips — controlled by the page (single choice, click again to clear). */
const sortOptions = [
  { label: "most recommended", value: "recommended" },
  { label: "price low to high", value: "price-asc" },
  { label: "price high to low", value: "price-desc" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

type SidebarProps = {
  sideBarState: boolean;
  sort?: SortValue | null;
  onSortChange?: (value: SortValue | null) => void;
};

function handleSimpleCheckBoxes(list: { label: string }[]) {
  return list.map((item) => (
    <Field key={item.label} orientation="horizontal">
      <Checkbox id={item.label} name={item.label} />
      <FieldLabel htmlFor={item.label} className="capitalize">
        {item.label}
      </FieldLabel>
    </Field>
  ));
}

const FilterSelectorsSidebar = ({
  sideBarState,
  sort,
  onSortChange,
}: SidebarProps) => {
  const [activeGender, setActiveGender] = useState("male");

  function handleAciveGender() {
    setActiveGender(activeGender === "male" ? "female" : "male");
  }

  /** Pick one sort; picking it again clears the sort (server default order). */
  function handleSortOption(value: SortValue) {
    onSortChange?.(sort === value ? null : value);
  }

  return (
    <>
      <FieldGroup
        className={`mx-auto w-56  duration-300 overflow-hidden ${
          sideBarState ? "w-56" : "w-0"
        }`}
      >
        <h3 className="capitalize text-lg font-semibold my-1">
          available date
        </h3>
        {handleSimpleCheckBoxes(dateCheckBoxes)}
        <h3 className="capitalize text-lg font-semibold my-1">gender</h3>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="lg"
            className={`capitalize cursor-pointer ${activeGender == "male" ? "text-white bg-brand" : ""}`}
            onClick={handleAciveGender}
          >
            male
          </Button>
          <ButtonGroupSeparator />
          <Button
            variant="secondary"
            size="lg"
            className={`capitalize cursor-pointer ${activeGender == "female" ? "text-white bg-brand" : ""}`}
            onClick={handleAciveGender}
          >
            female
          </Button>
        </ButtonGroup>

        <h3 className="capitalize text-lg font-semibold my-1">
          consultation type
        </h3>
        {handleSimpleCheckBoxes(consultationCheckBoxes)}
        <h3 className="capitalize text-lg font-semibold my-1">sort</h3>
        {sortOptions.map((option) => (
          <Field key={option.label} orientation="horizontal">
            <Checkbox
              id={`sort-${option.value}`}
              name={`sort-${option.value}`}
              checked={sort === option.value}
              onCheckedChange={() => handleSortOption(option.value)}
            />
            <FieldLabel
              htmlFor={`sort-${option.value}`}
              className="capitalize"
            >
              {option.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </>
  );
};
export default FilterSelectorsSidebar;
