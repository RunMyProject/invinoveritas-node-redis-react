// Author: Edoardo Sabatini
// @26/10/2020
// ************************ 
//
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Cookies from 'js-cookie';
import Login from '../../containers/Login';
import Wines from '../Wines';
import WineSelected from '../WineSelected';
import Purchase from '../Purchase';
import MyWines from '../MyWines';
import Checkout from '../Checkout';
import Thankyou from "../Thankyou";
import MyPayments from "../MyPayments";

var logoPicture = require ('../../static/img/logotype_dark.png');

const Home = () => (  
<>
  <Router>
    <div className="nav-container">
			<nav className="centered-logo top-bar">
				<div className="container">													
					<div className="row">
						<div className="col-sm-12 text-center">
                <Link to="/">
                    <img className="logo logo-dark" alt="Logo" src={logoPicture} />
                </Link>
						</div>
					</div>								
					<div className="row nav-menu">					
						<div className="col-sm-12 columns text-center">
            <Switch>
              <Route component={MyHeader} />
            </Switch>
						</div>
					</div>					
					<div className="mobile-toggle">
						<i className="icon icon_menu"></i>
					</div>					
				</div>
				<div className="bottom-border"></div>
			</nav>
		</div>
    <div className="main-container">       
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/login/:logout" component={Login}/>
          <Route path="/wines" component={Wines} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/wine/:id" component={WineSelected} />
          <Route path="/purchase" component={Purchase} />
          <Route path="/mywines"  component={MyWines} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/thankyou" component={Thankyou} />          
          <Route path="/mypayments" component={MyPayments} />
      </Switch>
    </div>
    <div className="footer-container">
    <footer className="short bg-secondary-1">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <ul className="social-icons">
              <li>
                <a href="#">
                  <i className="icon social_twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon social_facebook"></i>
                </a>
              </li>
            </ul>
            <br/>
            <br/>
            <br/>
            <span>
              <font color="a87f97">© Copright 2020 <q>In vino veritas</q>.&nbsp;React.js Web App Designed by&nbsp;
                  <a href="https://github.com/RunMyProject">
                    <font color="ffffff">RunMyProject</font>
                  </a>
              </font>
            .</span>
          </div>
        </div>
      </div>
    </footer>
    </div>
  </Router>
  </>  
);

/*
const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement);
*/
const MyHeader = () => {
  return(
    <ul className="menu">
      <li>
          <Link to="/">Home</Link>
      </li>
      {Cookies.get("user")==null && (
          <li><Link to="/login">Login</Link></li>
        )}
      {Cookies.get("user")!=null && (
          <li><Link to="/login">Logout</Link></li>
        )}
      {Cookies.get("user")!=null && (
          <li><Link to="/mywines">My Wines</Link></li>
        )}
      <li>
          <Link to="/wines">Our wines</Link>
      </li>
      {Cookies.get("user")==null && (
        <li><Link to="/signup">Sign up for tasting</Link></li>
      )}
      <li>
          <Link to="/about">About us</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  )
}

const WinesCart = ({ wines }) =>
  Object.entries(wines).map(([id, wine]) => (
      <div className="col-md-6 no-pad-left">              
        <div className="feature feature-icon-left">
          <div className="icon-holder">
            <img className="background-image" alt="Background Image" 
            src={require('../../static/img/' + wine.img)} />
          </div>
          <div className="feature-text">
            <h6>{wine.name}</h6>
            <p>{wine.q}</p>
          </div>
        </div>
      </div>
));

const HomePage = () => {
  
  var user = JSON.parse(Cookies.get("user")!=null ? Cookies.get("user") : "{}")
  return(
    <header className="fullscreen-element no-pad centered-text">
      <div className="background-image-holder parallax-background overlay">
        <img className="background-image" alt="Background Image" src={require('../../static/img/main_image.jpg')} />
      </div>
      <div className="container align-vertical">
        <div className='row'><br/><br/><br/><br/></div>
        <div className="row">
          <div className="col-md-7 col-sm-8">
            <h1 className="text-white">{Cookies.get("user")!=null ? 'Welcome ' + user.email + "!" : <q>Nunc est bibendum!</q>}</h1>
            <p className="lead text-white">
              Oscar, the owner of the <q>In vino veritas</q> wine shop, welcomes you to this Website! 
              This Progressive Web Application (PWA) written in React.js allows Customers to book, 
              through API written in Node.js, the bottles of wine from own catalog registered 
              with Redis In-Memory Database (IMDB).
            </p>
            {Cookies.get("user")!=null && (
            <a href="/wines" className="btn btn-primary btn-filled inner-link" target="_self">See our wines</a>
            )}
          </div>
        </div>
      </div>
  </header>
  )
}

const Signup = () => (
  <header className="fullscreen-element no-pad centered-text">
    <div className="background-image-holder parallax-background overlay">
      <img className="background-image" alt="Background Image" src={require('../../static/img/main_image.jpg')} />
    </div>
    <div className="container align-vertical">
    <div className='row'><br/><br/><br/><br/></div>
      <div className="row">
          <div className="col-md-7 col-sm-8">
            <h1 className="text-white">Signup up for tasting</h1>
            <p className="lead text-white">
              TO DO...
            </p>
            <a href="/signup" className="btn btn-primary btn-filled inner-link" target="_self">Register now!</a>
          </div>
      </div>
    </div>
</header>
);

const About = () => (
  <header className="fullscreen-element no-pad centered-text">
    <div className="background-image-holder parallax-background overlay">
      <img className="background-image" alt="Background Image" src={require('../../static/img/main_image.jpg')} />
    </div>
    <div className="container align-vertical">
    <div className='row'><br/><br/><br/><br/></div>
      <div className="row">
          <div className="col-md-7 col-sm-8">
            <h1 className="text-white">About us</h1>
            <p className="lead text-white">
              TO DO...
            </p>
            <a href="/signup" className="btn btn-primary btn-filled inner-link" target="_self">Register now!</a>
          </div>
      </div>
    </div>
</header>
);

const Contact = () => (
  <header className="fullscreen-element no-pad centered-text">
    <div className="background-image-holder parallax-background overlay">
      <img className="background-image" alt="Background Image" src={require('../../static/img/main_image.jpg')} />
    </div>
    <div className="container align-vertical">
    <div className='row'><br/><br/><br/><br/></div>
      <div className="row">
          <div className="col-md-7 col-sm-8">
            <h1 className="text-white">Contact</h1>
            <p className="lead text-white">
              TO DO...
            </p>
            <a href="/signup" className="btn btn-primary btn-filled inner-link" target="_self">Register now!</a>
          </div>
      </div>
    </div>
</header>
);

export default Home;
