import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import dynamic from 'dva/dynamic'




function RouterConfig({ history,app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage')
  })
  const Login = dynamic({
      app,
      component: () => import('./routes/Login')
  })
 const NotFound = dynamic({
      app,
      component: () => import('./routes/NotFound')
  })
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
        <Route path="/main" component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route render={() => <Redirect to="/main/404"/>} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
