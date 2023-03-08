import { URL } from "../localhost";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookContext";
import { UserContext } from "../contexts/UserContext";

export default function LibraryListElement({
  book,
  index,
  libraryName,
  getSelectedBook,
}) {
  let { setUser, userData } = useContext(UserContext);
  let handleGetSelectedBook = () => {
    getSelectedBook(book);
  };
  function getIcon() {
    if (libraryName === "favourites") {
      return "star";
    } else if (libraryName === "bookmarked") {
      return "bookmark";
    }
  }
  let icon = getIcon();

  let { toggleBookStatus } = useContext(BookContext);

  let [localState, setLocalState] = useState();

  useEffect(() => {
    setLocalState(book);
  }, [book, libraryName]);

  async function deleteFromLibrary() {
    try {
      const response = await axios.post(`${URL}/books/change-state-to-false`, {
        bookId: book.apiRef,
        email: userData.email,
        field: libraryName,
      });
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleToggleStatus(field, book) {
    if (libraryName !== "read") {
      toggleBookStatus(field, book);
    } else {
      deleteFromLibrary();
    }
    setLocalState({ ...book, [field]: !book[field] });
  }

  return (
    <>
      <li index={index}>
        <span
          className={`material-symbols-rounded icon read ${localState?.read}`}
          onClick={() => handleToggleStatus("read", book)}
        >
          check_circle
        </span>
        <div onClick={handleGetSelectedBook}>
          <span className="title">{book.title}</span>
          <span className="author">{book.author[0] || "-"}</span>
          <span className="category">{book.category || "-"}</span>
        </div>
        {libraryName !== "read" ? (
          <span
            className="material-symbols-rounded icon library"
            onClick={(event) => deleteFromLibrary()}
          >
            {icon}
          </span>
        ) : (
          <>
            <span
              className={`material-symbols-rounded icon library ${localState?.favourites}`}
              onClick={() => toggleBookStatus("favourites", book)}
            >
              star
            </span>
            <span
              className={`material-symbols-rounded icon library ${book.bookmarked}`}
              onClick={() => toggleBookStatus("bookmarked", book)}
            >
              bookmark
            </span>
          </>
        )}
      </li>
    </>
  );
}
