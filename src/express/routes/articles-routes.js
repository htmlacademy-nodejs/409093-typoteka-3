'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`main/articles-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`admin/new-post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`admin/edit-post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`user/post`));

module.exports = articlesRouter;
