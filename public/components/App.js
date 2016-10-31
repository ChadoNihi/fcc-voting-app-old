export default class App extends React.Component {
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
