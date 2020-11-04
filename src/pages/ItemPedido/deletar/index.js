import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class DeletarItemPedido extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemPedido: {},
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

        fetch(`http://localhost:3003/sistema/itempedidos/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ itemPedido: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/itempedido" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar item Pedido</legend>
                    <div className="itempedido-delete">
                        <label htmlFor="id">{this.state.itemPedido.id} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br /><br />
                        < Link to={`/itempedidos`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/itempedidos/${id}`, {
            method: "delete"
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

export default DeletarItemPedido;
