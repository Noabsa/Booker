import { createContext } from "react";
import { URL } from "../localhost";
import axios from "axios";

export const BookContext = createContext({});
export const BookContextProvider = BookContext.Provider;

export function createCheckBookStatus({ buttonsState, userData }) {
  return async function checkBookStatus(selectedBook) {
    let apiRef = "";
    selectedBook.id
      ? (apiRef = selectedBook.id)
      : (apiRef = selectedBook.apiRef);
    let fields = Object.keys(buttonsState);
    try {
      const response = await axios.post(`${URL}/books/checkBookStatus`, {
        bookId: apiRef,
        email: userData.email,
        field: fields,
        title: selectedBook.title,
        author: selectedBook.author,
        category: selectedBook.category,
        cover: selectedBook.cover,
      });
      let bookStatus = response.data.data;
      fields.forEach((field) => {
        buttonsState[field].set(bookStatus[field]);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function createToggleBookStatus({ buttonsState, userData, setUser }) {
  return async function toggleBookStatus(fieldToAdd, selectedBook) {
    let currentState =
      selectedBook[fieldToAdd] || buttonsState[fieldToAdd].value;
    try {
      let bookRef;
      selectedBook.id
        ? (bookRef = selectedBook.id)
        : (bookRef = selectedBook.apiRef);
      const response = await axios.post(
        `${URL}/books/change-state-to-${!currentState}`,
        {
          bookId: bookRef,
          email: userData.email,
          field: fieldToAdd,
          title: selectedBook.title,
          author: selectedBook.author,
          category: selectedBook.category,
          cover: selectedBook.cover,
        }
      );
      setUser(response.data.data);
      return buttonsState[fieldToAdd].set(!currentState);
    } catch (error) {
      console.log(error);
    }
  };
}
