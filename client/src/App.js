import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles'
import ScreenSource from './ScreenSource'
import ScreenArticlesBySource from './ScreenArticlesBySource'

import articles from './article.reducer'
import token from './token.reducer'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
const store = createStore(combineReducers({ articles, token }));
function App() {
  return (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/screen-home" component={ScreenHome} />
        <Route exact path="/screen-my-article" component={ScreenMyArticles} />
        <Route exact path="/screen-source" component={ScreenSource} />
        <Route exact path="/screen-article-by-source/:source" component={ScreenArticlesBySource} />
      </Switch>
    </Router>
  </Provider >
  );
}

export default App;
