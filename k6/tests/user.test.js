import http from "k6/http";
import { check, sleep } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
import { obterToken } from "../helpers/authentication.js";
const postLogin = JSON.parse(open("../fixtures/postLogin.json"));

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

export default function () {
  const token = obterToken(postLogin);
  const url = pegarBaseURL() + "/api/users/user";
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const res = http.get(url, params);
  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
  });
  sleep(1);
}
