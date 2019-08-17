import React, { Component } from "react";
import API from "../utils/API";

class Login extends Component {
  // Setting the component's initial state
  state = {
    userName: "",
    password: "",
    welcome: "",
    notFound: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let { name, value } = event.target;
    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    // if (this.state.password.length < 6) {
    //   alert(
    //     `Please enter a valid password ${this.state.userName}`
    //   )
    //   if (!this.state.userName || !this.state.password) {
    //     console.log("Invalid user or password")
    //   }
    // } else {
    //   alert(`Hello ${this.state.userName}`);
    // }
    // const userData = {
    //   userName: this.state.userName,
    //   password: this.state.password
    // };
    // console.log(userData);

    API.getUser(`${this.state.userName}/${this.state.password}`)
      .then(resp => {
        if (resp.data === null) {
          console.log("not found");
          this.setState({
            notFound:
              "Sorry, that information does not match our records. Please try again."
          });
        } 
        else {
          this.setState({
            welcome: "Welcome, we hope you enjoy the story"
          })
        }
      })
      .catch(err => console.log(err));

    this.setState({
      userName: "",
      password: "",
      notFound: ""
    });
  };

  render() {
    return (
      <div>
        <p className="admin-font">Login</p>
        <form className="pure-form pure-form-stacked centered-form">
          <input
           className="form-input-centered"
            value={this.state.userName}
            name="userName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="User Name"
          />
          <input
           className="form-input-centered"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />
          <button className="pure-button pure-button-primary" onClick={this.handleFormSubmit}>Submit</button>
        </form>
        <modal>{this.state.notFound}{this.state.welcome}</modal>
      </div>
    );
  }
}

export default Login;
