const request = require("supertest");
require("dotenv").config();

async function registerUser(userData) {
  const baseUrl = process.env.BASE_URL;
  const response = await request(baseUrl)
    .post("/api/users/register")
    .set("Content-Type", "application/json")
    .send(userData);
  return response.body;
}

module.exports = { registerUser };
