<h1 align="center">Feedbacker</h1>

![image](https://user-images.githubusercontent.com/101362563/217108629-401ba01e-2340-442a-adb2-cd725aa9acf9.png)

### Techs utilizadas

- SASS/SCSS
- JavaScript
- VueJS
- Vite
- Vitest (pausado)
- Cypress (pausado)
- Vercel (deploy backend)
- Netlify (deploy frontend)

### Instalação

Para rodar o projeto em um servidor local, é necessário que você tenha familiaridade com o [NodeJS](https://nodejs.org/en/) e o tenha instalado em sua máquina.

Clone o projeto em um diretório de sua escolha com o seguinte comando no terminal de sua preferência (indico Linux).

```
git clone git@github.com:anybuss/feedbacker.git
```

Após finalizado, entre na pasta do projeto

```
cd feedbacker
```

e abra o editor de código de sua preferência (indico VSCode).

Até o momento, você vai se deparar com dois diretórios no projeto: `backend` e `dashboard`.

#### Subindo o servidor local BACKEND

No backend, você encontra todo o código relacionado a criação da API e suas configurações. Esse diretório foi disponibilizado pelo Igor Halfeld para ser posssível a criação de todo o front-end conectado a uma API.

Abra novamente o terminal (ctrl+J no VSCode) e entre no diretório backend com o comando:

```
cd backend
```

Siga o passo a passo do arquivo `README.md` dentro dele.

Seguindo esse passo a passo e não tendo problemas na instalação, você terá o backend do projeto rodando no http://localhost:3000/

#### Subindo o servidor local FRONTEND

Com o backend rodando, abra uma nova janela no terminal e entre no diretório

```
cd dashboard
```

Instale as dependências do projeto com o comando:

```
npm install
```

e, em seguida:

```
npm run dev
```

Seguindo esse passo a passo e não tendo problemas na instalação, você terá o frontend do projeto rodando no http://localhost:5173/

### Créditos

Projeto base por [Treinamento - VueJS Brasil](https://treinamento.vuejsbrasil.org/), desenvolvido por Any Buss 🖤

[Voltar ao topo ⬆](#feedbacker)
