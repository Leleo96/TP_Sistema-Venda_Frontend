import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';


export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itempedido: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/itempedidos`)
            .then(itempedido =>
                itempedido.json().then(itempedido => this.setState({ itempedido }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { itempedido } = this.state;
        return (

            <div className="itempedido-list">

                <Navbar>
                    <Link to={`/usuarios`}> <button type="button" class="btn-cadastro">CADASTRAR CLIENTES</button> </Link>
                    <br /><br />
                    <Link to={`/produtos`}> <button type="button" class="btn-cadastro">CADASTRAR PRODUTOS</button> </Link>
                    <br /><br />
                </Navbar>



                <h1> COMANDA</h1>
                <div class="menucontent">
                    <Link to={`/criarpedido`}> <button type="button" class="btn btn-success">Abrir Comanda</button> </Link>
                    <br /><br />

                    <Link to={`/criaritempedido`}> <button type="button" class="btn btn-success">Incluir Item</button> </Link>
                    <br /><br />
                </div>

                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        CLIENTES <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="/usuarios">Pesquisar</a></li>
                        <li><a href="/criarusuario">Cadastrar</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="/usuarios">Excluir</a></li>
                    </ul>

                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        PRODUTOS <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="#">Pesquisar</a></li>
                        <li><a href="#">Cadastrar</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Excluir</a></li>
                    </ul>
                </div>


                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Qtd</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Id Produto</th>
                            <th scope="col">Id Pedido</th>
                            <th scope="col">Ativo</th>
                            <th scope="col"></th>
                            <th scope="col">AÇÕES</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>

                    <tbody>
                        {itempedido.map((itempedido, index) => (
                            <tr>
                                <th scope="row">{itempedido.id}</th>
                                <td>{itempedido.qtd}</td>
                                <td>{itempedido.valor}</td>
                                <td>{itempedido.produtoId}</td>
                                <td>{itempedido.pedidoId}</td>
                                <td>{itempedido.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/itempedidos/${itempedido.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editaritempedido/${itempedido.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletaritempedido/${itempedido.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        )
    }
}
