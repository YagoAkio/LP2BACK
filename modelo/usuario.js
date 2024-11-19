import UsuarioDAO from "../persistencia/usuarioDAO.js";

export default class Usuario {
    #codigo;
    #email;
    #senha;
    #prio;

    constructor(codigo = 0, email = "", senha = "", prio = 0) {
        this.#codigo = codigo;
        this.#email = email;
        this.#senha = senha;
        this.#prio = prio;
    }

    // Métodos get
    get codigo() {
        return this.#codigo;
    }

    get email(){
        return this.#email;
    }

    get senha() {
        return this.#senha;
    }

    get prio() {
        return this.#prio;
    }

    // Métodos set
    set codigo(codigo) {
        this.#codigo = codigo;
    }

    set email(email){
        this.#email = email;
    }

    set senha(senha) {
        this.#senha = senha;
    }

    

    set prio(prio) {
        this.#prio = prio;
    }

    // Método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            email: this.email,
            senha: this.#senha,
            prio: this.#prio
        };
    }

    async gravar(){
        //instanciar a camada de persistencia do produto
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.gravar(this); //this referência a si mesmo
    }

    async consultar(termo){
        const usuarioDAO = new UsuarioDAO();
        return await usuarioDAO.consultar(termo);
    }

    async excluir(){
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.excluir(this);
    }

    async editar(){
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.editar(this);
    }
}