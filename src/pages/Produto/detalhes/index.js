import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Produto extends Component {
    state = {
        produto: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { produto, index } = this.state;

        if (produto.ativo) {
            produto.ativo = "Produto Ativo";
        } else {
            produto.ativo = "Produto Inativo";
        }

        return (
            <div>
                <h1>DETALHES DO PRODUTO</h1>
                <div className="produto-info">
                    <h1> {produto.nome} </h1>
                    <h1> {produto.ativo} </h1>
                    <h1> {produto.precocusto} </h1>
                    <h1> {produto.precovenda} </h1>
                    <h1> {produto.quantidade} </h1>
                    <br />
                </div >
                <div className="links">
                    <Link to={`/produtos`}> Voltar </Link> <br />
                    <Link to={`/editarproduto/id${produto.id}`}> Editar </Link> <br />
                    <Link to={`/deletarproduto/id${produto.id}`}> Deletar </Link> <br />
                </div>
            </div>
        );
    }
}

