import { Router } from "express";
import FornecedorCtrl from "../controle/fornecedorCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const fornCtrl = new FornecedorCtrl();
const rotaFornecedor = new Router();

rotaFornecedor.get('/',fornCtrl.consultar)
rotaFornecedor.get('/:termo', fornCtrl.consultar)
rotaFornecedor.post('/',fornCtrl.gravar)
rotaFornecedor.patch('/',fornCtrl.atualizar)
rotaFornecedor.put('/',fornCtrl.atualizar)
rotaFornecedor.delete('/',fornCtrl.excluir);

export default rotaFornecedor;