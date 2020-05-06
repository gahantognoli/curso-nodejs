const templates = require('../views/templates');

class BaseControlador {

    constructor(){
        this.rotas = {
            home: '/',
            login: '/login'
        }
    }

    home() {
        return function (req, res) {
            res.marko(
                templates.base.home
            );
        };
    }

    login(){
        return function(req, res) {
            res.marko(
                templates.base.login
            );
        };
    }

    efetuaLogin(){
        return function(req, res, next){
            const passport = req.passport;
            passport.authenticate('local', (err, user, info) => {
                if(info) return res.marko(templates.base.login);
                if(err) return next(err);
                
                req.login(user, err => { 
                    if(err) return next(err);
                    return res.redirect('/livros');
                 })
            })(req, req, next);
        }
    }
}

module.exports = BaseControlador;