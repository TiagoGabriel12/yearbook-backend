# API do Yearbook — Documentação de Endpoints

Base URL (produção): `https://yearbook-backend.vercel.app`

## Convenções

- Todas as respostas são em JSON
- Rotas protegidas exigem header `Authorization: Bearer <token>`
- O campo `senhaHash` nunca é retornado em nenhuma resposta
- Erros seguem o formato `{ "erro": "mensagem descritiva" }`

---

## Auth

### POST /auth/register

Cria uma nova conta de aluno.

- **Autenticação:** Não
- **Body:**

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "minhasenha123",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `409` — Email já cadastrado

---

### POST /auth/login

Autentica um aluno e retorna um token JWT.

- **Autenticação:** Não
- **Body:**

```json
{
  "email": "maria@email.com",
  "senha": "minhasenha123"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Erros:**
  - `401` — Credenciais inválidas

---

## Alunos

### GET /alunos

Lista todos os alunos cadastrados.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "cidade": "Salinas",
    "frase": "Aqui começa o futuro.",
    "planosFuturos": "Cursar Ciência da Computação na UFMG",
    "fotoUrl": null,
    "role": "USER",
    "criadoEm": "2026-04-03T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "João Souza",
    "email": "joao@email.com",
    "cidade": "Salinas",
    "frase": "Bora pro mundo.",
    "planosFuturos": "Engenharia de Software",
    "fotoUrl": null,
    "role": "USER",
    "criadoEm": "2026-04-03T11:00:00.000Z"
  }
]
```

- **Erros:** Nenhum específico

---

### GET /alunos/:id

Busca um aluno específico pelo ID.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `404` — Aluno não encontrado

---

### PUT /alunos/:id

Atualiza o próprio perfil. Apenas o próprio aluno pode atualizar seus dados.

- **Autenticação:** Bearer token
- **Body:** (todos os campos são opcionais)

```json
{
  "nome": "Maria Silva Santos",
  "cidade": "Belo Horizonte",
  "frase": "Novos rumos.",
  "planosFuturos": "Mestrado em IA",
  "fotoUrl": "https://cdn.exemplo.com/maria.jpg"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva Santos",
  "email": "maria@email.com",
  "cidade": "Belo Horizonte",
  "frase": "Novos rumos.",
  "planosFuturos": "Mestrado em IA",
  "fotoUrl": "https://cdn.exemplo.com/maria.jpg",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `401` — Token ausente ou inválido
  - `403` — Tentou atualizar o perfil de outro aluno
  - `404` — Aluno não encontrado

---

### DELETE /alunos/:id

Remove um aluno. Apenas o `ADMIN` pode executar.

- **Autenticação:** Bearer token (admin)
- **Body:** Nenhum
- **Resposta de sucesso:** `204 No Content`
- **Erros:**
  - `401` — Token ausente ou inválido
  - `403` — Usuário autenticado não é admin
  - `404` — Aluno não encontrado

---

## Mensagens

### GET /mensagens

Lista todas as mensagens do mural, com os dados do autor embutidos.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "texto": "Saudades dessa turma!",
    "imagemUrl": null,
    "autorId": 1,
    "criadoEm": "2026-04-03T12:00:00.000Z",
    "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": null
    }
  },
  {
    "id": 2,
    "texto": "Foi inesquecível.",
    "imagemUrl": "https://cdn.exemplo.com/foto.jpg",
    "autorId": 2,
    "criadoEm": "2026-04-03T12:30:00.000Z",
    "autor": {
      "id": 2,
      "nome": "João Souza",
      "fotoUrl": null
    }
  }
]
```

- **Erros:** Nenhum específico

---

### POST /mensagens

Cria uma nova mensagem no mural. O `autorId` é extraído do token JWT — não vai no body.

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "texto": "Que saudade da nossa turma!",
  "imagemUrl": "https://cdn.exemplo.com/foto.jpg"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 3,
  "texto": "Que saudade da nossa turma!",
  "imagemUrl": "https://cdn.exemplo.com/foto.jpg",
  "autorId": 1,
  "criadoEm": "2026-04-03T13:00:00.000Z",
  "autor": {
    "id": 1,
    "nome": "Maria Silva",
    "fotoUrl": null
  }
}
```

- **Erros:**
  - `400` — Campo `texto` ausente
  - `401` — Token ausente ou inválido

---

### DELETE /mensagens/:id

Exclui uma mensagem. Apenas o autor da mensagem ou um `ADMIN` pode excluir.

- **Autenticação:** Bearer token
- **Body:** Nenhum
- **Resposta de sucesso:** `204 No Content`
- **Erros:**
  - `401` — Token ausente ou inválido
  - `403` — Usuário não é o autor da mensagem nem admin
  - `404` — Mensagem não encontrada
