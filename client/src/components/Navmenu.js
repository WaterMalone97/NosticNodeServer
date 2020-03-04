import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, Button, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getUserData, requestSearch } from '../actions';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

class Navmenu extends Component {

  state = {
    isOpen: false,
    input: ''
  }

  onChange = (event) => {
    this.setState({input: event.target.value});
  }

  componentDidMount() {
    this.props.getUserData(this.props.match.params.id);
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  checkInput = () => {
    if (this.state.input !== '')
      return ("/search/" + this.state.input)
    else
      return ("../" + this.props.match.params.location + "/" + this.props.match.params.id)
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("Searching.....")
    //this.props.searchSong(this.state.input, this.props.userData.user.id);
    this.setState({input: ''});
  }

  test = () => {
    if (this.state.input !== '') {
      this.props.requestSearch(this.state.input);
      this.setState({input: ''});
    }
  }

  render() {
    return (
      <div>
        <Navbar fixed="top" color="dark" dark>
          <Container>
            <NavbarBrand>{this.props.userData.user.display_name}</NavbarBrand>
            <form onSubmit={this.onSubmit} className="form-inline">
              <Input value={this.state.input} onChange={this.onChange} placeholder="Search" />
              <Button type="submit" className="btn btn-light mx-2">
                Submit
              </Button>
              <Button onClick={this.test} className="btn btn-light mx-2">
                <NavLink to={this.checkInput}>Test</NavLink>
              </Button>
            </form>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem onClick={this.toggle}>
                  <NavLink to={"/profile/" + this.props.userData.user.id}> Profile</NavLink>
                </NavItem>
                <NavItem onClick={this.toggle}>
                  <NavLink to={"/feed/" + this.props.userData.user.id}> Feed</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        

        <Navbar fixed="bottom" color="dark" dark>
          <Container>
            <NavbarBrand>Player</NavbarBrand>
          </Container>
        </Navbar>
      </div>
    );
  }
}

Navmenu.propTypes = {
  getUserData: PropTypes.func.isRequired,
  requestSearch: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({userData: state.userReducer})

export default connect(mapStateToProps, { getUserData, requestSearch })(Navmenu);
