import React from 'react';
import { connect } from 'react-redux';

import {fetchPolls, fetchUser} from '../actions';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    if (!this.props.polls) {
      fetchPolls();
    }
    fetchUser();
  }

  render() {
    let ch;
    try {
      ch = React.Children.only(this.props.children);
    } catch (e) {
      ch = undefined;
    }
    //if (!this.props.user) {
      fetchUser(); // TODO: find another way
    //}
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--no-drawer-button">
        <Header isLoggedIn={!!this.props.user} title="The Voting App" subtitle={(ch && ch.type == "UserMain" ? "Your polls" : undefined)} />
        <main className="mdl-layout__content">
          {this.props.children}
          <Footer />
        </main>
      </div>
    );
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    addPoll: () => dispatch(addPoll())
  }
}*/

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    user: state.user
  };
}

const TheApp = connect(
    mapStateToProps
)(App);

export default TheApp;
