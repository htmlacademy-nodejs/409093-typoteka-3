'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const NOT_FOUND_MESSAGE_TEXT = `Not found`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const app = express();
app.use(express.json());

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        res.json([]);
      }
    });
    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(NOT_FOUND_MESSAGE_TEXT));

    app.listen(port, () => {
      console.info(chalk.green(`Сервер запущен на: http://localhost:${port}`));
    });
  }
};
