const BaseController = require('../controllers/base-controller');

const baseController = new BaseController();

module.exports = (app) => {
    app.get(baseController.rotas.home, baseController.home());

    app.route(baseController.rotas.login)
        .get(baseController.login())
        .post(baseController.efetuaLogin());
}