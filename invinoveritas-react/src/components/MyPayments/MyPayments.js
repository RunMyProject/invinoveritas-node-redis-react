// Author: Edoardo Sabatini
// @26/10/2020
// ************************ 
//
import React from "react";
import Cookies from 'js-cookie';
import classLevelStyles from './mypayments.css';

const MyPayments = () => {

  var userData  = JSON.parse(Cookies.get("userData"))

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  var dataWines =  JSON.parse(Cookies.get("DataWines"))

  const WinesCart = ({ wines }) =>
    Object.entries(wines).map(([id, wine]) => {
      return dataWines[wine.id] != null ?
      <p>
        <a href="#">{dataWines[wine.id].name}</a><span>&nbsp;&nbsp;&nbsp;Quantity: {wine.q} </span><span className="billing_price">&euro;{wine.q*10}</span>
      </p>
      :
      <div></div>
  })

  const HistoricalWinesCart = ({ historicalWines }) =>
  Object.entries(historicalWines).map(([key, hw]) => {
      return hw.winesSelected.length > 0 ?
      <p>
        Order Date: {hw.orderTime} - <b>({hw.winesSelected.length})</b>
        <div className="billing_hr"/>
        <WinesCart wines={hw.winesSelected}></WinesCart>
        <div className="billing_hr"/>
      </p>
      :
      <div></div>
  })

  var winesTotal  = 0
  var myWines = userData.wines

  for (var orderTime in myWines) {
    if (myWines.hasOwnProperty(orderTime)) {
        var winesSelected = myWines[orderTime].winesSelected;
        for (var id in winesSelected) {
          winesTotal += parseInt(winesSelected[id].q) * 10
        }
    }
  }

  return (
  <div className="main-container">
  <section className="pure-text-centered">
    <div className="container">
      <div className="row">
        <div className="text-center">
          <h1><strong>My Payments</strong></h1>
          <p className="lead">
                <div className="row">
                    <div className="col-md-12">
                        <a href="/mywines" className="btn btn-primary" target="default">Export Data</a>
                    </div>
                </div>          
          <section className={classLevelStyles}>
              <div class="billing_row">              
                    <div className="billing_col-25">
                      <div className="billing_container">
                        <p>
                          <HistoricalWinesCart historicalWines={myWines}></HistoricalWinesCart>
                        </p>
                        <div className="billing_hr"/>
                        <p>Total <span className="billing_price"><b>&euro;{winesTotal}</b></span></p>
                      </div>
                    </div>
              </div>
            </section>
            <div className="text-center">
                <div className="row">
                    <div className="col-md-12">
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

export default MyPayments;
