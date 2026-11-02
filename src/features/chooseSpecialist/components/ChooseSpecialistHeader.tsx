import SearchBar from "@/components/shared/searchBar";
import { MapPinned } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FilterSidebarSwitcher from "./FilterSidebarSwitcher";

const ChooseSpecialistHeader = ({
  handleSearch,
  sideBarState,
  setSideBarState,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="mainContainer flex items-center gap-7 py-5">
        <FilterSidebarSwitcher
          sideBarState={sideBarState}
          setSideBarState={setSideBarState}
        />
        <SearchBar
          color="transparent"
          padding="21"
          handleSearch={handleSearch}
        />
        <Button
          variant="outline"
          className="capitalize bg-transparent! cursor-pointer py-5 px-7!"
          onClick={() => navigate("/#find-care")}
        >
          <MapPinned data-icon="inline-start" />
          <span>map</span>
        </Button>
      </section>
    </>
  );
};
export default ChooseSpecialistHeader;
