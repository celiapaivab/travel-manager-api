const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, users } = require("../model/user");
const { SECRET } = require("../service/auth");

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "A senha deve ter pelo menos 6 caracteres" });
  }
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ message: "Nome de usuário já cadastrado" });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    id: generateId(),
    username,
    password: hashedPassword,
  });
  users.push(user);
  res.status(201).json({ id: user.id, username: user.username });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nome de usuário e senha são obrigatórios" });
  }
  const user = users.find((u) => u.username === username);
  if (!user)
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

exports.me = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({
    id: user.id,
    username: user.username,
  });
};
