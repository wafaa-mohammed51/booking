import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SpecialistNotFound from "./SpecialistNotFound";
import ChooseSpecialistHeader from "./ChooseSpecialistHeader";
import DoctorCard from "../../../components/shared/DoctorCard";
import ShiftCarousel from "@/components/shared/ShiftCarousel";
import FilterSelectorsSidebar from "./FilerSelectorsSidebar";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  getAllSpecialists,
  getSpecialtyName,
  type Specialist,
} from "../api/handleSpecialistsData";
import { getApiErrorMessage, getRequestFailureReason } from "@/features/auth/utils/apiError";

/** Sort options exposed by the sidebar; "most recommended" is the default. */
type SortOption = "recommended" | "price-asc" | "price-desc";

const ratingOf = (specialist: Specialist): number | null => {
  if (typeof specialist.rating === "number") return specialist.rating;
  return specialist.rating?.average ?? null;
};

const priceOf = (specialist: Specialist): number | null =>
  specialist.consultation_price ?? specialist.price ?? null;

/**
 * The specialists list is real data from GET /specialists. The query hook gives
 * us correct loading / error / retry semantics, and cleared search & specialty
 * chips re-filter the same server list (no duplicated requests).
 */
const ChooseSpecialistPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [filterAsideState, setFilterAsideState] = useState(false);
  const [specializationBtn, setSpecializationBtn] = useState<string[]>([]);
  const [searchContent, setSearchContent] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption | null>(null);

  // Worded so a deep link from the nav search ("/choose-specialist?q=...") works
  // when the user clicks submit while already on the page: keep the URL and the
  // filter box in sync without refetching.
  useEffect(() => {
    setSearchContent(initialQuery);
  }, [initialQuery]);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["specialists"],
    queryFn: getAllSpecialists,
    staleTime: 60 * 1000,
  });

  const allSpecialists: Specialist[] = Array.isArray(data) ? data : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  function updateSpecialization(btns: string[]) {
    setSpecializationBtn(btns);
  }

  // Derive the visible list from the current search + selected specialty
  // chips, instead of manually copying state (avoids stale-closure filtering).
  const filteredSpecialists = useMemo(() => {
    let list = allSpecialists;
    const q = searchContent.trim().toLowerCase();
    if (q) {
      list = list.filter((specialist) => {
        const searchable = [
          specialist.name ?? "",
          getSpecialtyName(specialist.specialty) ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(q);
      });
    }
    if (specializationBtn.length !== 0) {
      list = list.filter((item) => {
        const specialty = (getSpecialtyName(item.specialty) ?? "").toLowerCase();
        const name = (item.name ?? "").toLowerCase();
        return specializationBtn.some(
          (btn) => btn.toLowerCase() === specialty || btn.toLowerCase() === name,
        );
      });
    }
    if (sort) {
      list = [...list].sort((a, b) => {
        if (sort === "price-asc") {
          const pa = priceOf(a);
          const pb = priceOf(b);
          if (pa === null && pb === null) return 0;
          if (pa === null) return 1; // unknown prices sink to the bottom
          if (pb === null) return -1;
          return pa - pb;
        }
        if (sort === "price-desc") {
          const pa = priceOf(a);
          const pb = priceOf(b);
          if (pa === null && pb === null) return 0;
          if (pa === null) return 1;
          if (pb === null) return -1;
          return pb - pa;
        }
        // "most recommended": highest patient rating first
        const ra = ratingOf(a);
        const rb = ratingOf(b);
        if (ra === null && rb === null) return 0;
        if (ra === null) return 1;
        if (rb === null) return -1;
        return rb - ra;
      });
    }
    return list;
  }, [allSpecialists, searchContent, specializationBtn, sort]);

  const hasSourceData = allSpecialists.length > 0;
  const failureHint =
    getRequestFailureReason(error) ?? getApiErrorMessage(error, "");

  return (
    <>
      <section className="min-h-[calc(100vh-112.5px)]">
        <ChooseSpecialistHeader
          handleSearch={handleSearch}
          sideBarState={filterAsideState}
          setSideBarState={setFilterAsideState}
        />
        <section className="mainContainer">
          <h1 className="text-2xl font-bold capitalize text-text-h py-5">
            choose specialist
          </h1>
          <section className="pb-5">
            <ShiftCarousel specialization={updateSpecialization} />
          </section>
        </section>
        {/* All Cards Container */}
        <section className=" mainContainer flex items-start">
          <FilterSelectorsSidebar sideBarState={filterAsideState} sort={sort} onSortChange={setSort} />
          <section className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(min(390px,100%),1fr))] gap-5">
            {isLoading ? (
              <section
                className="col-span-full flex flex-col items-center justify-center gap-3 py-12"
                role="status"
                aria-live="polite"
              >
                <Spinner className="size-8 text-brand" aria-label="Loading" />
                <span className="text-text/70 text-sm">Loading specialists…</span>
              </section>
            ) : isError ? (
              <section className="col-span-full text-center py-10">
                <p className="text-gray-500 mb-1">
                  We couldn't load the specialists right now.
                </p>
                {/* Show the real reason when it's a config/network failure… */}
                {failureHint && (
                  <p className="text-sm text-gray-400 mb-4">{failureHint}</p>
                )}
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="cursor-pointer border-blue-600 text-blue-600 capitalize disabled:opacity-60"
                >
                  {isFetching ? "Retrying…" : "Try again"}
                </Button>
              </section>
            ) : !hasSourceData ? (
              <section className="col-span-full text-center text-gray-500 py-10">
                No specialists available at the moment.
              </section>
            ) : filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <DoctorCard
                  key={specialist.id ?? specialist.name}
                  specialist={specialist}
                />
              ))
            ) : (
              <SpecialistNotFound />
            )}
          </section>
        </section>

        {/*===== All Cards Container =====*/}
      </section>
    </>
  );
};
export default ChooseSpecialistPage;
