import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header isLoggedIn={this.props.user.id} title="The Voting App" />
        <main className="mdl-layout__content">
          {this.props.children}
          <Footer />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPoll: () => dispatch(addPoll())
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    user: state.user
  };
}

const TheApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default TheApp;
