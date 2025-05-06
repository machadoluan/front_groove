# Groove Street – Front-End

Este é o front-end do projeto **Groove Street**, desenvolvido com [Angular](https://angular.io/) e [Angular CLI](https://github.com/angular/angular-cli) versão 18.0.7.

## ✅ Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (vem com o Node.js)
- [Angular CLI](https://angular.io/cli)  
  Instale com o comando:

```bash
npm install -g @angular/cli
```

> ⚠️ Caso você nunca tenha usado Angular, **não se preocupe** — este guia cobre o essencial para rodar o projeto.

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**

```bash
ng serve
```

4. **Acesse no navegador:**

Abra [http://localhost:4200](http://localhost:4200)

---

## 🛠️ Comandos úteis

### Gerar novo componente:

```bash
ng generate component nome-do-componente
```

### Gerar outras estruturas:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Build de produção:

```bash
ng build
```

Os arquivos finais serão gerados na pasta `dist/`.

---

## ✅ Rodar testes

### Testes unitários:

```bash
ng test
```

### Testes end-to-end (e2e):

Primeiro, adicione uma ferramenta como [Cypress](https://www.cypress.io/) ou [Playwright](https://playwright.dev/). Exemplo com Cypress:

```bash
ng add @cypress/schematic
ng e2e
```

---

## ❓ Dúvidas ou problemas?

- Use `ng help` no terminal para ajuda rápida.
- Ou acesse a [documentação oficial do Angular CLI](https://angular.dev/tools/cli).
```

Se quiser, posso adaptar esse README para monorepos, Docker, ou incluir instruções de CI/CD. Quer adicionar algo assim?
