// Author: Edoardo Sabatini
// @26/10/2020
// ************************ 
//
import React from 'react';
import Home from "./components/Home";
import { Component } from 'react';

class App extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "./static/js/scripts.js";
   // document.head.appendChild(script);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Home />
        </header>
      </div>
    );
  }
}

export default App;
