import { Link, useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";
import SearchBar from "./searchBar";
import { useState } from "react";
import ProfileIconMenu from "@/features/profile/components/ProfileMenu";
import NotificationMenu from "@/features/profile/components/NotificationMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import logo from "@/assets/logo.png";
import profileImageFallback from "@/assets/profile-image.jpg";

const linkClass =
  "block text-text-h text-sm font-light capitalize py-2 px-3 bg-grey rounded-lg w-fit cursor-pointer";
const links = ["home", "booking", "contact us"];

// Every nav entry must land on a real route — "/" (home), "/booking",
// "/contact-us". Built from the link list instead of hard-coded hrefs.
const linkTargets: Record<string, string> = {
  home: "/",
  booking: "/booking",
  "contact us": "/contact-us",
};

const Nav = () => {
  const [linksMenu, setLinksMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  return (
    <nav className="md:px-13 px-4  sticky top-0 z-50">
      <section className=" py-7 flex bg-white justify-between items-center gap-15 ">
        <Link to="/" aria-label="Cure — home">
          <img src={logo} className="min-w-8" alt="Cure logo" />
        </Link>
        <SearchBar onQuerySubmit={(q) => navigate(`/choose-specialist?q=${encodeURIComponent(q)}`)} />
        {/* Nav Links And Profile Page */}
        <section className="flex items-center gap-5">
          <ul className="flex items-center gap-2">
            {/* Nav Links */}
            {linksMenu && (
              <>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={linkTargets[link] ?? "/"}
                      className={linkClass}
                      onClick={() => setLinksMenu(false)}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </>
            )}
            <li>
              <button
                type="button"
                aria-expanded={linksMenu}
                aria-label={linksMenu ? "Close menu" : "Open menu"}
                className={linkClass}
                onClick={() => setLinksMenu((prev) => !prev)}
              >
                {linksMenu ? <X /> : <Menu />}
              </button>
            </li>
            <li>{isAuthenticated && <NotificationMenu />}</li>
          </ul>
          {isAuthenticated ? (
            <ProfileIconMenu
              imageUrl={user?.image || profileImageFallback}
            />
          ) : (
            <Link to="/sign-in" className={linkClass}>
              Sign In
            </Link>
          )}
        </section>
      </section>
    </nav>
  );
};

export default Nav;
