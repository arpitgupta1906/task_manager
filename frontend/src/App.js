import React from 'react';
import './App.css';
import Layout from './containers/Layout';
import BaseRouter from './routes';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Layout >

        <BaseRouter />
      </Layout>

    </Router>
    </div>
  );
}

export default App;
