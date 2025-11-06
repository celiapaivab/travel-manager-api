import http from "k6/http";
import { check, sleep } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
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
  const url = pegarBaseURL() + "/api/users/login";
  const payload = JSON.stringify(postLogin);
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.post(url, payload, params);
  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
  });

  sleep(1);
}
