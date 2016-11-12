import React from 'react';

export default ()=>
  <footer className="mdl-mini-footer" style={({padding: "0.5em 1em"})}>
    <div className="mdl-mini-footer--left-section">
      <ul className="mdl-mini-footer--link-list">
        <li>Built by eFish (aka Chado Nihi)</li>
      </ul>
    </div>
    <div className="mdl-mini-footer--right-section">
      <ul className="mdl-mini-footer--link-list">
        <li>Find me on:</li>
        <li><a target='_blank' href="https://twitter.com/ChadoNihi"><i className="fa fa-twitter fa-lg" aria-hidden="true"></i></a></li>
        <li><a target='_blank' href="https://www.facebook.com/chado.nihi"><i className="fa fa-facebook fa-lg" aria-hidden="true"></i></a></li>
        <li><a target='_blank' href="https://github.com/ChadoNihi"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a></li>
        <li><a target='_blank' href="https://fi.linkedin.com/in/chadon"><i className="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></li>
      </ul>
    </div>
  </footer>;
