import React, { Component } from 'react';
//uninstall axios

class Login extends Component {

  state = {
    modal: false
  }

  onSubmit = () => {
      //fetch('Access-Control-Allow-Origin: users/test')
        //.then(res => console.log(res))
      //.then(info => this.setState({info}, () => console.log("info")));
        //.catch((error) => console.log(error))
      window.open("http://localhost:3001/users/login")
  }

  

  render() {
    return (
      <div>
        <button onClick = {this.onSubmit}>pop out</button>
        <a href="http://localhost:3001/users/login" className="btn btn-default">Get Started</a>
      </div>
    );
  }
}

export default Login;
