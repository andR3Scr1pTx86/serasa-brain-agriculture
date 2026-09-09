## Descrição

Este projeto foi desenvolvido em **NestJS** para gerenciar o cadastro de produtores rurais. A arquitetura segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**. A aplicação foi construida sob o conceito de **Monolito Modular**, garantindo alta coesão entre os módulos e permitindo que o sistema evolua de forma sustentável, podendo inclusive ser refatorado para uma arquitetura de **microsserviços** caso haja necessidade de escalabilidade no futuro.

## Tecnologias

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **ORM**: TypeORM
- **Banco de dados**: PostgreSQL
- **Containerização**: Docker
- **Orquestração**: Docker Compose
- **Documentação**: Swagger/OpenAPI

## Como executar o projeto

Siga as etapas abaixo para configurar e executar a aplicação localmente.

#### Clone o repositório

```bash
$ git clone git@github.com:andR3Scr1pTx86/serasa-brain-agriculture.git
```
#### Execute o comando do orquestrador

```bash
$ docker compose -f docker-compose.yml up -d

# Se o comando acima não funcionar, tente usar:

$ docker-compose -f docker-compose.yml up -d
```

#### A aplicação já estará em execução!!!

[Acessar a interface do usuário](http://localhost:3000/doc)

## Como executar os testes

Neste ponto, ele deve rodar normalmente na sua máquina.

#### Testes Unitários

```bash
$ npm run test:unit
```

#### Testes de Integração

Para executar os testes de integração, você precisará carregar o banco de dados de testes.

```bash
$ docker compose -f docker-compose.test.yml up -d

# Se o comando acima não funcionar, tente usar:

$ docker-compose -f docker-compose.test.yml up -d
```

Após o container iniciar e o banco de dados estiver em execução

```bash
$ npm run test:int
```

Assim que a execução for concluída, você pode encerrar o contêiner.

```bash
$ docker compose -f docker-compose.test.yml down -v

# Se o comando acima não funcionar, tente usar:

$ docker-compose -f docker-compose.test.yml down -v
```

#### Coverage

Siga as etapas do **"teste de integração"**, apenas substituindo o comando:

```bash
$ npm run test:int
```

por:

```bash
$ npm run test:cov
```

## Observação

Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de desenvolvedor backend (Node.js) na Serasa Experian (Brain-AG).