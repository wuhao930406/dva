import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import dynamic from 'dva/dynamic'
import HomePage from './routes/index/HomePage'
import Page from './routes/index/Page'
import NotFound from './routes/NotFound'

function IndexRouterConfig() {

  return (
      <Switch>
        <Route exact path="/main" render={() => <Redirect to="/main/index"/>} />
        <Route path="/main/index" component={HomePage} />
        <Route path="/main/page" component={Page} />
        <Route component={NotFound} />

      </Switch>
  );
}

export default IndexRouterConfig;
