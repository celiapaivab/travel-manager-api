const request = require("supertest");
const postLogin = require("../fixtures/postLogin.json");

const obterToken = async (username, password) => {
  const baseUrl = process.env.BASE_URL;
  const response = await request(baseUrl)
    .post("/api/users/login")
    .set("Content-Type", "application/json")
    .send({ username, password });
    return response.body.token;
};

module.exports = {
  obterToken,
};
