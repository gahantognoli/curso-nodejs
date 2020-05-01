class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros', (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                }
            );
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                "SELECT * FROM livros WHERE id = ?",
                [id],
                (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                "INSERT INTO livros (titulo, preco, descricao) values (?, ?, ?)",
                [livro.titulo, livro.preco, livro.descricao],
                (err) => {
                    if (err)
                        reject(err)
                    else
                        resolve();
                });
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                "UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?",
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                "DELETE FROM livros WHERE id = ?",
                [id],
                (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
        });
    }

}

module.exports = LivroDao;