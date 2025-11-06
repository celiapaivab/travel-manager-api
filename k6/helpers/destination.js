import http from "k6/http";
import { pegarBaseURL } from "../utils/variaveis.js";

// Cria um destino para o usuário autenticado
export function criarDestino(token, destinoData) {
  const url = pegarBaseURL() + "/api/destinations";
  const payload = JSON.stringify(destinoData);
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const res = http.post(url, payload, params);
  return res.json();
}