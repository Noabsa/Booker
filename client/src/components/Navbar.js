import "../styles/Navbar.css";
import NavbarListElement from "./NavbarListElement";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Navbar() {
  let { navState, setNavState } = useContext(UserContext);

  let handleNavState = () =>
    !!navState.class
      ? setNavState({ class: "", icon: "push_pin" })
      : setNavState({ class: "unfold", icon: "trip_origin" });
  return (
    <nav className={navState.class}>
      <section>
        <div>B</div>
        <span
          onClick={handleNavState}
          className={`material-symbols-rounded pin icon active-true`}
          data-blockreboot={true}
        >
          {navState.icon}
        </span>
      </section>

      <ul>
        <NavbarListElement icon="home" label="Home" route="/" active={true} />
        <NavbarListElement
          icon="library_books"
          label="Read Books"
          route="/LibraryPage/Read"
          active={true}
        />
        <NavbarListElement
          icon="bookmark"
          label="Bookmarked"
          route="/LibraryPage/Bookmarked"
          active={true}
        />
        <NavbarListElement
          icon="star"
          label="Favourites"
          route="/LibraryPage/Favourites"
          active={true}
        />
      </ul>

      <ul>
        <NavbarListElement
          icon="account_circle"
          label="Profile"
          active={false}
        />
        <NavbarListElement
          icon="article"
          label="Terms and coditions"
          active={false}
        />
        <NavbarListElement icon="settings" label="Settings" active={false} />
        <NavbarListElement icon="logout" label="Logout" active={true} />
      </ul>
    </nav>
  );
}
export default Navbar;
