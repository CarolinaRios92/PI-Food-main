# Individual Project - Henry Food

## Objetivos del Proyecto

Crear una Aplicación web donde se pueda encontrar diferentes tipos de recetas de cocina 🥗 , utilizando una API externa (https://spoonacular.com/food-api). Y a parti de ella, poder entre otras cosas:

✔️ Buscar recetas

✔️ Filtrar por tipos de Dietas / Ordenarlas por puntaje y orden alfabético, de manera ascendente ⬆️ y descendente ⬇️

✔️ Crear nuevas recetas propias

✔️ Modificar y eliminar recetas propias

## <p align="center">Tecnologias utilizadas 💻</p>

<div align="center" style="padding-bottom: 2em">
  <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer" style="padding-right: 1em"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
  <a href="https://expressjs.com" target="_blank" rel="noreferrer" style="padding-right: 1em"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer" style="padding-right: 1em"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer" style="padding-right: 1em"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
  <a href="https://www.postgresql.org" target="_blank" rel="noreferrer" style="padding-right: 1em"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer" style="padding-right: 1em"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
</div>

# Requisitos para ejecitarla localmente ⚙️

1. Instalar PostgreSQL
2. Crear una base de datos con el nombre "recipes"
3. Dentro de `api` cree un archivo `.env` con sus credenciales, como se muestra a continuación:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
API_KEY=yourApiKey
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

# Instalación ⚙️

Utilice el administrador de paquetes npm para instalar. (Recuerde usar este comando dentro de /client y dentro de /api)

```env
npm install
```

# Ejecutar local ⚙️

- FrontEnd: Dentro `./client`

```env
npm start
```

- BackEnd: Dentro `./api`

```env
npm start
```

# Espero lo disfruten... 😃
