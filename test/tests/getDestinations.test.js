const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postDest = require("../fixtures/postDestinations.json");
const postLogin = require("../fixtures/postLogin.json");
const { obterToken } = require("../helpers/authentication.js");
const { createDestination } = require("../helpers/destination.js");

describe("GET /api/destinations", () => {
  const baseUrl = process.env.BASE_URL;
  const endpoint = "/api/destinations";
  let token;

  before(async () => {
    // Garante que o usuário existe e obtém token
    await request(baseUrl)
      .post("/api/users/register")
      .set("Content-Type", "application/json")
      .send(postLogin);
    token = await obterToken(postLogin.username, postLogin.password);
    // Cria pelo menos um destino usando o helper
    await createDestination(token, postDest);
  });

  it("24 - Acessar lista de destinos do usuário com autenticação válida", async () => {
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.be.greaterThan(0);
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("status");
  });

  it("25 - Acessar lista de destinos do usuário sem autenticação válida", async () => {
    const tokenVazio = "";
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${tokenVazio}`);
    expect(response.status).to.equal(401);
  });

  it("26 - Acessar lista de destinos do usuário com autenticação inválida", async () => {
    const tokenInvalido = "token_invalido";
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${tokenInvalido}`);
    expect(response.status).to.equal(403);
  });
});
