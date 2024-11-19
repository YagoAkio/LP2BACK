import Fornecedor from '../modelo/fornecedor.js';
import conectar from './conexao.js';

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor (
                    cnpj VARCHAR(20) NOT NULL UNIQUE,
                    nome VARCHAR(200) NOT NULL,
                    email VARCHAR(200) NOT NULL,
                    telefone VARCHAR(20),
                    endereco VARCHAR(70),
                    bairro VARCHAR(50),
                    cidade VARCHAR(50),
                    uf VARCHAR(2) NOT NULL,
                    cep VARCHAR(30) NOT NULL,
                    CONSTRAINT pk_fornecedor PRIMARY KEY(cnpj)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor (cnpj,nome,email,telefone, endereco, bairro,cidade,uf,cep)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

                
            `;
            const parametros = [
                fornecedor.cnpj,
                fornecedor.nome,
                fornecedor.email,
                fornecedor.telefone,
                fornecedor.endereco,
                fornecedor.bairro,
                fornecedor.cidade,
                fornecedor.uf,
                fornecedor.cep
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async atualizar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor 
                SET nome = ?, email = ?, telefone = ?,endereco = ?, bairro = ?,cidade = ?, uf = ?, cep = ?
                WHERE cnpj = ?
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.email,
                fornecedor.telefone,
                fornecedor.endereco,
                fornecedor.bairro,
                fornecedor.cidade,
                fornecedor.uf,
                fornecedor.cep,
                fornecedor.cnpj
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE cnpj = ?`;
            const parametros = [fornecedor.cnpj];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = '';
        let parametros = [];

        if (termo.includes('@')) {
            // Busca por email
            sql = `SELECT * FROM fornecedor WHERE email LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else if (!isNaN(parseInt(termo))) {
            // Busca por CPF
            sql = `SELECT * FROM fornecedor WHERE cnpj = ?`;
            parametros = [termo];
        } else {
            // Busca por nome
            sql = `SELECT * FROM fornecedor WHERE nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        const listaFornecedores = linhas.map(linha => new Fornecedor(
            linha['cnpj'],
            linha['nome'],
            linha['email'],
            linha['telefone'],
            linha['endereco'],
            linha['bairro'],
            linha['cidade'],
            linha['uf'],
            linha['cep']
        ));

        await conexao.release();
        return listaFornecedores;
    }
}
