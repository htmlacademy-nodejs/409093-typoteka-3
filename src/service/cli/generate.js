'use strict';

const fs = require(`fs`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  TITLES,
  ANNOUNCES,
  CATEGORIES
} = require(`./mockData`);
const {
  PUBLICATION_PERIOD,
  DEFAULT_COUNT,
  FILE_NAME,
  EXIT_CODE
} = require(`../../constants`);

const getDate = () => {
  const currentDate = new Date();
  const earliestDate = currentDate - PUBLICATION_PERIOD;
  const publicationDate = new Date(getRandomInt(earliestDate, currentDate));
  return `${publicationDate.getFullYear()}-${publicationDate.getMonth()}-${publicationDate.getDate()} ${publicationDate.getHours()}:${publicationDate.getMinutes()}:${publicationDate.getSeconds()}`;
};

const generateArticles = (count) => (
  Array(count).fill().map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(ANNOUNCES).slice(1, 5).join(` `),
    fullText: shuffle(ANNOUNCES).slice(1, ANNOUNCES.length - 1).join(` `),
    createdDate: getDate(),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]]
  }))
);

const run = (args) => {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
  const content = JSON.stringify(generateArticles(countArticles));

  try {
    fs.writeFileSync(FILE_NAME, content);
    console.info(`Operation success. File created.`);
    process.exitCode = EXIT_CODE.success;
  } catch (err) {
    console.error(`Can't write data to file...`);
    process.exitCode = EXIT_CODE.error;
  }
};

module.exports = {
  name: `--generate`,
  run
};
