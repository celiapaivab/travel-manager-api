const bcrypt = require("bcryptjs");
const { User, users } = require("../model/user");

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function registerUser({ username, password }) {
  if (!username || !password) {
    return {
      error: { status: 400, message: "Todos os campos são obrigatórios" },
    };
  }
  if (password.length < 6) {
    return {
      error: {
        status: 400,
        message: "A senha deve ter pelo menos 6 caracteres",
      },
    };
  }
  if (users.find((u) => u.username === username)) {
    return { error: { status: 409, message: "Nome de usuário já cadastrado" } };
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    id: generateId(),
    username,
    password: hashedPassword,
  });
  users.push(user);
  return { user };
}

function loginUser({ username, password }) {
  if (!username || !password) {
    return {
      error: {
        status: 400,
        message: "Nome de usuário e senha são obrigatórios",
      },
    };
  }
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { error: { status: 401, message: "Usuário ou senha inválidos" } };
  }
  return { user };
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

module.exports = { registerUser, loginUser, getUserById };
