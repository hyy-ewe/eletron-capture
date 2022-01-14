import React from 'react';
import './index.scss';
import qs from 'query-string';
import { tempArr, bgArr } from '../../../home/constants';
import leftImg from './left.svg';
import rightImg from './right.svg';

class Demo extends React.Component {
  render() {
    const { arr, type } = this.props;
    return (
      <div className={'body' + type}>
        <div className="canvas">
          <img src={bgArr[type]}></img>
          <div className="header">{arr[0]}</div>
          <div className="title">{arr[1]}</div>
          <div className="bang_dang">
            <img src={leftImg}></img>
            <span className="text">{arr[2]}</span>
            <img src={rightImg}></img>
          </div>
          <div className="group">{arr[3]}</div>
          <div className="name">{arr[4]}</div>
        </div>
      </div>
    );
  }
}

export default Demo;
