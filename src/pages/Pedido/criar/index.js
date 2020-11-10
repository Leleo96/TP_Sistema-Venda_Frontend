import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class CriarPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedido: {

                observacoes: "",
                valorTotal: "",
                usuarioId: "",
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
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Novo Cadastro de Pedidos</legend>
                        <div className="pedido-insert">
                            <label htmlFor="valorTotal">Valor Total </label>
                            <br />
                            <input
                                type="double"
                                id="valorTotal"
                                name="valorTotal"
                                placeholder=""
                                required
                                value={this.state.pedido.valorTotal}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert">
                            <label htmlFor="usuarioId">Usuário Id </label>
                            <br />
                            <input
                                type="integer"
                                id="usuarioId"
                                name="usuarioId"
                                placeholder=""
                                required
                                value={this.state.pedido.usuarioId}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert">
                            <label htmlFor="nome">Observações </label>
                            <br />
                            <input
                                type="text"
                                id="observacoes"
                                name="observacoes"
                                placeholder=""
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedido.observacoes}
                                onChange={this.handleInputChange}
                            />
                        </div>
                            <div className="pedido-insert checkbox-isactive">
                                <radioa>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="true"
                                        checked={this.state.pedido.ativo === "true"}
                                        onChange={this.handleInputChange}
                                    />
                                    Ativo
                            </radioa>
                                <radio>
                                    <input
                                        type="radio"
                                        value="false"
                                        name="ativo"
                                        checked={this.state.pedido.ativo === "false"}
                                        onChange={this.handleInputChange}
                                    />
                                    Inativo
                            </radio>
                            </div>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <Link to={`/pedidos`}> <button type="submit" className="btn btn-primary">Voltar</button> </Link>
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
            pedido: { ...prevState.pedido, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos`, {
            method: "post",
            body: JSON.stringify(this.state.pedido),
            headers: {
                "Content-Type": "application/json"
            }
        })

        event.preventDefault();
    };
}

export default CriarPedido;
