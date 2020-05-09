'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT, () => {
  console.info(chalk.green(`Сервер запущен на: http://localhost:${DEFAULT_PORT}`));
});
