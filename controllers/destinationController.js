const { Destination, destinations, STATUS } = require("../model/destination");

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

exports.create = (req, res) => {
  const { name, status, details, date } = req.body;
  if (!name || !status) {
    return res.status(400).json({ message: "Nome e status são obrigatórios" });
  }
  if (!STATUS.includes(status)) {
    return res.status(400).json({ message: "Status inválido" });
  }
  const destination = new Destination({
    id: generateId(),
    userId: req.user.id,
    name,
    status,
    details: details || "",
    date: date || null,
  });
  destinations.push(destination);
  res.status(201).json(destination);
};

exports.list = (req, res) => {
  const userDestinations = destinations.filter((d) => d.userId === req.user.id);
  res.json(userDestinations);
};

exports.get = (req, res) => {
  const destination = destinations.find(
    (d) => d.id === req.params.id && d.userId === req.user.id
  );
  if (!destination)
    return res.status(404).json({ message: "Destino não encontrado" });
  res.json(destination);
};

exports.update = (req, res) => {
  const destination = destinations.find(
    (d) => d.id === req.params.id && d.userId === req.user.id
  );
  if (!destination)
    return res.status(404).json({ message: "Destino não encontrado" });
  const { name, status, details, date } = req.body;
  if (status && !STATUS.includes(status)) {
    return res.status(400).json({ message: "Status inválido" });
  }
  if (name !== undefined) destination.name = name;
  if (status !== undefined) destination.status = status;
  if (details !== undefined) destination.details = details;
  if (date !== undefined) destination.date = date;
  res.json(destination);
};

exports.remove = (req, res) => {
  const index = destinations.findIndex(
    (d) => d.id === req.params.id && d.userId === req.user.id
  );
  if (index === -1)
    return res.status(404).json({ message: "Destino não encontrado" });
  destinations.splice(index, 1);
  res.status(200).json({ message: "Destino removido com sucesso" });
};
