//const { BookContext } = require("../../client/src/App");
const models = require("../models/Models");
const Book = models.BookModel;
const User = models.UserModel;

//GENERAL FUNCTIONS
async function removeElementToField(email, field, update) {
  return await User.updateOne({ email: email }, { $pull: { [field]: update } });
}
async function findUser(email) {
  return await User.find({ email: email });
}

async function libraryUser(req, res) {
  let { libraryName, libraryCheck, email } = req.body;
  let user = await User.find({ email: email });
  let librariesToCheck = [];

  if (user.length) {
    let books = await Book.find({ apiRef: user[0][libraryName] });
    for (let i = 0; i < libraryCheck.length; i++) {
      let field = libraryCheck[i];
      let library = await Book.find({ apiRef: user[0][field] });
      let libraryRef = Object.values(library).map((object) => {
        return object.apiRef;
      });
      librariesToCheck.push({ [field]: libraryRef });
    }

    let response;
    response = books.map((bookObject, ind) => {
      let object = {
        apiRef: bookObject.apiRef,
        author: bookObject.author,
        category: bookObject.category,
        title: bookObject.title,
      };
      for (let i = 0; i < librariesToCheck.length; i++) {
        let key = [Object.keys(librariesToCheck[i])[0]];
        let included = Object.values(librariesToCheck[i])[0].includes(
          bookObject.apiRef
        );
        object = { ...object, [key]: included };
      }
      return object;
    });

    res.send({
      ok: true,
      data: response,
      libraries: librariesToCheck,
    });
  } else {
    res.send({ ok: false });
  }
}
const deleteBook = async (req, res) => {
  let apiRef = req.body.bookId;
  let email = req.body.email;
  let field = req.body.field;
  let title = req.body.title;
  try {
    let removeElement = await removeElementToField(email, field, apiRef);
    let user = await findUser(req.body.email);
    res.send({ ok: true, data: user[0] });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteBook, libraryUser };
