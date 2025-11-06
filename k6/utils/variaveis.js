export function pegarBaseURL() {
  // K6 usa __ENV para variáveis de ambiente
  return __ENV.BASE_URL || 'http://localhost:3000';
}
