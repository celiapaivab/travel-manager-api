const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, users } = require("../model/user");
const { SECRET } = require("../service/auth");

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email já cadastrado" });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    id: generateId(),
    name,
    email,
    password: hashedPassword,
  });
  users.push(user);
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

exports.me = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
};
