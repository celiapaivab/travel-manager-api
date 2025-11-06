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
  criarDestino(token, postDest);
  return { token };
}

export default function (data) {
  const url = pegarBaseURL() + "/api/destinations";
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  };
  const res = http.get(url, params);
  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
  });
  sleep(1);
}