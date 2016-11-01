import React from 'react';
import { connect } from 'react-redux';

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
    testClick: () => dispatch(CounterActions("Add"))
  }
}

const mapStateToProps = (state) => {
  return state;
}

const TheApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default TheApp;
