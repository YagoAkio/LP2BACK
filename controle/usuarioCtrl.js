import Usuario from "../modelo/usuario.js";

export default class UsuarioCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;
            const prio = requisicao.body.prio;
            if(email && senha && prio){
                const usuario = new Usuario(0, email, senha, prio);

                usuario.gravar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Usuario gravado com sucesso",
                        usuario: usuario.codigo
                    });
                })
            }
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'PATCH' || requisicao.method ==='PUT' && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;
            const prio = requisicao.body.prio;
            if(codigo && email && senha && prio){
                const usuario = new Usuario(codigo, email, senha, prio);

                usuario.editar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Usuario gravado com sucesso",
                        usuario: usuario.codigo
                    });
                })
            }
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            if (codigo) {
                const usuario = new Usuario(codigo);
                
                usuario.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Usuário excluído com sucesso!"
                    });
                });
            } ;
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            let codigo = requisicao.params.codigo;
            if(!codigo){
                codigo = "";
            }
            const usuario = new Usuario();
            usuario.consultar(codigo).then((resultado) => {
                resposta.status(200).json(resultado);
            })
        }
    }
}
