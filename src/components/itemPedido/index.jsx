import React, { Component } from 'react';
import 'styles.css';

export default class itemPedido extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itempedido: {
				id: '',
				qtd: 0,
				valor: 0,
				ativo: true,
				produtoID: '',
				pedidoID: ''
			},
			erro: null
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;

		fetch(`http://localhost:3003/sistema/produtos/${id}`)
			.then((produto) => produto.json().then((produto) => this.setState({ produto })))
			.catch((erro) => this.setState({ erro }));
	}

	render() {
		const produto = this.state;

		const { id, qtd, valor, ativo, produtoID, pedidoID } = this.props.match.params;

		return (
			<div>
				<h6>{id}</h6>
				<h6>{produto.nome}</h6>
				<h6>{qtd}</h6>
				<h6>{valor}</h6>

				<h6>{id}</h6>
			</div>
		);
	}
}
