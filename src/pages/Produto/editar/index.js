import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class EditarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {
                nome: "",
                precocusto: "",
                precovenda: "",
                quantidade: ""
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

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Produto</legend>
                        <div className="produto-update">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="precocusto">Preço Custo </label>
                            <br />
                            <input
                                type="double"
                                id="precocusto"
                                name="precocusto"
                                placeholder="precocusto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.precocusto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="precovenda">Preço Venda </label>
                            <br />
                            <input
                                type="double"
                                id="precovenda"
                                name="precovenda"
                                placeholder="precovenda"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.precovenda}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-update">
                            <label htmlFor="quantidade">Quantidade </label>
                            <br />
                            <input
                                type="integer"
                                id="quantidade"
                                name="quantidade"
                                placeholder="quantidade"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.quantidade}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary"> Atualizar </button>
                        <Link to={`/produtos`}> <button type="submit" className="btn btn-primary"> Voltar </button> </Link>
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
            produto: { ...prevState.produto, [name]: value }
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.produto;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
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

export default EditarProduto;
