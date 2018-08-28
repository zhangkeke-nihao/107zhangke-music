import React, { Component } from 'react';

export default class GiveMusic extends Component {
  // 渲染送音乐页面
  handleGiveMusic = () => {
    const { isSingleChoice, musicdata } = this.props;
    if (isSingleChoice == true && musicdata.musicchooseId == musicdata.listentities[musicdata.musicchooseId].id) {
      return (alert(`送出【${musicdata.listentities[musicdata.musicchooseId].name}】音乐`));
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.handleGiveMusic()}
      </div>
    );
  }
}


// const newmymusicdata = musicdata.mymusicIndex.map(id => {
//   if (musicdata.mymusicentities[id] !== undefined) {
//     return musicdata.mymusicentities[id].list.map(item => {
//       if (isSingleChoice == true && musicdata.musicchooseId == musicdata.listentities[item].id) {
//         return (alert(`送出【${musicdata.listentities[item].name}】音乐`));
//       }
//     });
//   }
// });
// return newmymusicdata;
