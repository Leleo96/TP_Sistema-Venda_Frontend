import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainUsuario from './pages/Usuario/main';
import DetalhesUsuario from './pages/Usuario/detalhes';
import CriarUsuario from './pages/Usuario/criar';
import EditarUsuario from './pages/Usuario/editar';
import DeletarUsuario from './pages/Usuario/deletar';

import MainProduto from './pages/Produto/main';
import DetalhesProduto from './pages/Produto/detalhes';
import CriarProduto from './pages/Produto/criar';
import EditarProduto from './pages/Produto/editar';
import DeletarProduto from './pages/Produto/deletar';

import MainPedido from './pages/Pedido/main';
import DetalhesPedido from './pages/Pedido/detalhes';
import CriarPedido from './pages/Pedido/criar';
import EditarPedido from './pages/Pedido/editar';
import DeletarPedido from './pages/Pedido/deletar';

import MainItemPedido from './pages/ItemPedido/main';
import DetalhesItemPedido from './pages/ItemPedido/detalhes';
import CriarItemPedido from './pages/ItemPedido/criar';
import EditarItemPedido from './pages/ItemPedido/editar';
import DeletarItemPedido from './pages/ItemPedido/deletar';
import Main from './pages/Main';

const Routes = () => (

    <BrowserRouter>
        <Switch>

            <Route exact path="/" component={Main} />

            <Route exact path="/usuarios" component={MainUsuario} />
            <Route path="/usuarios/:id" component={DetalhesUsuario} />
            <Route path="/criarusuario" component={CriarUsuario} />
            <Route path="/editarusuario/:id" component={EditarUsuario} />
            <Route path="/deletarusuario/:id" component={DeletarUsuario} />

            <Route exact path="/produtos" component={MainProduto} />
            <Route path="/produtos/:id" component={DetalhesProduto} />
            <Route path="/criarproduto" component={CriarProduto} />
            <Route path="/editarproduto/:id" component={EditarProduto} />
            <Route path="/deletarproduto/:id" component={DeletarProduto} />

            <Route exact path="/pedidos" component={MainPedido} />
            <Route path="/pedidos/:id" component={DetalhesPedido} />
            <Route path="/criarpedido" component={CriarPedido} />
            <Route path="/editarpedido/:id" component={EditarPedido} />
            <Route path="/deletarpedido/:id" component={DeletarPedido} />

            <Route exact path="/itempedidos" component={MainItemPedido} />
            <Route path="/itempedidos/:id" component={DetalhesItemPedido} />
            <Route path="/criaritempedido" component={CriarItemPedido} />
            <Route path="/editaritempedido/:id" component={EditarItemPedido} />
            <Route path="/deletaritempedido/:id" component={DeletarItemPedido} />

        </Switch>
    </BrowserRouter>
)

export default Routes;

