// Author: Edoardo Sabatini
// @25/10/2020
// ************************ 
//
import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

var mainPicture = require ('../static/img/main_image.jpg');

export default function Login(props) {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function redirectToHome() {
    console.log("REDIRECT")
    Cookies.remove("myWines")
    Cookies.remove("user");
    Cookies.remove("userData");
    history.push("/")
  }

  if(props.match.params.logout) redirectToHome();

  async function handleSubmit(event) {

    event.preventDefault();
    try {
	    // await Auth.signIn(email, password);
        // alert("Logged in: " + email + " " + password);
        let user = {
          "user": 
              { 
                "email" : email,
                "password": password				
              }
        }
        let userStr = JSON.stringify(user)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: userStr
        };

        const requestOptions2 = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };

        const response2 = await fetch('http://localhost:4001/invinoveritas/wines', requestOptions2)
        const json2 = await response2.json()
        .then(res2 => {
            if (res2) {
              Cookies.set("DataWines", JSON.stringify(res2.wines))
            }
        })

        const response = await fetch('http://localhost:4001/invinoveritas/login', requestOptions)
        
        if(response.error) history.push("/login")

        const json = await response.json()
        .then(res => {
            // login successful if there's a user in the response
            if (res) {
              Cookies.set("myWines", JSON.stringify({}))
              Cookies.set("user", JSON.stringify(res.results[0].user));
              Cookies.set("userData", JSON.stringify(res.results[1].userData));
              history.push("/");
            } else {
                history.push("/login")
            }
        })

    } catch (e) {
    	  alert(e.message);
    }
  }

  if(Cookies.get("user")!=null) 
    return(
      <header className="fullscreen-element no-pad centered-text">
        <div className="background-image-holder parallax-background overlay">
          <img className="background-image" alt="Background Image" src={mainPicture} />
        </div>
        <div className="container align-vertical">
          <div className="row">
            <div className="Login col-md-7 col-sm-8">
              <h1 className="text-white">Logout</h1>
              <p className="lead text-white">
                Are you sure?
              </p>
              <a href="/login/logout" className="btn btn-primary btn-filled inner-link" target="_self">Logout</a>
            </div>
          </div>
        </div>
      </header>
    )
   else return (
    <header className="fullscreen-element no-pad centered-text">
      <div className="background-image-holder parallax-background overlay">
        <img className="background-image" alt="Background Image" src={mainPicture} />
      </div>
      <div className="container align-vertical">
        <div className="row">
          <div className="Login col-md-7 col-sm-8">
            <h1 className="text-white">Login</h1>
            <form onSubmit={handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <Button block bsSize="large" disabled={!validateForm()} type="submit"
                      className={!validateForm() ? 'btn btn-primary btn btn-white' : 'btn btn-success btn btn-white'}>
                Come in!
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}