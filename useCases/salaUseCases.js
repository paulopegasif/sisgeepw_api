const { pool } = require('../config')
const Sala = require('../entities/sala')

const getSalasDB = async () => {
    try {
        const { rows } = await
         pool.query('SELECT * FROM salas ORDER BY codigo');
        return rows.map((sala) => new Sala(sala.codigo, sala.numero,
             sala.descricao, sala.capacidade));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addSalaDB = async (body) => {
    try {
        const {codigo, numero, descricao, capacidade, predio} = body;
        const result = await pool.query(`INSERT INTO salas (codigo, numero, descricao, capacidade, predio)
                                        values ($1, $2, $3, $4, $5)
                                        RETURNING codigo, numero, descricao, capacidade, predio`,
                                        [codigo, numero, descricao, capacidade, predio]);
        const sala = results.rows[0];
        return new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade, sala.predio);

    } catch(err) {
        throw "Erro ao inserir o sala: " + err;
    }
}
const updateSalaDB = async (body) => {
    try {
        const {codigo, numero, descricao, capacidade, predio} = body;
        const result = await pool.query(`UPDATE salas SET numero=$1, descricao=$2, capacidade=$3, predio=$4
                                        WHERE codigo=$5
                                        RETURNING codigo, numero, descricao, capacidade, predio`,
                                        [codigo, numero, descricao, capacidade, predio]);

        if(results.rowCount == 0){
            throw `Nenhuma sala encontrado com o código ${codigo} para ser alterada...`;
        }

        const sala = results.rows[0];
        return new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade, sala.predio);

    } catch(err) {
        throw "Erro ao atualizar sala: " + err;
    }
}

const deleteSalaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM salas WHERE codigo=$1`, [codigo]);

        if (results.rowCount == 0){
            throw `Nenhuma sala encontrado com o código ${codigo} para ser removida...`;

        } else {
            return `Sala de código: ${codigo} removido com sucesso!`;
        }

    } catch(err) {
        throw "Erro ao remover sala: " + err;
    }
}

const getSalaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM salas WHERE codigo=$1`, [codigo]);

        if (results.rowCount == 0){
            throw `Nenhuma sala encontrado com o código ${codigo} para ser removida...`;

        } else {
            const sala = results.rows[0];
            return new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade, sala.predio);
        }

    } catch(err) {
        throw "Erro ao buscar sala por código: " + err;
    }
}




module.exports = { getSalasDB, addSalaDB, updateSalaDB, deleteSalaDB, getSalaPorCodigoDB }