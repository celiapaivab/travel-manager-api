Objetivo
Criar uma API Rest para gerenciamento de viagens de destinos de viagens.

Contexto
- A API possui as seguintes funcionalidades: registro de usuário, login de usuário, busca de informações do usuário logado, registro de destino, lista de todos os destinos do usuário, busca de detalhes de um destino específico, atulização das informações do destino,  remocão do destino.
- O registro de usuários deve conter nome, email, telefone e senha.
- O registro de destino deve conter nome e status obrigatórios.
- O registro de destino deve conter detalhes e data não obrigatórios. 
- As categorias de status são wishlist, planning e completed.
- Para que eu possa usar as funcionalidades, preciso fazer login.

**Regras**
- Não me pergunte nada, só faça.
- A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
- Adicione um endpoint para renderizar o Swagger.
- Construa um arquivo README para descrever o projeto
- Divida a API em camadas: routes, controllers, service e model
- Armazene os dados da API em um banco de dados em memória
- Utilize a biblioteca express para construir a API Rest
- Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.