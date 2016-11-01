import { Link } from 'react-router';

export default ({isAuth, title})=>
  <div>
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title"><Link to="/">{title}</Link></span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <Link to="/" className="mdl-navigation__link">Log In</Link>
          <Link to="/" className="mdl-navigation__link">Sign Up</Link>
        </nav>
      </div>
    </header>
    <!-- small-screen-only -->
    <div class="mdl-layout__drawer mdl-layout--small-screen-only">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
  </div>;