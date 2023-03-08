const models = require("../models/Models");
const Book = models.BookModel;
const User = models.UserModel;
const date = new Date();

//GENERAL FUNCTIONS
async function findBook(apiRef) {
  return await Book.find({ apiRef: apiRef });
}
async function createBook(title, apiRef, author, category, cover) {
  return await Book.create({
    title: title,
    apiRef: apiRef,
    author: [author],
    category: [category],
    cover: cover,
  });
}
async function addElementToField(email, field, update) {
  return await User.findOneAndUpdate(
    { email: email },
    { $push: { [field]: [update] } }
  );
}
async function updateElementToField(email, field, oldVal, newVal) {
  let update1 = await User.updateOne(
    { email: email },
    { $pull: { [field]: oldVal } }
  );
  let update2 = await User.updateOne(
    { email: email },
    { $push: { [field]: newVal } }
  );
  let user = await User.find({ email: email });
  return user;
}
async function removeElementToField(email, field, update) {
  return await User.updateOne({ email: email }, { $pull: { [field]: update } });
}
async function findUser(email) {
  return await User.find({ email: email });
}

const checkBookStatus = async (req, res) => {
  let { bookId, email, field } = req.body;
  try {
    let checkBook = await findBook(bookId);
    let userData = await User.find({ email: email });
    let statusResult = {};
    field.forEach((field) => {
      let fieldArray = userData[0][field];
      if (checkBook.length && fieldArray.includes(bookId)) {
        statusResult[field] = true;
      } else {
        statusResult[field] = false;
      }
    });
    res.send({ ok: true, data: statusResult, apiRef: bookId });
  } catch (error) {
    res.send({ ok: false });
  }
};
const setActivity = async (email) => {
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  let updatedUser;
  let userData = await User.find({ email: email });
  let dataObject = userData[0].activity;
  if (dataObject[dataObject.length - 1]?.date === today) {
    let currentCount = dataObject[dataObject.length - 1].count;
    updatedUser = await updateElementToField(
      email,
      "activity",
      { date: today, count: currentCount },
      { date: today, count: currentCount + 1 }
    );
  } else {
    updatedUser = await addElementToField(email, "activity", {
      date: today,
      count: 1,
    });
  }
};

const addBook = async (req, res) => {
  let apiRef = req.body.bookId;
  let { email, field, title, author, category, cover } = req.body;
  try {
    let newBook, updatedUser;
    let checkBook = await findBook(apiRef);
    if (!checkBook.length) {
      newBook = await createBook(title, apiRef, author, category, cover);
      updatedUser = await addElementToField(email, field, newBook.apiRef);
    } else {
      updatedUser = await addElementToField(email, field, checkBook[0].apiRef);
    }
    await setActivity(email);
    res.send({
      ok: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
const deleteBook = async (req, res) => {
  let apiRef = req.body.bookId;
  let email = req.body.email;
  let field = req.body.field;
  try {
    let removeElement = await removeElementToField(email, field, apiRef);
    let user = await findUser(req.body.email);
    console.log(user);
    res.send({ ok: true, data: user[0] });
    await setActivity(email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addBook, checkBookStatus, deleteBook };
