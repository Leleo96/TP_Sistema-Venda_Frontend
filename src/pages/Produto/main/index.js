import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: [],
            erro: null
        };
    }


    componentDidMount() {
        fetch(`http://localhost:3003/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { produto } = this.state;
        return (
            <div className="produto-list">
                <h1> Cadastro de Produto</h1>
                <Link to={`/criarproduto`}> <button type="button" class="btn btn-success">Incluir</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço de Custo</th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Ativo</th>
                            <th scope="col"></th>
                            <th scope="col">AÇÕES</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>

                    <tbody>
                        {produto.map((produto, index) => (
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.precocusto}</td>
                                <td>{produto.precovenda}</td>
                                <td>{produto.quantidade}</td>
                                <td>{produto.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/produtos/${produto.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarproduto/${produto.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarproduto/${produto.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
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
