// User model and in-memory storage
const bcrypt = require("bcryptjs");

const users = [];

class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password; // hashed
  }
}

// Usuário padrão criado na memória
users.push(
  new User({
    id: "1",
    username: "celia.bruno",
    password: bcrypt.hashSync("123456", 8),
  })
);

module.exports = { User, users };
