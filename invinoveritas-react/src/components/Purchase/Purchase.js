// Author: Edoardo Sabatini
// @26/10/2020
// ************************ 
//
import React from 'react';
import classLevelStyles from './purchase.css';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

const Purchase = () => {

  let history = useHistory();

  const styleNavy = {color:'navy'};
  const styleBlue = {color:'blue'};
  const styleRed = {color:'red'};
  const styleOrange = {color:'orange'};
  const styleBlack = {color:'black'};

  var myWines  = JSON.parse(Cookies.get("myWines"))
  var user     = JSON.parse(Cookies.get("user"))

  const WinesCart = ({ wines }) =>
    Object.entries(wines).map(([id, wine]) => (
      <p><a href="#">{wine.name}</a> <span className="billing_price">&euro;{wine.q}</span></p>
  ));

  var winesCount  = Object.keys(myWines).length
  var winesTotal  = 0
  var winesSelected = []

  for (var id in myWines) {
    if (myWines.hasOwnProperty(id)) {
        winesTotal += parseInt(myWines[id].q)
        let w = {
          id: id,
          q: myWines[id].q
        }
        winesSelected.push(w)
    }
  }


  function buy() {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: user.uuid,
        winesSelected: winesSelected,
      })
    };
  
    const response = fetch('http://localhost:4001/invinoveritas/buy', requestOptions)
    .then(response => response.json())
    .then(res => {
        if (res) {                    
          Cookies.set("userData", JSON.stringify(res.results[0].userData));
          Cookies.set("myWines", JSON.stringify({}))
          history.push("/thankyou")
          return res
        }
    })
  }

  function Checkout() {    
    return (
      <div className="btn btn-primary" onClick={() => buy()}>Continue to checkout</div>
    )
  }

  return (
    <div className="main-container">
      <section className="pure-text-centered">
        <div className="container">
          <div className="row">
            <div className="text-center">
              <h1><strong>Purchase</strong></h1>
              <p className="lead">
                <section className={classLevelStyles}>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                  <div class="billing_row">
                        <div className="billing_col-75">
                          <div className="billing_container">                              
                              <div className="billing_row">                                
                                <div className="billing_col-50">                                  
                                  <h3>Billing Address</h3>
                                  <label for="fname"><i className="fa fa-user"></i> Full Name</label>
                                  <input type="text" id="fname" name="firstname" placeholder="John M. Doe"/>
                                  <label for="email"><i className="fa fa-envelope"></i> Email</label>
                                  <input type="text" id="email" name="email" value={user.email} disabled />
                                  <label for="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                  <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
                                  <label for="city"><i className="fa fa-institution"></i> City</label>
                                  <input type="text" id="city" name="city" placeholder="New York"/>
                                  <div className="billing_row">
                                    <div className="billing_col-50">
                                      <label for="state">State</label>
                                      <input type="text" id="state" name="state" placeholder="NY"/>
                                    </div>
                                    <div className="billing_col-50">
                                      <label for="zip">Zip</label>
                                      <input type="text" id="zip" name="zip" placeholder="10001"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="billing_col-50">
                                  <h3>Payment</h3>
                                  <label for="fname">Accepted Cards</label>                                  
                                  <div className="billing_icon-container">
                                    <i className="fa fa-cc-visa" style={styleNavy}></i>&nbsp;
                                    <i className="fa fa-cc-amex" style={styleBlue}></i>&nbsp;
                                    <i className="fa fa-cc-mastercard" style={styleRed}></i>&nbsp;
                                    <i className="fa fa-cc-discover" style={styleOrange}></i>&nbsp;
                                  </div>                                  
                                  <label for="cname">Name on Card</label>
                                  <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
                                  <label for="ccnum">Credit card number</label>
                                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
                                  <label for="expmonth">Exp Month</label>
                                  <input type="text" id="expmonth" name="expmonth" placeholder="September"/>
                                  <div className="row">
                                    <div className="col-50">
                                      <label for="expyear">Exp Year</label>
                                      <input type="text" id="expyear" name="expyear" placeholder="2018"/>
                                    </div>
                                    <div className="col-50">
                                      <label for="cvv">CVV</label>
                                      <input type="text" id="cvv" name="cvv" placeholder="352"/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <label>
                                <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as billing
                              </label>
                          </div>
                        </div>
                        <div className="billing_col-25">
                          <div className="billing_container">
                            <h4>Cart
                              <span className="billing_price" style={styleBlack}>
                                <i className="fa fa-shopping-cart"></i>&nbsp;
                                <b>{winesCount}</b>
                              </span>
                            </h4>
                            <div className="billing_hr"/>
                            <p></p>
                            <WinesCart wines={myWines} />
                            <div className="billing_hr"/>
                              <p>Total <span className="billing_price" style={styleBlack}><b>&euro;{winesTotal}</b></span></p>
                          </div>
                        </div>                        
                  </div>
                </section>
                <div className="text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <span><Checkout/></span>
                            <a href="/mywines" className="btn btn-primary btn-text-only" target="default">My Wines</a>
                        </div>
                    </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>      
    </div>
 )};

export default Purchase;
