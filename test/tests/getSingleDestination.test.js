const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postDest = require("../fixtures/postDestinations.json");
const postLogin = require("../fixtures/postLogin.json");
const { obterToken } = require("../helpers/authentication.js");
const { createDestination } = require("../helpers/destination.js");

describe("GET /api/destinations/{id}", () => {
  const baseUrl = process.env.BASE_URL;
  const endpoint = "/api/destinations";
  let token;
  let createdDestination;

  before(async () => {
    // Garante que o usuário existe e obtém token
    await request(baseUrl)
      .post("/api/users/register")
      .set("Content-Type", "application/json")
      .send(postLogin);
    token = await obterToken(postLogin.username, postLogin.password);
    // Cria um destino para os testes
    createdDestination = await createDestination(token, postDest);
  });

  it("27 - Acessar informação de destino específico com autenticação válida", async () => {
    const response = await request(baseUrl)
      .get(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("id", createdDestination.id);
    expect(response.body).to.have.property("name", postDest.name);
    expect(response.body).to.have.property("status", postDest.status);
  });

  it("28 - Acessar destino inexistente com autenticação válida", async () => {
    const response = await request(baseUrl)
      .get(`${endpoint}/id_inexistente`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(404);
  });

  it("29 - Acessar destino com autenticação ausente", async () => {
    const tokenVazio = "";
    const response = await request(baseUrl)
      .get(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${tokenVazio}`);
    expect(response.status).to.equal(401);
  });

  it("30 - Acessar destino com autenticação inválida", async () => {
    const tokenInvalido = "token_invalido";
    const response = await request(baseUrl)
      .get(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${tokenInvalido}`);
    expect(response.status).to.equal(403);
  });
});
