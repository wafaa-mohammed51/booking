import { Outlet } from "react-router-dom";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import ScrollToRoute from "./ScrollToRoute";

export default function MainLayout() {
  return (
    <>
      <ScrollToRoute />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
