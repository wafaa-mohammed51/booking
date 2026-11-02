import Horehome from "@/features/home/Horehome";
import Homework from "@/features/home/Homework";
import Findcard from "@/features/home/Findcard";
import Docterhome from "@/features/home/Docterhome";
import Reviews from "@/features/home/Reviews";
import FAQ from "@/features/home/FQa";

export default function HomePage() {
  return (
    <div className="py-13">
      <Horehome />
      <Homework />
      <Findcard />
      <Docterhome />
      <Reviews />
      <FAQ />
    </div>
  );
}
