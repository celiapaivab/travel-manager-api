const destinationService = require("../service/destinationService");

exports.create = (req, res) => {
  const { name, status, details, date } = req.body;
  const { destination, error } = destinationService.createDestination({
    userId: req.user.id,
    name,
    status,
    details,
    date,
  });
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(201).json(destination);
};

exports.list = (req, res) => {
  const userDestinations = destinationService.listDestinations(req.user.id);
  res.json(userDestinations);
};

exports.get = (req, res) => {
  const destination = destinationService.getDestination(
    req.user.id,
    req.params.id
  );
  if (!destination)
    return res.status(404).json({ message: "Destino não encontrado" });
  res.json(destination);
};

exports.update = (req, res) => {
  const { name, status, details, date } = req.body;
  const { destination, error } = destinationService.updateDestination(
    req.user.id,
    req.params.id,
    { name, status, details, date }
  );
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.json(destination);
};

exports.remove = (req, res) => {
  const result = destinationService.removeDestination(
    req.user.id,
    req.params.id
  );
  if (result.error) {
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  }
  res.status(200).json({ message: result.message });
};
