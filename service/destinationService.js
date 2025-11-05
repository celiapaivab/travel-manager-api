const { Destination, destinations, STATUS } = require("../model/destination");

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function createDestination({ userId, name, status, details, date }) {
  if (!name || !status) {
    return {
      error: { status: 400, message: "Nome e status são obrigatórios" },
    };
  }
  if (!STATUS.includes(status)) {
    return { error: { status: 400, message: "Status inválido" } };
  }
  const destination = new Destination({
    id: generateId(),
    userId,
    name,
    status,
    details: details || "",
    date: date || null,
  });
  destinations.push(destination);
  return { destination };
}

function listDestinations(userId) {
  return destinations.filter((d) => d.userId === userId);
}

function getDestination(userId, id) {
  return destinations.find((d) => d.id === id && d.userId === userId);
}

function updateDestination(userId, id, { name, status, details, date }) {
  const destination = getDestination(userId, id);
  if (!destination) {
    return { error: { status: 404, message: "Destino não encontrado" } };
  }
  if (status && !STATUS.includes(status)) {
    return { error: { status: 400, message: "Status inválido" } };
  }
  if (name !== undefined) destination.name = name;
  if (status !== undefined) destination.status = status;
  if (details !== undefined) destination.details = details;
  if (date !== undefined) destination.date = date;
  return { destination };
}

function removeDestination(userId, id) {
  const index = destinations.findIndex(
    (d) => d.id === id && d.userId === userId
  );
  if (index === -1) {
    return { error: { status: 404, message: "Destino não encontrado" } };
  }
  destinations.splice(index, 1);
  return { message: "Destino removido com sucesso" };
}

module.exports = {
  createDestination,
  listDestinations,
  getDestination,
  updateDestination,
  removeDestination,
};
