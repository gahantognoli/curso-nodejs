const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./database');
const UsuarioDao = require('../app/infra/usuario-dao');

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const usuarioDao = new UsuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                .then(user => {
                    if (!user || senha != user.senha) {
                        return done(null, false, {
                            message: 'Login ou senha inválidos!'
                        });
                    }
                    return done(null, user);
                })
                .catch(err => done(err, false));
        }));

    passport.serializeUser((user, done) => {
        const userSessao = {
            nome: user.nome_completo,
            email: user.email
        };

        done(null, userSessao);
    });

    passport.deserializeUser((userSessao, done) => {
        done(null, userSessao);
    });

    app.use(sessao({
        secret: 'gabriel_antognoli_key',
        genid: req => uuid(),
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        req.passport = passport;
        next();
    })
}