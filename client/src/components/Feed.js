import React, { Component } from 'react';
import Search from './Search';

class Feed extends Component {

  state = {}

  render() {
    return (
      <div>
        <h1>Feed</h1>
        <Search id={this.props.match.params.id} />
      </div>
    );
  }
}

export default Feed;
