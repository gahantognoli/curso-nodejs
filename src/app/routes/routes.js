const livroRoutes = require('./livro-routes');
const baseRoutes = require('./base-routes');

module.exports = (app) => {
    baseRoutes(app);
    livroRoutes(app);
}