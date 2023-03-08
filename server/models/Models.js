const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  USER MODEL --------------------------------------------------------
const User = new Schema(
  {
    name: { type: String, required: false, unique: false },
    surname: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false, unique: false },
    myBooks: { type: String, required: false, unique: false },
    favourites: [{ type: String, required: false, unique: false }],
    bookmarked: [{ type: String, required: false, unique: false }],
    libraries: [{ type: String, required: false, unique: false }],
    read: [{ type: String, required: false, unique: false }],
    activity: [{ type: Object, required: false, unique: false }],
    categories: [{ type: Object, required: false, unique: false }],
  },
  { strictQuery: false }
);
const UserModel = mongoose.model("users", User);

//  LIBRARY MODEL --------------------------------------------------------
const Library = new Schema(
  {
    name: { type: String, required: true, unique: false },
    status: { type: String, required: false, unique: false },
    statusDescription: { type: String, required: false, unique: false },
    owner: { type: String, required: true, unique: false },
    books: { type: String, required: false, unique: false },
  },
  { strictQuery: false }
);
const LibraryModel = mongoose.model("libraries", Library);

//  BOOK MODEL --------------------------------------------------------
const Book = new Schema(
  {
    title: { type: String, required: false, unique: false },
    apiRef: { type: String, required: false, unique: false },
    author: { type: Array, required: false, unique: false },
    category: { type: Array, required: false, unique: false },
    cover: { type: String, required: false, unique: false },
  },
  { strictQuery: false }
);
const BookModel = mongoose.model("books", Book);

module.exports = { UserModel, LibraryModel, BookModel };
