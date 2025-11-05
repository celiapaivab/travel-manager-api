const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postLogin = require("../fixtures/postLogin.json");

describe("POST /api/users/register", () => {
  const baseUrl = process.env.BASE_URL;
  const endpoint = "/api/users/register";
  const validUser = { ...postLogin };

  it("01 - Registrar novo usuário com dados válidos", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(validUser);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("username", validUser.username);
  });

  it("02 - Registrar novo usuário com username inválido", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: 123456, password: validUser.password });
    expect(response.status).to.equal(400);
  });

  it("03 - Registrar novo usuário com senha inválida", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: validUser.username, password: "123" });
    expect(response.status).to.equal(400);
  });

  it("04 - Registrar novo usuário com username ausente", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: "", password: validUser.password });
    expect(response.status).to.equal(400);
  });

  it("05 - Registrar novo usuário com senha ausente", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: validUser.username, password: "" });
    expect(response.status).to.equal(400);
  });

  it("06 - Registrar novo usuário já existente", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: "celia.bruno" , password: "123456" });
    expect(response.status).to.equal(409);
  });
});
