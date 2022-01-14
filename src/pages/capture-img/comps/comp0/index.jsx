import React from 'react';
import './index.scss';
import qs from 'query-string';
import { tempArr, bgArr } from '../../../home/constants';

class Demo extends React.Component {

  render() {
    const { arr, type } = this.props;
    return (
      <div className={'body' + type}>
        <div className="canvas">
          <img src={bgArr[type]}></img>
          <div className="title">{arr[0]}</div>
          <div className="bang_dang">
            <span>{arr[1]}</span>
          </div>
          <div className="number">{arr[2]}</div>
          <div className="name">{arr[3]}</div>
          <div className="group">{arr[4]}</div>
        </div>
      </div>
    );
  }
}

export default Demo;
