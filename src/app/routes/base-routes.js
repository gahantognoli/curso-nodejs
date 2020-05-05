const BaseController = require('../controllers/base-controller');

const baseController = new BaseController();

module.exports = (app) => {
    app.get('/', baseController.home());
}