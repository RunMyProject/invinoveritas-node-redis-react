import React from 'react';
import { withRouter } from 'react-router';
import Cookies from 'js-cookie';

class WineSelectedQuantity extends React.Component {

  constructor(props) {
    super();
    this.state = {value: '1'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit = () => {
    var myWines = JSON.parse(Cookies.get("myWines"))
    myWines[this.props.id] ={name: this.props.name, img: this.props.img, q: this.state.value}
    Cookies.set("myWines", JSON.stringify(myWines));
    this.props.history.push('/mywines')
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>
            <span>SELECT QUANTITY:&nbsp;&nbsp;</span>
            <select
              value={this.state.value}
              onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
          </label>
          </div>
          <div><br/><br/><br/><br/></div>
          <div>
            <input type="submit" value="ADD TO CART" />
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(WineSelectedQuantity);
