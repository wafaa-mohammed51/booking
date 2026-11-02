import { SlidersHorizontal } from "lucide-react";
import { ChevronRight } from "lucide-react";
import {
 Button
} from "@/components/ui/button";

export default function FilterSidebarSwitcher({sideBarState, setSideBarState}) {
  
  
  function handleFilterState(){
    const arrowState = !sideBarState;
    setSideBarState(arrowState);
  }

  return (
    <Button
      variant="outline"
      className="py-5 cursor-pointer 
      transition-transform"
      onClick={handleFilterState}
    >
      <SlidersHorizontal className="h-4 w-4" />
      <span>Filter</span>
      <ChevronRight
        className=""
        style={{ transform: `rotate(${sideBarState===true?180:0}deg)` }}
      />
    </Button>
  );
}
