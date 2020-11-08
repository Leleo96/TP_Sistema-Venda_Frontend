import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class CriarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                nome: "",
                endereco: "",
                email: "",
                telefone: "",
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
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <form action="/usuarios" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Novo Cadastro de Cliente</legend>
                        <div className="usuario-insert">
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
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="endereco">Endereço </label>
                            <br />
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                placeholder="Endereço"
                                required
                                value={this.state.usuario.endereco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="email">E-mail </label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                required
                                value={this.state.usuario.email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="telefone">Telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                required
                                value={this.state.usuario.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <radioa>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="False"
                                    checked={this.state.usuario.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </radioa>
                            <radio>
                                <input
                                    type="radio"
                                    value="true"
                                    name="ativo"
                                    checked={this.state.usuario.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </radio>
                        </div>
                        <Link to={`/usuarios`}> <button className="btn btn-primary">Voltar</button></Link>
                        <button type="submit" className="btn btn-success">Cadastrar</button>
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
            usuario: { ...prevState.usuario, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch("${process.env.REACT_APP_API_URL}/sistema/usuarios", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
    };
}

export default CriarUsuario;
