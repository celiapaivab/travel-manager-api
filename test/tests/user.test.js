const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const postLogin = require("../fixtures/postLogin.json");
const { obterToken } = require("../helpers/authentication.js");
const { registerUser } = require("../helpers/registerUser.js");

describe("GET /api/users/user", () => {
  const baseUrl = process.env.BASE_URL;
  const endpoint = "/api/users/user";
  const validUser = { ...postLogin };
  let token;

  before(async () => {
    // Garante que o usuário existe antes dos testes
    await registerUser(validUser);
    token = await obterToken(validUser.username, validUser.password);
  });

  it("12 - Acessar informações do usuário com autenticação válida", async () => {
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("username", validUser.username);
  });

  it("13 - Acessar informações do usuário com autenticação ausente", async () => {
    const tokenVazio = "";
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${tokenVazio}`);
    expect(response.status).to.equal(401);
  });

  it("14 - Acessar informações do usuário com autenticação inválida", async () => {
    const tokenInvalido = "token_invalido";
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${tokenInvalido}`);
    expect(response.status).to.equal(403);
  });

  it("15 - Acessar informações de usuário com token expirado", async () => {
    const tokenExpirado =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImNlbGlhLmJydW5vIiwiaWF0IjoxNzYyMzc4MTIwLCJleHAiOjE3NjIzODE3MjB9.pwb5j4At1iXHLc9hrEDyLtecdknL4_3P6xrpfTlvev4";
    const response = await request(baseUrl)
      .get(endpoint)
      .set("Authorization", `Bearer ${tokenExpirado}`);
    expect(response.status).to.equal(403);
  });
});
