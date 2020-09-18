const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

async function add(user) {
  // here we are adding users
  const [id] = await db("users").insert(user);
  return findById(id);
}
function find() {
  // here we are finding users by their id username and password
  return db("users").select("id", "username", "password");
}
function findBy(filter) {
  // here we are filtering my its users
  return db("users").where(filter);
}
function findById() {
  // here were are finding by its users id
  return db("users").where({ id }).first();
}
