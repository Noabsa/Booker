import axios from "axios";

export async function findGoogleBooks(searchInput, condition) {
  let googleApi;
  if (condition === "keyword") {
    googleApi = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`;
  } else if (condition === "apiRef") {
    googleApi = `https://www.googleapis.com/books/v1/volumes/${searchInput}`;
  }
  try {
    const call = await axios.get(googleApi, { userInput: searchInput });
    const response = { ok: true, books: call.data.items || [call.data] };
    let booksArray = response.books.map((book, ind) => {
      return {
        index: ind,
        title: book?.volumeInfo?.title || "Title not avaiable",
        subtitle: book?.volumeInfo?.subtitle || "",
        author: book?.volumeInfo?.authors || "Author not avaiable",
        publisher: book?.volumeInfo?.publisher || "Publisher not avaiable",
        date: book?.volumeInfo?.title || "Title not avaiable",
        category: book?.volumeInfo?.categories || ["Category not avaiable"],
        pageCount: book?.volumeInfo?.pageCount || "Pages not avaiable",
        cover:
          book?.volumeInfo?.imageLinks?.thumbnail ||
          book?.volumeInfo?.imageLinks?.smallThumbnail,
        snippet:
          book?.volumeInfo?.description ||
          book?.searchInfo?.textSnippet ||
          "Description not avaiable",
        id: book?.id || "Id not avaiable",
      };
    });
    return booksArray;
  } catch (error) {
    console.log(error);
  }
}
