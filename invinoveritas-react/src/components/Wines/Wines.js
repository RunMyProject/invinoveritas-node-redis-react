import React, { useState, useLayoutEffect } from 'react';
import Wine from '../../components/wine'
import Cookies from 'js-cookie';

const Wines = () => {
  
  function Wines() {

    const [wines, setWines] = useState(0);

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    
    useLayoutEffect(() => {
      if (wines === 0) {
        const response = fetch('http://localhost:4001/invinoveritas/wines', requestOptions)
        .then(response => response.json())
        .then(res => {
            if (res) {
              Cookies.set("DataWines", JSON.stringify(res.wines))
              setWines(res.wines.map(wine => <Wine name={wine.name} desc={wine.desc} img={wine.img} />))
              return res
            }
        })
      }
    }, [wines]);

    return (
      <div onClick={() => setWines(0)}>{wines}</div>
    )  
  }

  return (
  <div className="main-container">
    <section className="team-1">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h1>Meet collection of our wines</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
          </div>
        </div>
        <div className="row"><Wines/></div>
      </div>
    </section>    
    <section className="duplicatable-content pure-text">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h1>Which one fits to you?</h1>
          </div>
        </div>        
        <div className="row">
          <div className="col-sm-4">
            <h6>Nemo enim ipsam voluptatem</h6>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            </p>
          </div>          
          <div className="col-sm-4">
            <h6>Dolorem ipsum quia dolor sit amet</h6>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            </p>
          </div>          
          <div className="col-sm-4">
            <h6>Fugiat quo voluptas nulla pariatur</h6>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            </p>
          </div>
        </div>
      </div>
    </section>    
    <section className="bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="testimonials-slider text-center">
              <ul className="slides">
                <li>
                  <p className="text-white lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                  <span className="author text-white">John Doe</span>
                </li>                
                <li>
                  <p className="text-white lead">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.</p>
                  <span className="author text-white">Jessica Marks</span>
                </li>                
                <li>
                  <p className="text-white lead">Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                  <span className="author text-white">Steven Hanson</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
};

export default Wines;
