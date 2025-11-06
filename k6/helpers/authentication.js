import http from "k6/http";
import { pegarBaseURL } from "../utils/variaveis.js";

// Recebe dados do usuário (username, password) e retorna o token JWT
export function obterToken(userData) {
  const url = pegarBaseURL() + "/api/users/login";
  const payload = JSON.stringify(userData);
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.post(url, payload, params);
    return res.json().token;
}
