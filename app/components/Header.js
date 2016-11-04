import { Link } from 'react-router';

export default ({isLoggedIn, title})=>
  <div>
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title"><Link to="/">{title}</Link></span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          {isLoggedIn ? (
            <Link to="/" className="mdl-navigation__link">Logout</Link>
          ) :
            (
          <span>Log In with =>></span>
          <Link to="/" className="mdl-navigation__link"><i className="fa fa-twitter fa-lg" aria-hidden="true"></i></Link>
          <Link to="/" className="mdl-navigation__link"><i className="fa fa-github fa-lg" aria-hidden="true"></i></Link>
        )}
        </nav>
      </div>
    </header>
    {/*<div class="mdl-layout__drawer mdl-layout--small-screen-only">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>*/}
  </div>;
