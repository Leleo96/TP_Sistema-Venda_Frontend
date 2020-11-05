import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';


export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: [],   
            usuarioAtivo:{
                id: ''
            }, 
            itempedido: [],
            pedido:{
                id: ''
            },
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

    criarPedido = event => {

        fetch("http://localhost:3003/sistema/pedidos", {
            method: "post",
            body: JSON.stringify(this.state.pedido),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					if (json != null) {
                        this.setState.pedido.id = json.id;
                        console.log(this.state.pedido.id);
					}
				});
			} else {
				this.setState({ erro: 'Falha na criação de um novo pedido.' });
			}
		});

        event.preventDefault();
    }


  


    render() {
        const { usuario } = this.state;
        const { itempedido } = this.state;
        return (

            <div className="itempedido-list">

                <Navbar>
                    <div className="menucontent">
                        <Link to={`/usuarios`}> <button type="button" class="btn btn-primary">CADASTRAR CLIENTES</button> </Link>
                        <br /><br />
                        <Link to={`/produtos`}> <button type="button" class="btn btn-info">CADASTRAR PRODUTOS</button> </Link>
                        <br /><br />
                        </div>
                </Navbar>



                <h1> COMANDA</h1>            

                <div className="btnGroup">

                    <select className="custom-select" name="selectCliente" id="selectCliente" onChange={e => this.setState.usuarioAtivo.id = e.target.value}>
                        <option value="" selected disabled>Selecione o cliente</option>                                                        
                        {usuario.map((usuario, index) => (
                            <option value="{usuario.id}">{usuario.nome}</option>                                                        
                        ))}
                    </select>    

                    <button type="button" class="btn btn-success">Abrir Comanda</button>                    
                    
                </div>


                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Qtd</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Id Produto</th>
                            <th scope="col">Id Pedido</th>
                            <th scope="col">Ativo</th>
                            <th scope="col"></th>
                            <th scope="col">AÇÕES</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>

                    <tbody>
                        {itempedido.map((itempedido, index) => (
                            <tr>
                                <th scope="row">{itempedido.id}</th>
                                <td>{itempedido.qtd}</td>
                                <td>{itempedido.valor}</td>
                                <td>{itempedido.produtoId}</td>
                                <td>{itempedido.pedidoId}</td>
                                <td>{itempedido.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/itempedidos/${itempedido.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editaritempedido/${itempedido.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletaritempedido/${itempedido.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        )
    }
}
