import React from 'react';
import { connect } from 'react-redux';
import {} from '';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header isAuth={false} title="The Voting App" />
        <main class="mdl-layout__content">
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
