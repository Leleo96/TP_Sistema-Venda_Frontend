import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class CriarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {
                nome: "",
                precocusto: "",
                precovenda: "",
                quantidade: "",
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
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Novo Cadastro de Produtos</legend>
                        <div className="produto-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="precocusto">Preço Custo </label>
                            <br />
                            <input
                                type="double"
                                id="precocusto"
                                name="precocusto"
                                placeholder="precocusto"
                                required
                                value={this.state.produto.precocusto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="precovenda">Preço Venda </label>
                            <br />
                            <input
                                type="double"
                                id="precovenda"
                                name="precovenda"
                                placeholder="precovenda"
                                required
                                value={this.state.produto.precovenda}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-insert">
                            <label htmlFor="quantidade">Quantidade </label>
                            <br />
                            <input
                                type="integer"
                                id="quantidade"
                                name="quantidade"
                                placeholder="quantidade"
                                required
                                value={this.state.produto.quantidade}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-insert">
                            <radioa>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.produto.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </radioa>
                            <radio>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.produto.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </radio>
                        </div>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <Link to={`/produtos`}> <button type="submit" className="btn btn-primary">Voltar</button> </Link>
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
        console.log(value);
    };

    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/produtos", {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const history = useHistory();

        history.push("/produtos");

        event.preventDefault();
    };
}

export default CriarProduto;
