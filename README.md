# 🚀 Desafio 01 - Fundamentos do Node.js

Este projeto é parte da trilha de node da Rocketseat e propõe a criação de uma API RESTful sem uso de frameworks para gerenciar tarefas (**Tasks**), utilizando os fundamentos do Node.js como manipulação de rotas, streams, módulos nativos e conceitos de HTTP.

## Conceitos Praticados

- Manipulação de rotas HTTP
- Estruturação de dados em memória
- Manipulação de arquivos com streams
- Validação de dados
- Boas práticas com código limpo e organizado

## Funcionalidades da API

| Método | Rota                 | Descrição                                                              |
| ------ | -------------------- | ---------------------------------------------------------------------- |
| POST   | `/task`              | Cria uma nova task                                                     |
| GET    | `/task`              | Lista todas as tasks, com suporte a filtro por `title` e `description` |
| PUT    | `/task/:id`          | Atualiza `title` e/ou `description` de uma task pelo ID                |
| DELETE | `/task/:id`          | Remove uma task existente pelo ID                                      |
| PATCH  | `/task/:id/complete` | Marca ou desmarca a task como concluída                                |
| POST   | `/tasks`             | Importa várias tasks a partir de um arquivo `.csv`                     |

## Estrutura da Task

```json
{
  "id": "uuid",
  "title": "Título da task",
  "description": "Descrição da task",
  "completed_at": null,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

## Importação de Tasks via CSV

Você pode importar várias tasks enviando um arquivo .csv com as colunas title e description. O parser é feito utilizando Streams para performance e escalabilidade.

### Exemplo de CSV:

title,description
Estudar Node.js,Aprofundar fundamentos
Ler documentação,Entender funcionamento do csv-parse```

## Validações Implementadas

title e description são obrigatórios nas rotas de criação e atualização apenas um deles.

O id deve existir no banco de dados para as rotas que o utilizam.

Mensagens de erro descritivas para requisições inválidas.

## Como rodar

### Instale as dependências

`pnpm install`

### Inicie a aplicação em modo dev

`pnpm dev`

## Estrutura de arquivos

.
├── src
│ ├── dtos # Tipagens
│ ├── infra # Configurações do banco de dados
│ ├── middlewares # Validações e tratamento de requisições
│ ├── routes # Definição das rotas da API
│ ├── database # Persistência local (db.json)
│ ├── utils # Funções auxiliares
│ └── server.ts # Ponto de entrada da aplicação
├── tsconfig.json # Configurações do TypeScript
├── package.json # Dependências e scripts
└── README.md # Documentação

## Aprendizados

Neste desafio foram colocados em prática os seguintes conceitos:

- HTTP com Node.js puro (sem frameworks como Express)

- Criação e Manipulação de arquivos CSV com csv-parse

- Streams e buffers

- Validação e tratamento de erros

- Boas práticas com TypeScript

- Criação de middlewares e rotas organizadas

## Tecnologias Utilizadas

Ferramenta | Versão

- Node.js >= 22
- TypeScript >= 4
- csv-parse ^5
- csv-stringify ^6

## Melhorias possíveis

- Paginação na listagem de tasks

- Testes automatizados com Node.js + vitest/jest

## Autor

Feito com "ódio" por Lucas-Braz7x • Desafio da trilha Node.js da Rocketseat 🚀
