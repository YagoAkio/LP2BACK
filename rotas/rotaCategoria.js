import { Router } from "express";
import CategoriaCtrl from "../controle/categoriaCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const catCtrl = new CategoriaCtrl();
const rotaCategoria = new Router();

rotaCategoria.get('/',catCtrl.consultar)
rotaCategoria.get('/:termo', catCtrl.consultar)
rotaCategoria.post('/',catCtrl.gravar)
rotaCategoria.patch('/',catCtrl.atualizar)
rotaCategoria.put('/',catCtrl.atualizar)
rotaCategoria.delete('/',catCtrl.excluir);

export default rotaCategoria;