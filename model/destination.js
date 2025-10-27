// Destination model and in-memory storage
const destinations = [];

const STATUS = ['wishlist', 'planning', 'completed'];

class Destination {
  constructor({ id, userId, name, status, details = '', date = null }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.status = status;
    this.details = details;
    this.date = date;
  }
}

module.exports = { Destination, destinations, STATUS };