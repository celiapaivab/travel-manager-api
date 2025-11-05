const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postLogin = require("../fixtures/postLogin.json");

describe("POST /api/users/login", () => {
  const baseUrl = process.env.BASE_URL;
  const endpoint = "/api/users/login";
  const validUser = { ...postLogin };

  before(async () => {
    // Garante que o usuário válido existe
    await request(baseUrl)
      .post("/api/users/register")
      .set("Content-Type", "application/json")
      .send(validUser);
  });

  it("07 - Fazer login de usuário com credenciais válidas", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(validUser);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
    expect(response.body.token).to.be.a("string");
  });

  it("08 - Fazer login de usuário com nome inválido", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: 123456, password: validUser.password });
    expect(response.status).to.equal(401);
  });

  it("09 - Fazer login de usuário com senha inválida", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: validUser.username, password: "123" });
    expect(response.status).to.equal(401);
  });

  it("10 - Fazer login de usuário com nome ausente", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: "", password: validUser.password });
    expect(response.status).to.equal(400);
  });

  it("11 - Fazer login de usuário com senha ausente", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send({ username: validUser.username, password: "" });
    expect(response.status).to.equal(400);
  });
});
