import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class EditarPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedido: {
                observacoes: "",
                valorTotal: "",
                usuarioId: "",

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

        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${id}`)

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Pedido</legend>
                        <div className="pedido-update">
                            <label htmlFor="nome">Observações </label>
                            <br />
                            <input
                                type="text"
                                id="observacoes"
                                name="observacoes"
                                placeholder="observacoes"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedido.observacoes}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-update">
                            <label htmlFor="valorTotal">Valor Total </label>
                            <br />
                            <input
                                type="double"
                                id="valortotal"
                                name="valortotal"
                                placeholder="valortotal"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedido.valortotal}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-update">
                            <label htmlFor="usuarioId"> Usuario Id </label>
                            <br />
                            <input
                                type="integer"
                                id="usuarioId"
                                name="usuarioId"
                                placeholder="usuarioId"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedido.usuarioId}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary"> Atualizar </button>
                        <Link to={`/pedidos`}> <button type="submit" className="btn btn-primary"> Voltar </button> </Link>
                    </fieldset>
                </form>
            );
        }
    }



    handleInputChange = event => {
        const target = event.target;
        const observacoes = target.observacoes;
        const value = target.value;

        this.setState(prevState => ({
            pedido: { ...prevState.pedido, [observacoes]: value }
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.pedido;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.pedido),
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

export default EditarPedido;
