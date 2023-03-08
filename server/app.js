require("dotenv").config();
const { mongo } = require("./config/parameters");

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  UserRoute = require("./routes/UserRoute"),
  BooksRoute = require("./routes/BooksRoute"),
  LibrariesRoute = require("./routes/LibrariesRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

async function connecting() {
  try {
    await mongoose.connect(
      `${mongo.protocol}${mongo.user}:${mongo.password}@${mongo.host}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    console.log("Connected to the DB");
  } catch (error) {
    console.log(
      "ERROR: Seems like your DB is not running, please start it up !!!"
    );
  }
}
connecting();
mongoose.set("useCreateIndex", true);

app.use("/user", UserRoute);
app.use("/books", BooksRoute);
app.use("/LibraryPage", LibrariesRoute);

app.listen(3030, () => console.log(`listening on port 3030`));
