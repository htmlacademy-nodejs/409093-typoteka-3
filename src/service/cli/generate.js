'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  PUBLICATION_PERIOD,
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_COUNT,
  EXIT_CODE,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH
} = require(`../constants`);

const getDate = () => {
  const currentDate = new Date();
  const earliestDate = currentDate - PUBLICATION_PERIOD;
  const publicationDate = new Date(getRandomInt(earliestDate, currentDate));
  return `${publicationDate.getFullYear()}-${publicationDate.getMonth()}-${publicationDate.getDate()} ${publicationDate.getHours()}:${publicationDate.getMinutes()}:${publicationDate.getSeconds()}`;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateArticles = (count, titles, categories, sentences) => (
  Array(count).fill().map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, sentences.length - 1).join(` `),
    createdDate: getDate(),
    category: [categories[getRandomInt(0, categories.length - 1)]]
  }))
);

const run = async (args) => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (countArticles > MAX_COUNT) {
    console.error(chalk.green(`Не больше 1000 публикаций`));
    process.exitCode = EXIT_CODE.success;
  } else if (titles.length && sentences.length && categories.length) {
    const content = JSON.stringify(generateArticles(countArticles, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exitCode = EXIT_CODE.success;
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exitCode = EXIT_CODE.error;
    }
  } else {
    console.error(chalk.red(`Can't read file...`));
    process.exitCode = EXIT_CODE.error;
  }
};

module.exports = {
  name: `--generate`,
  run
};
