import "../styles/Home.css";
import Autocomplete from "./Autocomplete";
import Navbar from "./Navbar";
import UserDashboard from "./UserDashboard";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function UserHome() {
  let { navState } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <section className={`user central-area ${navState.class}`}>
          <div className="search-area">
            <h1 className="brand-font">
              <span>Booker,</span>
              <br></br> are you ready?
            </h1>
            <Autocomplete />
          </div>
        </section>
        <section className={`user right-area l-${navState.class}`}>
          <UserDashboard />
        </section>
      </div>
    </>
  );
}
export default UserHome;
