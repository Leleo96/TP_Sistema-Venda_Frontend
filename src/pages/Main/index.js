import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import ItemPedido from '../../components/itemPedido';


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

    fecharPedido = event => {

        fetch(`http://localhost:3003/sistema/pedidos/${this.state.pedido.id}`, {
            method: "put",
            body: JSON.stringify(this.state.pedido),
            headers: {
                "Content-Type": "application/json"
            }
        })	

        window.location.reload(false);


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

            console.log("Valor Item: ",this.state.itempedido.valor)
            console.log("Qtd Item: ",this.state.itempedido.qtd)

            this.calculaPrecoTotal(this.state.itempedido.valor * this.state.itempedido.qtd)

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
                            ReactDOM.render(<ItemPedido key={json.id} pedidoID={this.state.pedido.id}/>, document.getElementById('lista_compras'));                        
                        }
                    });
                } else {
                    this.setState({ erro: 'Falha na criação de um novo item dentro do pedido atual.' });
                }
            });

            event.preventDefault();
       
    }
   

    calculaPrecoTotal = (valorItem) =>{       

        const soma = this.state.pedido.valorTotal + valorItem;
        console.log(valorItem)
        console.log(soma)

        this.setState(prevState => ({
            pedido: { ...prevState.pedido, valorTotal: soma}
        }));   

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
                    <button type="button" class="btn btn-danger" onClick={this.fecharPedido}>Fechar</button>                
                    
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
                       
                        <h4>Valor Total - R$ {Math.round(this.state.pedido.valorTotal).toFixed(2)}</h4>      
                        <div name="lista_compras" id="lista_compras">
                            <h1>Lista de Compras</h1>
                                

                        </div>                       
                  
                </div>
            </div>
            
        )
    }
}
