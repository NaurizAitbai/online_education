import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';


const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/'>
            Index
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;