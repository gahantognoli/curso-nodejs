const LivroController = require('../controllers/livro-controller');
const Livro = require('../models/livro');

const livroController = new LivroController();

module.exports = (app) => {
    const RotasLivro = livroController.rotas;

    app.get(RotasLivro.lista, livroController.lista());

    app.route(RotasLivro.cadastro)
        .get(livroController.formularioCadastro())
        .post(Livro.validacoes(), livroController.cadastra())
        .put(livroController.edita())

    app.get(RotasLivro.edicao, livroController.formularioEdicao());

    app.delete(RotasLivro.delecao, livroController.remove());
}