const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postDest = require("../fixtures/postDestinations.json");
const postLogin = require("../fixtures/postLogin.json");
const { obterToken } = require("../helpers/authentication.js");
const { createDestination } = require("../helpers/destination.js");

describe("DELETE /api/destinations/{id}", () => {
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

  it("39 - Deletar destino com autenticação válida", async () => {
    const response = await request(baseUrl)
      .delete(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
  });

  it("40 - Deletar destino inexistente com autenticação válida", async () => {
    const nonexistentId = "nonexistent";
    const response = await request(baseUrl)
      .delete(`${endpoint}/${nonexistentId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(404);
  });

  it("41 - Deletar destino sem autenticação válida", async () => {
    const tokenVazio = "";
    const response = await request(baseUrl)
      .delete(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${tokenVazio}`);
    expect(response.status).to.equal(401);
  });

  it("42 - Deletar destino com autenticação inválida", async () => {
    const tokenInvalido = "token_invalido";
    const response = await request(baseUrl)
      .delete(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${tokenInvalido}`);
    expect(response.status).to.equal(403);
  });
});
