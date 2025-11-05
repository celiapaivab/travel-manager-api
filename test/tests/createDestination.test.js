const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postDest = require("../fixtures/postDestinations.json");
const postLogin = require("../fixtures/postLogin.json");
const { obterToken } = require("../helpers/authentication.js");

describe("POST /api/destinations", () => {
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
  });

  it("16 - Registrar informações de um novo destino com dados válidos", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(postDest);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("name", postDest.name);
    expect(response.body).to.have.property("status", postDest.status);
  });

  it("17 - Registrar informações de um novo destino apenas com dados obrigatórios", async () => {
    const minimal = { name: "Rio de Janeiro", status: "wishlist" };
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send(minimal);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("name", minimal.name);
    expect(response.body).to.have.property("status", minimal.status);
  });

  it("18 - Registrar informações sem o dado obrigatório nome", async () => {
    const { status, details, date } = postDest;
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ status, details, date });
    expect(response.status).to.equal(400);
  });

  it("19 - Registrar informações sem o dado obrigatório status", async () => {
    const { name, details, date } = postDest;
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ name, details, date });
    expect(response.status).to.equal(400);
  });

  it("20 - Registrar informações com dado obrigatório nome inválido", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ ...postDest, name: "" });
    expect(response.status).to.equal(400);
  });

  it("21 - Registrar informações com dado obrigatório status inválido", async () => {
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ ...postDest, status: "" });
    expect(response.status).to.equal(400);
  });

  it("22 - Registrar informações de um novo destino sem autenticação válida", async () => {
    const tokenVazio = ""
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${tokenVazio}`)
      .set("Content-Type", "application/json")
      .send(postDest);
    expect(response.status).to.equal(401);
  });

  it("23 - Registrar informações de um novo destino com autenticação inválida", async () => {
    const tokenInvalido = "token_invalido";
    const response = await request(baseUrl)
      .post(endpoint)
      .set("Authorization", `Bearer ${tokenInvalido}`)
      .set("Content-Type", "application/json")
      .send(postDest);
    expect([401, 403]).to.include(response.status);
  });
});
