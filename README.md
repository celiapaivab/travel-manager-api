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

## Estrutura do Projeto

- `app.js`: Ponto de entrada da aplicação
- `routes/`: Rotas da API
- `controllers/`: Lógica dos endpoints
- `service/`: Serviços e middlewares (ex: autenticação)
- `model/`: Modelos e armazenamento em memória
- `resources/`: Documentação Swagger
- `test/tests/`: Testes funcionais automatizados

## Testes Funcionais

Os testes funcionais automatizados estão localizados em `test/tests/` e cobrem todos os principais endpoints da API:

- `register.test.js`: Registro de usuário (`POST /api/users/register`)
- `login.test.js`: Login de usuário (`POST /api/users/login`)
- `user.test.js`: Informações do usuário logado (`GET /api/users/user`)
- `createDestination.test.js`: Criação de destino (`POST /api/destinations`)
- `getDestinations.test.js`: Listagem de destinos (`GET /api/destinations`)
- `getSingleDestination.test.js`: Detalhes de destino (`GET /api/destinations/{id}`)
- `updateDestination.test.js`: Atualização de destino (`PUT /api/destinations/{id}`)
- `deleteDestination.test.js`: Remoção de destino (`DELETE /api/destinations/{id}`)

Para executar todos os testes e gerar relatório:

```bash
npm test
```

O relatório será gerado na pasta `mochawesome-report`.

## Observações

- Os dados são armazenados apenas em memória (serão perdidos ao reiniciar a aplicação)
- Use a documentação Swagger para exemplos de requisições e respostas
