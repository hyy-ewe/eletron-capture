import React from 'react';
import './index.scss';
import qs from 'query-string';
import { tempArr, csvArr } from '../home/constants';

class Demo extends React.Component {
  state = {
    type: null,
    list: null,
    downloading: false,
  };

  componentDidMount() {
    const { type } = qs.parse(location.search);
    this.setState({ type });
  }

  render() {
    const { type, list, downloading } = this.state;
    if (!type) return null;
    return (
      <div className="temp_container_22_1_5">
        <div className="header">
          {!downloading && (
            <>
              <a onClick={this.handleBack}>返回</a>
              <a href={csvArr[type]}>下载参考表单</a>
              <a>
                上传表单
                <input
                  type="file"
                  id="uploadfile"
                  placeholder="上传表单"
                  onChange={e => {
                    this.handleUpload(e);
                  }}
                ></input>
              </a>
              {list && <a onClick={this.downloadImgs}>下载图片</a>}
            </>
          )}
          {downloading && <a>下载中</a>}
        </div>
        <div className={'body'}>
          <img src={tempArr[type].img}></img>
        </div>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  };
  handleUpload = e => {
    const reader = new FileReader();
    const outerThis = this;
    reader.onload = function () {
      const list = this.result.split('\r\n').map(item => item.split(','));
      outerThis.setState({ list });
    };
    reader.readAsText(e.target.files[0], 'UTF-8');
  };
  downloadImgs = () => {
    const { type, list } = this.state;
    const imgArea = document.querySelector('.body img');
    const { x, y, width, height } = imgArea.getBoundingClientRect();
    const isChoosed = ipcRenderer.sendSync('choose-file');
    if (!isChoosed) {
      return;
    }
    this.setState({ downloading: true });
    ipcRenderer.invoke('capture-img', { x, y, width, height, type, extra: JSON.stringify(list) });
    ipcRenderer.once('downloadEnd', () => {
      this.setState({ downloading: false });
    });
  };
}

export default Demo;
