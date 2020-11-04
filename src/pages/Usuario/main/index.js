import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { usuario } = this.state;
        return (
            <div className="usuario-list">
                <h1> Cadastro de Clientes</h1>
                <Link to={`/criarusuario`}> <button type="button" class="btn btn-success">Incluir</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NOME</th>
                            <th scope="col">ENDEREÇO</th>
                            <th scope="col">E-MAIL</th>
                            <th scope="col">TELEFONE</th>
                            <th scope="col">ATIVO</th>
                            <th scope="col"></th>
                            <th scope="col">AÇÕES</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuario, index) => (
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.endereco}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/usuarios/${usuario.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarusuario/${usuario.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarusuario/${usuario.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <footer> <Link to={`/`}> <button type="button" class="btn btn-success">Voltar</button> </Link>
                    <br /><br /></footer>
            </div>

        )
    }
}
