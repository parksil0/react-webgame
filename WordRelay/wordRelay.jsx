import React from 'react';
import ReactDom from 'react-dom';

class WordRelay extends React.Component {
  state = {
    text: 'Hello webpack',
  }
  render() {
    return (
      <h1>{this.state.text}</h1>
    );
  }
}

export default WordRelay
