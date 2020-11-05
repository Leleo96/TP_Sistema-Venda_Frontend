import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedido: [],
            erro: null
        };
    }


    componentDidMount() {
        fetch(`http://localhost:3003/sistema/pedidos`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { pedido } = this.state;
        return (
            <div className="pedido-list">
                <h1> Cadastro de Pedido</h1>
                <Link to={`/criarpedido`}> <button type="button" class="btn btn-success">Incluir</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Observações</th>
                            <th scope="col">Valor Total</th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Id Usuario</th>
                            <th scope="col">Ativo</th>
                            <th scope="col"></th>
                            <th scope="col">AÇÕES</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>

                    <tbody>
                        {pedido.map((pedido, index) => (
                            <tr>
                                <th scope="row">{pedido.id}</th>
                                <td>{pedido.observacoes}</td>
                                <td>{pedido.valorTotal}</td>
                                <td>{pedido.usuarioId}</td>

                                <td>{pedido.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/pedidos/${pedido.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarpedido/${pedido.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarpedido/${pedido.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <td> <Link to={`/`}> <button type="button" class="btn btn-primaty">Voltar</button> </Link></td>
            </div>
        )
    }
}
