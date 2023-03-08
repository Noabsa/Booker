const mongo = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  host: process.env.MONGO_HOST,
  protocol: process.env.MONGO_PROTOCOL,
};
module.exports = { mongo };
