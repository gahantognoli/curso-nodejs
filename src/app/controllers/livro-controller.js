const { validationResult } = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const templates = require('../views/templates');

class LivroController {

    constructor(){
        this.rotas = {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id',
            autenticadas: '/livros*'
        };
    }

    lista() {
        return (req, res) => {
            const livroDao = new LivroDao(db)
            livroDao.lista()
                .then(livros => {
                    res.marko(templates.livros.lista, { livros })
                })
                .catch(err => console.log(err));
        }
    }

    formularioCadastro() {
        return (req, res) => {
            res.marko(templates.livros.form, { livro: {} });
        }
    }

    formularioEdicao() {
        return (req, res) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro => res.marko(templates.livros.form, { livro }))
                .catch(err => console.log(err));
        }
    }

    cadastra() {
        return (req, res) => {
            const livro = req.body;
            const livroDao = new LivroDao(db);
            console.log(livro);
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.status(400).marko(
                    templates.livros.form,
                    { livro, errosValidacao: erros.array() }
                );
            }

            livroDao.adiciona(livro)
                .then(res.redirect(this.rotas.lista))
                .catch(err => console.log(err));
        }
    }

    edita() {
        return (req, res) => {
            const livroDao = new LivroDao(db);
            livroDao.atualiza(req.body)
                .then(res.redirect(this.rotas.lista))
                .catch(err => console.log(err));
        }
    }

    remove() {
        return (req, res) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => res.status(200).end())
                .catch(err => console.log(err));
        }
    }
}

module.exports = LivroController;