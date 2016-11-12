import App from './components/App';
import About from './components/About';
import Poll from './components/Poll';
import Polls from './components/Polls';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Polls} />
    <Route path="poll/:id" component={Poll} />
    <Route path="user/:id" component={UserMain} />
    <Route path="/about" component={About} />
  </Route>
);

export default routes;
