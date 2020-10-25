import React from 'react';
import WineSelectedFooter from '../WineSelectedFooter';
import Cookies from 'js-cookie';
import WineSelectedQuantity from '../WineSelectedQuantity';

class WineSelected extends React.Component {

	state = {
		id: '0',
		name: "Loading....",
		img: null,
		desc: null
	}

	storeValue(key, value) {
		if (localStorage) {
			localStorage.setItem(key, value);
		} else {
			Cookies.set(key, value);
		}
	}
	
	getStoredValue(key) {
		if (localStorage) {
			return localStorage.getItem(key);
		} else {
			return Cookies.get(key);
		}
	}

	refreshPage() {
		let isRefresh = this.getStoredValue('refreshMode')
		if(isRefresh==null || isRefresh=='f') {
			this.storeValue('refreshMode', 't');
			window.location.reload();
		}
	}
	
	renderWineImg = () => {
		if (this.state.img!=null) {
			return <img alt="Team Member" className="background-image" src={require('../../static/img/' + this.state.img)} />
		}
	}
	
	componentDidMount() {

		let isRefresh = this.getStoredValue('refreshMode')
		if(isRefresh=='t') {

			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
			
			const response = fetch('http://localhost:4001/invinoveritas/wine/'+this.props.match.params.id, requestOptions)
			.then(response => response.json())
			.then(res => {
				if (res) {
					this.setState({
						id: res.wine.id, 
						name: res.wine.name, 
						img: res.wine.img,
						desc: res.wine.desc
					})
					return res;
				}
			})
		} else {
			this.refreshPage();
		} 
	}

	render() {
		return (
		<div>
			<section className="product-right wood-divider">
				<div className="background-image-holder">
					<img className="background-image" alt="Background Image" src={require('../../static/img/process_image.jpg')} />
				</div>
				<div className="container align-vertical">
					<div className="row">
						<div className="col-md-3">
							<h1 className="text-white">{this.state.name}</h1>
							{this.renderWineImg()}
							<p className="text-white lead">{this.state.desc}</p>
						</div>
						<div className="col-md-3">
							<WineSelectedQuantity id={this.state.id} name={this.state.name} img={this.state.img} />
						</div>
					</div>					
				</div>								
			</section>
			<WineSelectedFooter />
		</div>
		);
	}
}

export default WineSelected;