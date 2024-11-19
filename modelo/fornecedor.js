import FornecedorDAO from "../persistencia/fornecedorDAO.js";
//não esqueça do .js no final da importação

export default class Fornecedor {
    //definição dos atributos privados
        #cnpj;
        #nome;
        #email;
        #telefone;
        #endereco;
        #bairro;
        #cidade;
        #uf;
        #cep;

    constructor(cnpj='',nome='',email='',telefone='',endereco='',bairro='',cidade='',uf='',cep=''){
        this.#cnpj=cnpj;
        this.#nome=nome;
        this.#email=email;
        this.#telefone=telefone;
        this.#endereco=endereco;
        this.#bairro=bairro;
        this.#cidade=cidade;
        this.#uf=uf;
        this.#cep=cep;
    }

    //métodos de acesso públicos

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get email()
    {
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get telefone()
    {
        return this.#telefone;
    }

    set telefone(novoTelefone)
    {
        this.#telefone = novoTelefone;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get uf() {
        return this.#uf;
    }

    set uf(novaUf) {
        this.#uf = novaUf;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }
    //override do método toJSON
    toJSON() {
        return {
            cnpj: this.#cnpj,
            nome: this.#nome,
            email: this.#email,
            telefone: this.#telefone,
            endereco: this.#endereco,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf,
            cep: this.#cep
        };
    }

    //camada de modelo acessa a camada de persistencia
    async gravar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.gravar(this);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async atualizar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.atualizar(this);
    }

    async consultar(parametro) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(parametro);
    }
}