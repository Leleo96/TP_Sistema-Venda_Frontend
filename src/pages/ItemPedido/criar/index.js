import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class CriarItemPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemPedido: {
                qtd: "",
                valor: "",
                produtoId: "",
                pedidoId: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/itempedidos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Novo Cadastro de Item</legend>
                        <div className="itempedido-insert">
                            <label htmlFor="qtd">Qtd </label>
                            <br />
                            <input
                                type="Integer"
                                id="qtd"
                                name="qtd"
                                placeholder="qtd"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.itemPedido.qtd}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="itempedido-insert">
                            <label htmlFor="valor">Valor </label>
                            <br />
                            <input
                                type="Double"
                                id="valor"
                                name="valor"
                                placeholder="valor"
                                required
                                value={this.state.itemPedido.valor}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="itempedido-insert">
                            <label htmlFor="produtoId">Produto Id </label>
                            <br />
                            <input
                                type="produtoId"
                                id="produtoId"
                                name="produtoId"
                                placeholder="produtoId"
                                required
                                value={this.state.itemPedido.produtoId}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="itempedido-insert">
                            <label htmlFor="pedidoId">Pedido Id</label>
                            <br />
                            <input
                                type="Integer"
                                id="pedidoId"
                                name="pedidoId"
                                placeholder="pedidoId"
                                required
                                value={this.state.itemPedido.pedidoId}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="itemPedido-insert">
                            <radioa>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.itemPedido.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </radioa>
                            <radio>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.itemPedido.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </radio>
                        </div>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <Link to={`/itempedidos`}> <button type="submit" className="btn btn-primary">Voltar</button> </Link>
                    </fieldset>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            itemPedido: { ...prevState.itemPedido, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/itempedidos", {
            method: "post",
            body: JSON.stringify(this.state.itemPedido),
            headers: {
                "Content-Type": "application/json"
            }
        })

        event.preventDefault();
    };
}

export default CriarItemPedido;
