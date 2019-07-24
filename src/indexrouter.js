import React from 'react';
import { Router, Route, Switch, Redirect,withRouter } from 'dva/router';
import dynamic from 'dva/dynamic'
import HomePage from './routes/index/HomePage'
import Page from './routes/index/Page'
import Aboutus from './routes/index/Aboutus'
import Service from './routes/index/Service'
import Cooperate from './routes/index/Cooperate'
import Contact from './routes/index/Contact'

import NotFound from './routes/NotFound'

class IndexRouterConfig extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path="/main" render={() => <Redirect to="/main/index" />} />
        <Route path="/main/index" component={HomePage} />
        <Route path="/main/page" component={Page} />
        <Route path="/main/aboutus" component={Aboutus} />
        <Route path="/main/service" component={Service} />
        <Route path="/main/cooperate" component={Cooperate} />
        <Route path="/main/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    );
  }

}

export default withRouter(IndexRouterConfig)
