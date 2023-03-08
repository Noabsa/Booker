import "../styles/LibraryPage.css";
import LibraryListElement from "./LibraryListElement";
import Navbar from "./Navbar";
import Autocomplete from "./Autocomplete";
import { URL } from "../localhost";
import axios from "axios";
import { findGoogleBooks } from "./ApiCallModule";
import CardBook from "./CardBook";

import { useContext, useState, useEffect } from "react";
import { CardContext } from "../contexts/CardContext";
import { UserContext } from "../contexts/UserContext";
import { BookContext } from "../contexts/BookContext";

export default function LibraryPage({ libraryName }) {
  let { navState, userData } = useContext(UserContext);
  let { displayCard, setDisplayCard } = useContext(CardContext);
  let { buttonsState } = useContext(BookContext);

  let [listItems, setListState] = useState([]);
  let [selectedListBook, setSelectedBook] = useState({});

  let getSelectedBook = async (book) => {
    let response = await findGoogleBooks(book.apiRef, "apiRef");
    let bookObject = response[0];
    setSelectedBook(bookObject);
  };
  async function getList() {
    let fields = Object.keys(buttonsState);
    try {
      const response = await axios.post(`${URL}/LibraryPage/${libraryName}`, {
        libraryName: libraryName,
        libraryCheck: fields.filter((field) => field !== libraryName),
        email: userData.email,
      });
      setListState(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getList();
  }, [userData, libraryName]);
  let clearScreen = (event) => {
    event.stopPropagation();
    let blockReboot = event.target.closest("[data-blockreboot]");
    if (!blockReboot) {
      setSelectedBook({});
    }
  };
  let getElement = (event) => {
    let context = event.target.closest("[index]");
    if (context) {
      setDisplayCard({ renderer: "library" });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clearScreen);
    document.addEventListener("click", getElement);
    return () => {
      document.removeEventListener("mousedown", clearScreen);
      document.removeEventListener("click", getElement);
    };
  }, []);

  return (
    <>
      <Navbar />
      <section className={`user central-area library ${navState.class}`}>
        <header className="library">
          <h1
            className="
          brand-font"
          >
            {libraryName[0].toUpperCase() + libraryName.slice(1) + " books"}
          </h1>
          <Autocomplete />
        </header>

        <ul className="results" data-blockreboot={true}>
          <div className="first-row">
            <span className="title">Title</span>
            <span className="author">Author</span>
            <span className="category">Category</span>
          </div>
          {listItems.map((book, ind) => {
            return (
              <LibraryListElement
                book={book}
                key={ind}
                index={ind}
                libraryName={libraryName}
                getSelectedBook={getSelectedBook}
              />
            );
          })}
        </ul>
      </section>

      {displayCard.renderer === "library" && (
        <CardBook selectedBookLibrary={selectedListBook} />
      )}
    </>
  );
}
