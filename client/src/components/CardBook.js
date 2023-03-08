import "../styles/CardBook.css";
import React, { useState, useEffect, useContext } from "react";
import { URL } from "../localhost";
import axios from "axios";
import { BookContext } from "../contexts/BookContext";
import { UserContext } from "../contexts/UserContext";
import { CardBookButton } from "./CardBookButton";

function CardBook({ selectedBookAutocomplete, selectedBookLibrary }) {
  let selectedBook = selectedBookAutocomplete || selectedBookLibrary;
  let { setUser, userData, isLoggedIn } = useContext(UserContext);

  let {
    buttonsState,
    favouriteState,
    bookmarkState,
    readState,
    checkBookStatus,
    toggleBookStatus,
  } = useContext(BookContext);

  useEffect(() => {
    if (selectedBook) {
      let trigger = checkBookStatus(selectedBook);
    }
  }, [selectedBook, selectedBookAutocomplete, selectedBookLibrary]);

  return (
    <div
      className={`card-book ${selectedBook.title && "display " + true}`}
      data-blockreboot={true}
    >
      <div className="header">
        <h2>{selectedBook.title}</h2>
        <p>{selectedBook.subtitle || selectedBook.title}</p>
      </div>

      <div className="content">
        <section className="body">
          <img src={selectedBook.cover}></img>
          <p>{selectedBook.snippet}</p>
        </section>
        <section className="data">
          <div>
            <label>Author: </label>
            <span>{selectedBook.author}</span>
          </div>
          <div>
            <label>Category: </label>
            <span>{selectedBook?.category?.[0]}</span>
          </div>
          <div>
            <label>Publisher: </label>
            <span>{selectedBook.publisher}</span>
          </div>
        </section>
      </div>
      <section className="footer"></section>
      {
        // BUTTONS COMPONENT ----------------------------------------
        isLoggedIn && (
          <CardBookButton
            toggleBookStatus={toggleBookStatus}
            selectedBook={selectedBook}
            favouriteState={favouriteState}
            bookmarkState={bookmarkState}
            readState={readState}
          />
        )
      }
    </div>
  );
}

export default CardBook;
