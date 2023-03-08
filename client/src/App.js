import axios from "axios";
import { useState, useEffect } from "react";
import { URL } from "./localhost.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Home from "./components/Home.js";
import LogInForm from "./components/LogInForm.js";
import SignUpForm from "./components/SignUpForm .js";
import RecoverPassword from "./components/RecoverPassword.js";
import UserHome from "./components/UserHome.js";
import CardBook from "./components/CardBook.js";
import Navbar from "./components/Navbar.js";
import LibraryPage from "./components/LibrayPage.js";
import NavbarListElement from "./components/NavbarListElement.js";
import LibraryListElement from "./components/LibraryListElement.js";
import Autocomplete from "./components/Autocomplete.js";

import { UserContextProvider } from "./contexts/UserContext.js";
import {
  BookContextProvider,
  createCheckBookStatus,
  createToggleBookStatus,
} from "./contexts/BookContext.js";

import { CardContextProvider } from "./contexts/CardContext.js";

export function App() {
  let [isLoggedIn, setLoggedIn] = useState(null);
  let [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  let [userData, setUser] = useState(
    /*{
      name: "",
      surname: "",
      email: "",
      password: "",
      myBooks: "",
      favourites: "",
      bookmarked: "",
      libraries: "",
      read: "",
      activity: "",
    }*/
    JSON.parse(localStorage.getItem("userData"))
  );
  let [navState, setNavState] = useState({ class: "", icon: "push_pin" });

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        if (!token) {
          setLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/user/tokenVerify`);
          return response.data.ok ? loginState(token, userData) : logoutState();
        }
      } catch (error) {
        console.log(error);
      }
    };
    tokenVerify();
  }, [token, userData]);

  const loginState = (token, user) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userData", JSON.stringify(user));
    setLoggedIn(true);
    setUser(user);
    setToken(token);
  };
  const logoutState = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    Navigate("/Home");
  };

  let [displayCard, setDisplayCard] = useState({ renderer: "", blocked: null });
  let [favouriteState, setFavouriteState] = useState(false);
  let [bookmarkState, setBookmarkState] = useState(false);
  let [readState, setReadState] = useState(false);

  let buttonsState = {
    bookmarked: { set: setBookmarkState, value: bookmarkState },
    favourites: { set: setFavouriteState, value: favouriteState },
    read: { set: setReadState, value: readState },
  };

  const checkBookStatus = createCheckBookStatus({ buttonsState, userData });
  const toggleBookStatus = createToggleBookStatus({
    buttonsState,
    userData,
    setUser,
    buttonsState,
  });
  return (
    <>
      <UserContextProvider
        value={{
          setUser,
          loginState,
          logoutState,
          userData,
          isLoggedIn,
          navState,
          setNavState,
        }}
        className="context"
      >
        <CardContextProvider value={{ displayCard, setDisplayCard }}>
          <BookContextProvider
            value={{
              buttonsState,
              favouriteState,
              bookmarkState,
              readState,
              checkBookStatus,
              toggleBookStatus,
            }}
          >
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={isLoggedIn ? <Navigate to="/UserHome" /> : <Home />}
                />
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? <Navigate to="/UserHome" /> : <LogInForm />
                  }
                />
                <Route path="/SignUpForm" element={<SignUpForm />} />
                <Route path="/RecoverPassword" element={<RecoverPassword />} />
                <Route
                  path="/UserHome"
                  element={
                    !isLoggedIn ? (
                      <Navigate to="/" />
                    ) : (
                      <UserHome
                        logoutState={logoutState}
                        userData={userData}
                        isLoggedIn={isLoggedIn}
                      />
                    )
                  }
                />
                <Route
                  path="/LibraryPage/Favourites"
                  element={<LibraryPage libraryName="favourites" />}
                />
                <Route
                  path="/LibraryPage/Bookmarked"
                  element={<LibraryPage libraryName="bookmarked" />}
                />
                <Route
                  path="/LibraryPage/Read"
                  element={<LibraryPage libraryName="read" />}
                />

                <Route path="/CardBook" element={<CardBook />} />
                <Route path="/Navbar" element={<Navbar />} />
                <Route
                  path="/NavbarListElement"
                  element={<NavbarListElement />}
                />
                <Route
                  path="/LibraryListElement"
                  element={<LibraryListElement />}
                />
                <Route path="/Autocomplete" element={<Autocomplete />} />
              </Routes>
            </Router>
          </BookContextProvider>
        </CardContextProvider>
      </UserContextProvider>
    </>
  );
}
