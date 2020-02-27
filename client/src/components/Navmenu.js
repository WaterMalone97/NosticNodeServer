import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container} from 'reactstrap';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import PropTypes from 'prop-types';
import Search from './Search';

class Navmenu extends Component {

  state = {
    isOpen: false
  }

  componentDidMount() {
    this.props.getUserData(this.props.match.params.id);
  }
  
  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Navbar color="dark" dark>
          <Container>
            <NavbarBrand>{this.props.userData.user.display_name}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Account</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://www.google.com">google</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Search />
      </div>
    );
  }
}

Navmenu.propTypes = {
  getUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({userData: state.userReducer})

export default connect(mapStateToProps, { getUserData })(Navmenu);
