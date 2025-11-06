# Travel Manager API

API Rest para gerenciamento de viagens e destinos.

## Funcionalidades

- Registro de usuário (nome, email, senha)
- Login de usuário (JWT)
- Busca de informações do usuário logado (/api/users/user)
- Registro de destino (nome e status obrigatórios, detalhes e data opcionais)
- Lista de todos os destinos do usuário
- Busca de detalhes de um destino específico
- Atualização das informações do destino
- Remoção do destino

## Categorias de status de destino

- wishlist
- planning
- completed

## Autenticação

- JWT obrigatório para acessar endpoints de destinos
- Envie o token no header: `Authorization: Bearer <token>`

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Como rodar API do projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger para testar os endpoints.

## Endpoints principais

- `POST /api/users/register`: Registro de usuário
- `POST /api/users/login`: Login de usuário
- `GET /api/users/user`: Buscar informações do usuário logado (JWT obrigatório)
- `POST /api/destinations`: Registrar destino (JWT obrigatório)
- `GET /api/destinations`: Listar destinos do usuário (JWT obrigatório)
- `GET /api/destinations/{id}`: Buscar detalhes de um destino (JWT obrigatório)
- `PUT /api/destinations/{id}`: Atualizar informações do destino (JWT obrigatório)
- `DELETE /api/destinations/{id}`: Remover destino (JWT obrigatório)

## Tecnologias e Ferramentas Utilizadas

- Node.js e Express (API backend)
- JWT (autenticação)
- Swagger/OpenAPI (documentação)

## Testes Funcionais

Os testes funcionais automatizados estão localizados em `test/tests/` e cobrem todos os principais endpoints da API.

### Tecnologias e ferramentas

- Mocha (framework de testes)
- Chai (assertions)
- Supertest (requisições HTTP)
- Mochawesome (relatórios)

### Como executar os testes funcionais

Para executar todos os testes e gerar relatório:

```bash
npm test
```

O relatório será gerado na pasta `mochawesome-report`.

## Testes de Performance (K6)

Os testes de performance automatizados estão localizados em `k6/tests/` e utilizam K6 com mocha e chai para simular carga nos principais endpoints da API.

### Tecnologias e ferramentas

- K6 (testes de performance)
- mocha/chai para K6 (asserts)

### Como executar os testes de performance

Execute o comando abaixo para rodar qualquer teste de performance:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run k6/tests/<nome-do-teste>.test.js
```

O relatório será gerado em `html-report.html` e pode ser visualizado no navegador.

- Os testes criam dados dinâmicos para garantir resultados realistas.
- Helpers para autenticação e criação de destinos estão em `k6/helpers/`.
- Os thresholds e stages seguem o padrão para simular carga progressiva.

## Observações

- Os dados são armazenados apenas em memória (serão perdidos ao reiniciar a aplicação)
- Use a documentação Swagger para exemplos de requisições e respostas

## Estrutura do Projeto

- `app.js`: Ponto de entrada da aplicação
- `controllers/`: Lógica dos endpoints (destinationController.js, userController.js)
- `routes/`: Rotas da API (destinationRoutes.js, userRoutes.js)
- `service/`: Serviços e middlewares (auth.js, destinationService.js, userService.js)
- `model/`: Modelos e armazenamento em memória (destination.js, user.js)
- `resources/swagger.yaml`: Documentação Swagger/OpenAPI
- `test/`: Testes funcionais
  - `fixtures/`: Dados de exemplo para testes
  - `helpers/`: Funções utilitárias para testes
  - `tests/`: Arquivos de teste para cada endpoint
- `k6/`: Testes de performance
  - `fixtures/`: Dados de exemplo para performance
  - `helpers/`: Funções utilitárias para performance
  - `tests/`: Arquivos de teste de carga para cada endpoint
  - `utils/`: Variáveis e configurações para K6
- `README.md`: Documentação do projeto
- `package.json` e `package-lock.json`: Dependências e scripts
