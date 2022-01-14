import React from 'react';
import './index.scss';
import qs from 'query-string';

const query = qs.parse(location.search);
const BodyComp = require('./comps/comp' + query.type).default;

class Demo extends React.Component {
  state = {
    arr: [],
  };
  componentDidMount() {
    const { extra, type } = query;
    if (window.ipcRenderer) {
      const list = JSON.parse(extra);
      setTimeout(() => {
        ipcRenderer.invoke('loadEnd', {});
        for (let i = 0; i < list.length; i++) {
          setTimeout(() => {
            this.setState({ arr: list[i] });
            if (i === list.length - 1) {
              setTimeout(() => {
                ipcRenderer.invoke('captureEnd', {});
              }, 1000);
            }
          }, i * 100);
        }
      }, 500);
    } else {
      const list = JSON.parse(extra);
      this.setState({ arr: list[0] });
    }
  }

  render() {
    return <BodyComp {...query} arr={this.state.arr}></BodyComp>;
  }
}

export default Demo;
