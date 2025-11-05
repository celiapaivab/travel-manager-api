const jwt = require("jsonwebtoken");
const { SECRET } = require("../service/auth");
const userService = require("../service/userService");

exports.register = (req, res) => {
  const { username, password } = req.body;
  const { user, error } = userService.registerUser({ username, password });
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(201).json({ id: user.id, username: user.username });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const { user, error } = userService.loginUser({ username, password });
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

exports.me = (req, res) => {
  const user = userService.getUserById(req.user.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({
    id: user.id,
    username: user.username,
  });
};
