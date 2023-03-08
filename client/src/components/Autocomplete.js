import "../styles/Autocomplete.css";
import React, { useState, useEffect, useContext } from "react";
import CardBook from "./CardBook";
import "../styles/BrandFonts.css";
import { findGoogleBooks } from "./ApiCallModule";
import { CardContext } from "../contexts/CardContext";

function Autocomplete() {
  let [searchInput, setValues] = useState("");
  let [searchedBooks, setBooks] = useState([]);
  let [selectedBook, setSelectedBook] = useState({});

  let handleChange = (event) => setValues(event.target.value);

  let { displayCard, setDisplayCard } = useContext(CardContext);

  async function submit() {
    if (searchInput.length > 0) {
      let booksArray = await findGoogleBooks(searchInput, "keyword");
      setBooks(booksArray);
    } else {
      setBooks([]);
    }
  }
  let handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };
  useEffect(() => {
    const debounce = setTimeout(submit, 350);
    return () => clearTimeout(debounce);
  }, [searchInput]);

  let getSelectedBook = (event) => {
    let index = event.target.dataset.index;
    setSelectedBook(searchedBooks[index]);
  };

  let cleanSearchList = () => {
    setBooks([]);
    setValues("");
  };
  let clearScreen = (event) => {
    event.stopPropagation();
    let blockReboot = event.target.closest("[data-blockreboot]");
    if (!blockReboot) {
      setBooks([]);
      setValues("");
      setSelectedBook({});
    }
  };
  let getElement = (event) => {
    let context = event.target.closest("[data-autocomplete]");
    if (context) {
      setDisplayCard({ renderer: "autocomplete" });
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
    <div className="autocomplete">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChange}
            placeholder="Search"
            data-blockreboot={true}
            value={searchInput}
          ></input>
          {searchInput.length > 0 && (
            <span
              className="material-symbols-outlined close"
              onClick={cleanSearchList}
              data-blockreboot={true}
            >
              close
            </span>
          )}
        </div>
        {searchedBooks.length > 0 && (
          <ul data-blockreboot={true} data-autocomplete={true}>
            {searchedBooks.map((book, ind) => (
              <li key={ind} data-index={book.index} onClick={getSelectedBook}>
                {book.title}
              </li>
            ))}
          </ul>
        )}
      </form>
      <>
        {displayCard.renderer === "autocomplete" && (
          <CardBook selectedBookAutocomplete={selectedBook} />
        )}
      </>
    </div>
  );
}
export default Autocomplete;
