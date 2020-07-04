import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import CourseListPage from './pages/CourseListPage';


const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/courses'>
            <CourseListPage />
          </Route>
          <Route path='/'>
            <div>INDEX 1</div>
            <div>INDEX 2</div>
            <div>INDEX 3</div>
            <div>INDEX 4</div>
            <div>INDEX 5</div>
            <div>INDEX 6</div>
            <div>INDEX 7</div>
            <div>INDEX 8</div>
            <div>INDEX 9</div>
            <div>INDEX 10</div>
            <div>INDEX 11</div>
            <div>INDEX 12</div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;