const { check } = require('express-validator/check');

class Livro {
    static validacoes(){
        return [
            check('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter no mínimo 5 caracteres.'),
            check('preco').isCurrency().withMessage('O preço precisa ter uma valor monetário válido.')
        ];
    }
}

module.exports = Livro;