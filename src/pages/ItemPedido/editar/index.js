import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class EditarItemPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemPedido: {
                qtd: "",
                valor: "",
                produtoId: "",
                pedidoId: ""
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

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/itemPedidos/${id}`)

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/itempedido" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Item Pedido</legend>
                        <div className="itempedido-update">
                            <label htmlFor="qtd">Qtd </label>
                            <br />
                            <input
                                type="integer"
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
                        <div className="itempedido-update">
                            <label htmlFor="valor">valor </label>
                            <br />
                            <input
                                type="double"
                                id="valor"
                                name="valor"
                                placeholder="valor"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.itemPedido.qtd}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="itempedido-update">
                            <label htmlFor="produtoId">Produto Id </label>
                            <br />
                            <input
                                type="integer"
                                id="produtoId"
                                name="produtoId"
                                placeholder="produtoId"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.itemPedido.produtoId}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="itempedido-update">
                            <label htmlFor="pedidoId">Pedido Id </label>
                            <br />
                            <input
                                type="integer"
                                id="pedidoId"
                                name="pedidoId"
                                placeholder="pedidoId"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.itemPedido.pedidoId}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary"> Atualizar </button>
                        <Link to={`/itempedidos`}> <button type="submit" className="btn btn-primary"> Voltar </button> </Link>
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
    };

    handleSubmit = event => {
        const { id } = this.state.itemPedido;

        fetch(`http://localhost:3003/sistema/itemPedidos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.itemPedido),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default EditarItemPedido;
