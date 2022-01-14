import React from 'react';
import './index.scss';
import { tempArr } from './constants';

class Demo extends React.PureComponent {
  componentDidMount() {}
  render() {
    return (
      <div className="container_22_1_5">
        <div className="title">请选择模版</div>
        <div className="temp_container">
          {tempArr.map((item, idx) => {
            return (
              <div
                key={idx}
                className="temp"
                onClick={() => {
                  this.chooseTemp(idx);
                }}
              >
                <img src={item.img}></img>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  chooseTemp = idx => {
    this.props.history.push('/template?type=' + idx);
  };
}

export default Demo;
