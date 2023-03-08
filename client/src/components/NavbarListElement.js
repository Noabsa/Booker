import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function NavbarListElement({ icon, label, route, active }) {
  let { logoutState } = useContext(UserContext);
  let navigate = useNavigate();

  function handleRoute(route) {
    if (label === "Logout") {
      logoutState();
    } else if (label === "Home") {
      return navigate(route);
    } else {
      return navigate(route);
    }
  }
  return (
    <li onClick={() => handleRoute(route)} className={`active-${active}`}>
      <span className={`material-symbols-rounded icon active-${active}`}>
        {icon}
      </span>
      <label className={`active-${active}`}>{label}</label>
    </li>
  );
}
