import http from "k6/http";
import { check, sleep } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
import { obterToken } from "../helpers/authentication.js";
import { criarDestino } from "../helpers/destination.js";
const postLogin = JSON.parse(open("../fixtures/postLogin.json"));
const postDest = JSON.parse(open("../fixtures/postDestinations.json"));

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(90)<3000", "max<5000"],
    http_req_failed: ["rate<0.01"],
  },
};

export function setup() {
  const token = obterToken(postLogin);
  return { token };
}

export default function (data) {
  // Cria destino novo a cada iteração
  const destinoCriado = criarDestino(data.token, postDest);
  const url = pegarBaseURL() + "/api/destinations/" + destinoCriado.id;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  };
  const res = http.del(url, null, params);
  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
    "Validar mensagem de sucesso": (r) => r.json().message === "Destino removido com sucesso",
  });
  sleep(1);
}