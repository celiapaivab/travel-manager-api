const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postDest = require("../fixtures/postDestinations.json");
const postLogin = require("../fixtures/postLogin.json");
const { obterToken } = require("../helpers/authentication.js");
const { createDestination } = require("../helpers/destination.js");

describe("PUT /api/destinations/{id}", () => {
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

  it("31 - Atualizar nome do destino com autenticação válida", async () => {
    const updated = { ...postDest, name: "São Paulo" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("name", updated.name);
  });

  it("32 - Atualizar status do destino com autenticação válida", async () => {
    const updated = { ...postDest, status: "planning" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", updated.status);
  });

  it("33 - Atualizar detalhes do destino com autenticação válida", async () => {
    const updated = { ...postDest, details: "Visitar Cristo" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("details", updated.details);
  });

  it("34 - Atualizar data do destino com autenticação válida", async () => {
    const updated = { ...postDest, date: "2025-12-24" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("date", updated.date);
  });

  it("35 - Atualizar status com dado inválido", async () => {
    const updated = { ...postDest, status: "invalid_status" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(400);
  });

  it("36 - Atualizar destino inexistente", async () => {
    const updated = { ...postDest, name: "Destino Inexistente" };
    const nonexistentId = "nonexistent";
    const response = await request(baseUrl)
      .put(`${endpoint}/${nonexistentId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(404);
  });

  it("37 - Atualizar destino sem autenticação válida", async () => {
    const tokenVazio = "";
    const updated = { ...postDest, name: "Sem Autenticação" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${tokenVazio}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(401);
  });

  it("38 - Atualizar destino com autenticação inválida", async () => {
    const tokenInvalido = "token_invalido";
    const updated = { ...postDest, name: "Token Inválido" };
    const response = await request(baseUrl)
      .put(`${endpoint}/${createdDestination.id}`)
      .set("Authorization", `Bearer ${tokenInvalido}`)
      .set("Content-Type", "application/json")
      .send(updated);
    expect(response.status).to.equal(403);
  });
});
