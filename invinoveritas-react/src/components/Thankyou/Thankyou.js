// Author: Edoardo Sabatini
// @26/10/2020
// ************************ 
//
import React from "react";

const Thankyou = () => {

  return (
    <div className="main-container">
      <section className="pure-text-centered">
        <div className="container">
          <div className="row">
            <div className="text-center">
              <h1><strong>Payment Confirmed!</strong></h1>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="row">
              <div className="col-md-12">
                  <a href="/mypayments"  className="btn btn-primary" target="default">My Payments</a>
              </div>
          </div>
        </div>
      </section>      
    </div>
 )};

export default Thankyou;
