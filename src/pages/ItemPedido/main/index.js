import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemPedido: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/itempedidos`)
            .then(itemPedido =>
                itemPedido.json().then(itemPedido => this.setState({ itemPedido }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { itemPedido } = this.state;
        return (
            <div className="itempedido-list">
                <h1> Cadastro de Itens do Pedido</h1>
                <Link to={`/criaritempedido`}> <button type="button" class="btn btn-success">Incluir</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">QTD</th>
                            <th scope="col">VALOR</th>
                            <th scope="col">ATIVO</th>
                            <th scope="col">PRODUTO ID</th>
                            <th scope="col">PEDIDO ID</th>
                            <th scope="col"></th>
                            <th scope="col">AÇÕES</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {itemPedido.map((itemPedido, index) => (
                            <tr>
                                <th scope="row">{itemPedido.id}</th>
                                <td>{itemPedido.qtd}</td>
                                <td>{itemPedido.valor}</td>
                                <td>{itemPedido.produtoId}</td>
                                <td>{itemPedido.pedidoId}</td>
                                <td>{itemPedido.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/itempedido/${itemPedido.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editaritempedido/${itemPedido.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletaritempedido/${itemPedido.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
