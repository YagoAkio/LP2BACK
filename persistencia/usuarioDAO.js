import conectar from "./Conexao.js";
import Usuario from "../modelo/usuario.js";

export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    email VARCHAR(255) NOT NULL,
                    senha VARCHAR(255) NOT NULL,
                    prio INT NOT NULL,
                    CONSTRAINT pk_usuario PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela usuario!", erro);
        }
    }

    async gravar(usuario) {
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `INSERT INTO usuario (email, senha, prio) VALUES (?, ?, ?)`;
            const parametros = [usuario.email, usuario.senha, usuario.prio];
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(usuario) {
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `UPDATE usuario SET email = ?, senha = ?, prio = ? WHERE codigo = ?`;
            const valores = [usuario.email, usuario.senha, usuario.prio, usuario.codigo];
            await conexao.execute(sql, valores);
            await conexao.release();
        }
    }

    async excluir(usuario) {
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE codigo = ?`;
            await conexao.execute(sql, [usuario.codigo]);
            await conexao.release();
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if(isNaN(parseInt(termo))){
            sql = `SELECT * FROM usuario WHERE email LIKE ? ORDER BY email`;
            parametros.push("%"+termo+"%");
        }else{
            sql = `SELECT * FROM usuario WHERE codigo = ? ORDER BY codigo`
            parametros.push(termo);
        }
        const conexao = await conectar();

        const [registros,campos] = await conexao.query(sql,parametros);
        let listaUsuario = [];
        for(const registro of registros){
            const usuario = new Usuario(
                registro.codigo,
                registro.email,
                registro.senha,
                registro.prio
            );
            listaUsuario.push(usuario);
        }
        await conexao.release();
        return listaUsuario;
    }
}