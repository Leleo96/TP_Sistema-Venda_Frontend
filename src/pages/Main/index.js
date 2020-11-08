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
            produto:[],           
            pedido:{
                id: '',
                observacoes: '',
                valorTotal: 0,
                ativo: true,
                usuarioID: '',
            },
            itempedido:{
                id: '',
                qtd: 0,
                valor: 0,
                ativo: true,
                produtoID: '',
                pedidoID: '',
            },
            valorTotalProdutos: 0,
            erro: null,
            activeForm: false
        };
      
    }

    componentDidMount() {
        fetch(`http://localhost:3003/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));

        fetch(`http://localhost:3003/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    criarPedido = event => {


        this.setState({ activeForm: true });

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
                        
                        this.setState(prevState => ({
                            pedido: { ...prevState.pedido, id: json.id }
                        }));                    
                        console.log(this.state.pedido);
					}
				});
			} else {
				this.setState({ erro: 'Falha na criação de um novo pedido.' });
			}
		});

        event.preventDefault();
    }

    calcularPreco = (event) => {
        this.state.produto.forEach(element => {            
            if(element.id == this.state.itempedido.produtoID){
                this.setState(prevState => ({
                    itempedido: { ...prevState.itempedido, valor: element.precovenda }
                }));             
                this.setState({valorTotalProdutos: element.precovenda * this.state.itempedido.qtd })
            }
        })   
              
        this.setState(prevState => ({
            itempedido: { ...prevState.itempedido, pedidoID: this.state.pedido.id }
        }));

        
    }

  

    criarItemPedido = (event) =>  {

            console.log(this.state.itempedido)

            fetch("http://localhost:3003/sistema/itempedidos", {
                method: "post",
                body: JSON.stringify(this.state.itempedido),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        if (json != null) {
                            
                            this.setState(prevState => ({
                                itempedido: { ...prevState.itempedido, id: json.id }
                            }));                    
                            console.log(this.state.itempedido);
                        }
                    });
                } else {
                    this.setState({ erro: 'Falha na criação de um novo item dentro do pedido atual.' });
                }
            });

            event.preventDefault();
       
    }
   

    calculaPrecoTotal = (event) =>{        

        this.state.produto.forEach(element => {
            
            if(element.id == this.state.itempedido.produtoID){
                this.setState(prevState => ({
                    itempedido: { ...prevState.itempedido, valor: element.precovenda }
                }));

                this.setState({valorTotalProdutos: element.precovenda * this.state.itempedido.qtd })


                console.log("Valor: ", this.state.itempedido.valor) 
                console.log("QTD: ", this.state.itempedido.qtd) 
                console.log("Valor Total Produtos: ", this.state.valorTotalProdutos) 
            }

        })

    }


    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            pedido: { ...prevState.pedido, [name]: value }
        }));
     };

    handleInputChangeItemPedido = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            itempedido: { ...prevState.itempedido, [name]: value }
        }));
        
    };    


    render() {
        const { usuario } = this.state;
        const { produto } = this.state;


        return (

            <div className="itempedido-list">

                <Navbar>
                    <div className="menucontent">
                        <Link to={`/usuarios`}> <button type="button" class="btn btn-primary">CADASTRAR CLIENTES</button> </Link>
                        <br /><br />
                        <Link className="btnCadastrar" to={`/produtos`}> <button type="button" class="btn btn-info">CADASTRAR PRODUTOS</button> </Link>
                        <br /><br />
                    </div>
                </Navbar>



                <h1>COMANDA</h1>            

                <div className="btnGroup">

                    <select className="custom-select" name="usuarioID" id="selectCliente" onChange={this.handleInputChange}>
                        <option value="" selected disabled>Selecione o cliente</option>                                                        
                        {usuario.map((usuario, index) => (
                            <option value={usuario.id}>{usuario.nome}</option>                                                        
                        ))}
                    </select>    

                    <button type="button" class="btn btn-success" onClick={this.criarPedido}>Abrir</button>                    
                    
                </div>

                <div className={this.state.activeForm ? null : 'invisible'}>
             
                    <h3>Pedido Nº {this.state.pedido.id}</h3>             

                    <div className="btnGroup">
                      
                        <div>  
                            <label>Produto</label>   
                            <select className="pedidoNcontainer custom-select" name="produtoID" id="selectProduto" onChange={this.handleInputChangeItemPedido}>
                                <option value="" selected disabled>Selecione o produto</option>                                                        
                                {produto.map((produto, index) => (
                                    <option value={produto.id}>{produto.nome} - R$ {(produto.precovenda).toFixed(2) }</option>                                                        
                                ))}
                            </select>                          
                        </div>

                        <div>
                            <label>Quantidade<input className='pedidoNcontainer form-control' name="qtd" placeholder="Insira a quantidade" type='number' onChange={this.handleInputChangeItemPedido}/></label>
                        </div>

                        <div>
                            <label>Valor Total<input className='pedidoNcontainer form-control' name="precovenda" placeholder="Insira a quantidade" type='number' value={this.state.valorTotalProdutos} /></label>
                        </div>

                        <button type="button" class="btn btn-primary" onClick={this.calcularPreco}>Calcular Total</button>       

                        <button type="button" class="btn btn-success" onClick={this.criarItemPedido}>Incluir</button>                    
                        
                    </div>                    

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Qtd</th>
                                <th scope="col"></th>
                                <th scope="col"></th>

                            </tr>
                        </thead>

                        <tbody>
                    
                        </tbody>

                    </table>
                </div>
            </div>
            
        )
    }
}
