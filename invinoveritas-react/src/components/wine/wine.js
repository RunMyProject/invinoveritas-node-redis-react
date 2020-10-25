import React from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class Wine extends React.Component {

  storeValue(key, value) {
		if (localStorage) {
			localStorage.setItem(key, value);
		} else {
			Cookies.set(key, value);
		}
	}

	render() {
    const p = this.props;
    this.storeValue('refreshMode', 'f');
  	return (
      <div className="col-md-2 col-sm-4">
            <div className="team-1-member">
              <Link 
                  to={Cookies.get("user")!=null ? `/wine/${p.name}` : `/login`}>
                    <img alt="Team Member" className="background-image" src={require('../../static/img/' + p.img)} />
                </Link>
                <h5>{p.name}</h5>
                <span>{p.desc}</span><br/>
            </div>
      </div>
    )
  }
}

export default Wine;
