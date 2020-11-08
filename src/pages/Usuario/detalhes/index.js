import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Usuario extends Component {
    state = {
        usuario: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { usuario, index } = this.state;

        if (usuario.ativo) {
            usuario.ativo = "Usuário Ativo";
        } else {
            usuario.ativo = "Usuário Inativo";
        }

        return (
            <div>
                <h1>DETALHES DO CLIENTE</h1>
                <div className="usuario-info">
                    <h1> {usuario.nome} </h1>
                    <h1> {usuario.ativo} </h1>
                    <h1> {usuario.endereco} </h1>
                    <h1> {usuario.email} </h1>
                    <h1> {usuario.telefone} </h1>
                    <br />
                </div >
                <div className="links">
                    <Link to={`/usuarios`} className="btn btn-success"> Voltar </Link>
                    <Link to={`/editarusuario/id${usuario.id}`} className="btn btn-warning"> Editar </Link>
                    <Link to={`/deletarusuario/id${usuario.id}`} className="btn btn-danger"> Deletar </Link>
                </div>
            </div>
        );
    }
}

