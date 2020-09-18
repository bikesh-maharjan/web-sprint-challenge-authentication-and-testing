const db = require("../database/dbConfig");

module.exports = {
  get,
  add,
  find,
  findBy,
  // findById,
};

function get() {
  return db("users");
}

function add(user) {
  // here we are adding users

  return db("users").insert(user);
}
function find() {
  // here we are finding users by their id username and password
  return db("users").select("id", "username", "password");
}
function findBy(filter) {
  // here we are filtering my its users
  return db("users").where(filter).orderBy("id");
}
// function findById() {
//   // here were are finding by its users id
//   return db("users").where({ id }).first();
// }
