import React from "react";
import Cookies from 'js-cookie';

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

const MyWines = () => {
  
  var myWines  = JSON.parse(Cookies.get("myWines"))
  var user     = JSON.parse(Cookies.get("user"))
//  var userData = JSON.parse(Cookies.get("userData"))
  var winesCount  = Object.keys(myWines).length

  return(<div>
      <div className="pure-text-centered">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 text-center">
                <h1><strong>My Wines</strong></h1>
                <div className="feature feature-icon-left">
                  <div className="icon-holder">
                    <i className="icon icon-wine"></i>
                  </div>
                  <div className="feature-text">
                    <p className="lead">logged as {user.email}</p>
                  </div>
                </div>
                <div className="feature feature-icon-left">
                  {winesCount > 0 && (
                    <a href="/purchase" className="btn btn-primary" target="default">Purchase ({winesCount})</a>
                  )}
                  <a href="/mypayments" className="btn btn-primary" target="default">My Payments</a>
                </div>
              </div>            
            </div>
          </div>
      </div>       
      <section className="side-image clearfix">
          <div className="image-container col-md-5 col-sm-4 pull-left">
            <div className="background-image-holder">
					    <img className="background-image" alt="Background Image" src={require('../../static/img/side_1.jpg')} />
            </div>
          </div>      
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-6 col-sm-7 col-sm-offset-5 content clearfix">
                <h1>Added to Cart</h1>
                <p className="lead">Below is your wine list that you have selected.</p>
                <div className="row">
                  <WinesCart wines={myWines} />
                </div>
              </div>
            </div>
          </div>
      </section>
      <section className="text-banner">
            <div className="container text-center">                
              <div className="row">
                <div className="col-md-12">
                </div>
              </div>
            </div>
      </section>

  </div>)
};

export default MyWines;
