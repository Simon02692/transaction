
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <TransactionList />
          </Route>
          <Route path="/addnew">
            <AddTransaction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
