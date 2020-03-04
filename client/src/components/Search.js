import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { searchSong } from '../actions';

class Search extends Component {

  state = {
    input: ''
  }

  onChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.searchSong(this.state.input, this.props.id);
    this.setState({input: ''});
    console.log(this.props);
  }

  componentDidMount() {
    //this.props.searchSong(this.props.location.query, this.props.userData.user.id)
    //this.props.searchSong(this.props.searchResults.input, this.props.userData.user.id)
    this.setState({input: this.props.searchResults.input})
    console.log("Mount", this.state.input)
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevProps.searchResults)
    //console.log(this.props.searchResults)
    
    if (this.props.searchResults.input !== prevState.input) {
      console.log("diff")
      console.log(prevState.input)
      console.log(this.state.input)
      //this.props.searchSong(this.props.searchResults.input, this.props.userData.user.id)
      //this.props.searchSong(this.props.match.params.input, this.props.userData.user.id)
      //this.setState({...this.state});
      //console.log(this.props.searchResults)
      //console.log(this.props.searchResults.results[0])
    }
  }

  play = (event) => {
    console.log(event.target.value)
    fetch('/songs/play?uri=' + event.target.value + '&id=' + this.props.id)
      .then(res => {})

  }

  render() {
    const results = this.props.searchResults.results.map(elem =>(
      <div key={elem.id}>
          <ul><img src={elem.album.images[2].url} alt ='' /> {elem.name} - {elem.artists[0].name}
          <br/>
          <button onClick={this.play} value={elem.uri}>Play</button>
          <button onClick={} value={elem.uri}>Save</button>
          <button onClick={} value={elem.uri}>Share</button>
          </ul>
          <br/>
      </div>  
    ));
    
    return (
      <div>
        {results}
      </div>
    );
  }
}

Search.propTypes = {
  searchSong: PropTypes.func.isRequired,
  searchResults: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({searchResults: state.searchReducer, userData: state.userReducer})

export default connect(mapStateToProps, { searchSong })(Search);
