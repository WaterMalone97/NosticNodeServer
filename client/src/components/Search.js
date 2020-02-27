import React, { Component } from 'react';

class Search extends Component {

  state = {
    input: ''
  }

  onChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input value={this.state.input} onChange={this.onChange} />
          <button type="submit">Submit</button>
          {this.state.input}
        </form>
      </div>
    );
  }
}

export default Search;
