const request = require("supertest");
require("dotenv").config();

async function createDestination(token, destinationData) {
  const baseUrl = process.env.BASE_URL;
  const response = await request(baseUrl)
    .post("/api/destinations")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")
    .send(destinationData);
    return response.body;
}

module.exports = { createDestination };
