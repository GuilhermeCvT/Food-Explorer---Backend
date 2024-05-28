# Food Explorer - Backend 🥓

Esse projeto é uma API e foi desenvolvida utilizando NodeJS, Knex, SQLite, JWT, Multer e Express-async-errors. O projeto está publicado e pode ser acessado através desse [link](https://food-explorer-backend-qn8o.onrender.com). Nele, é possível 
- Cadastrar e atualizar usuários; 
- Criar sessão de login;
- Cadastrar, atualizar, consultar e deletar pratos;
- Cadastrar ingredientes.

Para utilizar localmente este projeto, basta instalar as bibliotecas necessários com o NPM e rodar com o seguinte comando:

```
npm run dev
```

## Utilização

Para realizar as ações descritas acima, siga as instruções:

### Criar sessão de login
**Rota**: /sessions

**HTTP Method**: Post

**Conteúdo (JSON)**: 
```JSON
{
	"email": "email@email.com.br",
	"password": "123456"
}
```

_**Obs.**: Para realizar qualquer ação na API, com exceção de criação de usuário, é necessário ter uma sessão ativa._

### Cadastro de usuários
**Rota**: /users

**HTTP Method**: Post

**Conteúdo (JSON)**:
```JSON
{
	"name": "nome",
	"email": "email@email.com.br",
	"password": "123456",
	"position": "Usuario"
}
```

_**Obs.**: Para o campo **position**, deve-se preencher apenas com **Usuario** ou **Admin**._

### Edição de usuários
**Rota**: /users

**HTTP Method**: Put

**Conteúdo (JSON)**:
```JSON
{
	"name": "nome",
	"email": "email@email.com.br",
	"position": "Usuario",
	"active": 1,
	"password": "nova senha",
	"old_password": "senha atual"
}
```

_**Obs.**: Caso o campo `password` seja fornecido, o `old_password` também será necessário, e vice-versa._

### Criação de pratos
**Rota**: /plates

**HTTP Method**: Post

**Conteúdo (JSON)**:
```JSON
{
	"name": "Strogonoffe",
	"category": "refeicao",
	"description": "Strogonoffe de frango ao molho da casa",
	"price": "22,22",
	"ingredients": ["Frango", "Arroz"]
}
```

_**Obs.**: Para o campo `category`, será permitido apenas `refeicao`, `sobremesa` ou `bebida`._

### Edição de pratos
**Rota**: /plates/id

**HTTP Method**: Put

**Parâmetros**: identificador (integer) do prato

**Conteúdo (JSON)**:
```JSON
{
	"name": "Parmegiana",
	"category": "refeicao",
	"description": "Parmegiana de frango",
	"price": "22,22",
	"ingredients": ["Molho", "Frango"]
}
```

_**Obs.**: Para o campo `category`, será permitido apenas `refeicao`, `sobremesa` ou `bebida`._

### Inclusão de imagem
**Rota**: /plates/image/id

**HTTP Method**: Patch

**Parâmetros**: identificador (integer) do prato

**Conteúdo**: imagem

### Consulta de pratos
**Rota**: /plates?name&ingredients

**HTTP Method**: Get

**Parâmetros**: name(string), ingredients(array de strings)

### Consulta de prato específico
**Rota**: /plates/id

**HTTP Method**: Get

**Parâmetros**: identificador (integer) do prato

### Deletar prato específico
**Rota**: /plates/id

**HTTP Method**: Delete

**Parâmetros**: identificador (integer) do prato
