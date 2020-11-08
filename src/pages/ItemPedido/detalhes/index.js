import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class ItemPedido extends Component {
    state = {
        itemPedido: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/itempedidos/${id}`)
            .then(itemPedido =>
                itemPedido.json().then(itemPedido => this.setState({ itemPedido }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { itemPedido, index } = this.state;

        if (itemPedido.ativo) {
            itemPedido.ativo = "Item Pedido Ativo";
        } else {
            itemPedido.ativo = "Item Pedido Inativo";
        }

        return (
            <div>
                <h1>DETALHES DO Item de Pedido</h1>
                <div className="itempedido-info">
                    <h1> {itemPedido.qtd} </h1>
                    <h1> {itemPedido.ativo} </h1>
                    <h1> {itemPedido.valor} </h1>
                    <h1> {itemPedido.produtoId} </h1>
                    <h1> {itemPedido.pedidoId} </h1>
                    <br />
                </div >
                <div className="links">
                    <Link to={`/itempedidos`}> Voltar </Link> <br />
                    <Link to={`/editaritempedido/id${itemPedido.id}`}> Editar </Link> <br />
                    <Link to={`/deletaritempedido/id${itemPedido.id}`}> Deletar </Link> <br />
                </div>
            </div>
        );
    }
}

