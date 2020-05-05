const templates = require('../views/templates');

class BaseControlador {

    home() {
        return function (req, resp) {
            resp.marko(
                templates.base.home
            );
        };
    }
}

module.exports = BaseControlador;