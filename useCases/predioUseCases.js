const { pool } = require('../config')
const Predio = require('../entities/predio')

const getPrediosDB = async () => {
    try {
        const { rows } = await
         pool.query('SELECT * FROM predios ORDER BY codigo');
        return rows.map((predio) => new Predio(predio.codigo, predio.nome,
             predio.descricao, predio.sigla));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addPredioDB = async (body) => {
    try {
        const {nome, descricao, sigla} = body;
        const result = await pool.query(`INSERT INTO predios (nome, descicao, sigla)
                                        values ($1, $2, $3)
                                        RETURNING codigo, nome, descicao, sigla`,
                                        [nome, descricao, sigla]);
        const predio = results.rows[0];
        return new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla);

    } catch(err) {
        throw "Erro ao inserir o prédio: " + err;
    }
}
const updatePredioDB = async (body) => {
    try {
        const {nome, descricao, sigla, codigo} = body;
        const result = await pool.query(`UPDATE predios SET nome=$1, descricao=$2, sigla=$3
                                        WHERE codigo=$4
                                        RETURNING codigo, nome, descicao, sigla`,
                                        [nome, descricao, sigla, codigo]);

        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado...`;
        }

        const predio = results.rows[0];
        return new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla);

    } catch(err) {
        throw "Erro ao inserir o prédio: " + err;
    }
}

const deletePredioDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM predios WHERE codigo=$1`, [codigo]);

        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido...`;

        } else {
            return `Prédio de código: ${codigo} removido com sucesso!`;
        }

    } catch(err) {
        throw "Erro ao remover prédio: " + err;
    }
}

const getPredioPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM predios WHERE codigo=$1`, [codigo]);

        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido...`;

        } else {
            const predio = results.rows[0];
            return new Predio(predio.nome, predio.descricao, predio.sigla);
        }

    } catch(err) {
        throw "Erro ao remover prédio: " + err;
    }
}




module.exports = { getPrediosDB, addPredioDB, updatePredioDB, deletePredioDB, getPredioPorCodigoDB }