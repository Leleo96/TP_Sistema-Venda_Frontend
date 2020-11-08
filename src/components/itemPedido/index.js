import React, { Component } from 'react';
import './styles.css';

export default class itemPedido extends Component {
	constructor(props) {
        super(props);

        this.state = {
			produto: [],
            itemPedido: [],
            erro: null
        };
	}
	
	componentDidMount() {
		//const { pedidoID } = this.props.match.params;
		fetch(`${process.env.REACT_APP_API_URL}/sistema/itempedidos/${this.props.pedidoID}`)
            .then(itemPedido =>
                itemPedido.json().then(itemPedido => this.setState({ itemPedido }))
            )
			.catch(erro => this.setState({ erro }));
			
		fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
			.catch(erro => this.setState({ erro }));
			


		console.log(this.state.itemPedido);
		this.state.itemPedido.map((itemPedido, index) => (
			
			this.state.produto.forEach(element => {            

				console.log(element.id)
				console.log(itemPedido.produtoId)
				if(element.id == itemPedido.produtoID){
					console.log(element.nome)

					this.setState(prevState => ({
						itemPedido: { ...prevState.itemPedido, produtoID: element.nome }
					}));  
				}
			})	
		

		))
		
	}

	render() {

		const { itemPedido } = this.state;
        return (
            <div className="itempedido-list">
                <h1> Lista de Itens do Pedido</h1>

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">QTD</th>
                            <th scope="col">VALOR</th>
                            <th scope="col">PRODUTO ID</th>
  
                        </tr>
                    </thead>
                    <tbody>
                        {itemPedido.map((itemPedido, index) => (
                            <tr key={itemPedido.produtoId}>
                                <th scope="row">{itemPedido.id}</th>
                                <td>{itemPedido.qtd}</td>
                                <td>{itemPedido.valor}</td>

								<td>
								{itemPedido.produtoID}
								
								</td>                              
                                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
		);
	}

	verificaProduto(produtoId){

		{this.state.produto.forEach(element => {            

			console.log(element.id)
			console.log(produtoId)
			if(element.id == produtoId){
				console.log(element.nome)
				return(element.nome);
			}
		})}

	}


	/*
	deletarItem = event =>{
		
		const id = this.state.itemPedido.id;
		
		fetch(`${process.env.REACT_APP_API_URL}/sistema/itempedidos/${id}`, {
			method: "delete"
		})
		
	};
	*/

}



