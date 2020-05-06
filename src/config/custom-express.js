require('marko/node-require').install();
require('marko/express');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express();
const templates = require('../app/views/templates');

//Middlewares
app.use('/estatico', express.static('src/app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

const routes = require('../app/routes/routes');
routes(app);

//Tratamento de erros
app.use(function(req, res, next){
    return res.status(404).marko(
        templates.base.erro404
    );
});

app.use(function(erro, req, res, next){
    return res.status(500).marko(
        templates.base.erro500
    );
});

module.exports = app;