import React from 'react';
import { Link } from 'react-router';

export default ({isLoggedIn, title, subtitle})=>
  <div>
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title"><Link to="/">{title}</Link></span>
        <span>{subtitle}</span>
        <div className="mdl-layout-spacer"></div>
          {isLoggedIn ? (
            <nav className="mdl-navigation">
              <Link to="/" className="mdl-navigation__link">Logout</Link>
            </nav>
          ) :
            (
          <nav className="mdl-navigation">
            <span>Log in with:</span>
            <a href="/auth/twitter" className="mdl-navigation__link"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
            <a href="/auth/github" className="mdl-navigation__link"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
          </nav>
        )}
      </div>
    </header>
    {/*<div className="mdl-layout__drawer mdl-layout--small-screen-only">
      <span className="mdl-layout-title">Title</span>
      <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>*/}
  </div>;
