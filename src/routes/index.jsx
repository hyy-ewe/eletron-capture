import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import paths from './path';

class Demo extends React.PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          {paths.map((item, idx) => {
            return <Route key={idx} exact {...item} />;
          })}
        </Switch>
      </Router>
    );
  }
}

export default Demo;
