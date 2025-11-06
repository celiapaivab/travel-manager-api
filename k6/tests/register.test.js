import http from "k6/http";
import { check, sleep } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

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
  const url = pegarBaseURL() + "/api/users/register";

  const payload = JSON.stringify({
    username: `${postLogin.username}_${Date.now()}_${Math.floor(
      Math.random() * 1000
    )}`,
    password: postLogin.password,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "status is 201": (res) => res.status === 201,
  });

  sleep(1);
}
