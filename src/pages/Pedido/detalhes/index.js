import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Pedido extends Component {
    state = {
        pedido: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${id}`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { pedido } = this.state;

        if (pedido.ativo) {
            pedido.ativo = "Pedido Ativo";
        } else {
            pedido.ativo = "Pedido Inativo";
        }

        return (
            <div>
                <h1>DETALHES DO PEDIDO</h1>
                <div className="pedido-info">
                    <h1> {pedido.observacoes} </h1>
                    <h1> {pedido.ativo} </h1>
                    <h1> {pedido.valorTotal} </h1>
                    <h1> {pedido.usuarioId} </h1>

                    <br />
                </div >
                <div className="links">
                    <Link to={`/pedidos`}> Voltar </Link> <br />
                    <Link to={`/editarpedido/id${pedido.id}`}> Editar </Link> <br />
                    <Link to={`/deletarpedido/id${pedido.id}`}> Deletar </Link> <br />
                </div>
            </div>
        );
    }
}

