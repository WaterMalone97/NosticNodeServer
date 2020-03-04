import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getLibrary, getUserData } from '../actions';
import { ListGroupItem } from 'reactstrap';

class Profile extends Component {

  state = {}

  componentDidMount() {
    //this.props.getUserData(this.props.match.params.id)
    this.props.getLibrary(this.props.match.params.id);
    console.log(this.props.userData)
    console.log("mounting")
  }

  componentDidUpdate(prevProps) {
    if (this.props.userData.library !== prevProps.userData.library) {
      this.setState({...this.state});
      console.log(this.props.userData)
      //console.log(this.props.searchResults.results[0])
    }  
  }

  play = (event) => {
    console.log(event.target.value)
    fetch('/songs/play?uri=' + event.target.value + '&id=' + this.props.userData.user.id)
      .then(res => {})
  }

  render() {
    const library = this.props.userData.library.map(elem =>(
      <div key={elem.id}>
          <ListGroupItem><img src={elem.album.images[2].url} alt ='' /> {elem.name} - {elem.artists[0].name}
          <br/>
          <button onClick={this.play} value={elem.uri}>Play</button>
          </ListGroupItem>
          <br/>
      </div>  
    ));
    return (
      <div>
        <h1>{this.props.userData.user.display_name}</h1>
        <br/>
        {library}
      </div>
    );
  }
}

Profile.propTypes = {
  getUserData: PropTypes.func.isRequired,
  getLibrary: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({userData: state.userReducer})

export default connect(mapStateToProps, { getLibrary, getUserData })(Profile);
