import { Router } from "express";
import ClienteCtrl from "../controle/clienteCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const cliCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente.get('/',cliCtrl.consultar)
rotaCliente.get('/:termo', cliCtrl.consultar)
rotaCliente.post('/',cliCtrl.gravar)
rotaCliente.patch('/',cliCtrl.atualizar)
rotaCliente.put('/',cliCtrl.atualizar)
rotaCliente.delete('/:cpf',cliCtrl.excluir);

export default rotaCliente;