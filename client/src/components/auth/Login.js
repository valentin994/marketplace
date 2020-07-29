import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
        email, 
        password
    };
    this.props.login(user);
    
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>login:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.onChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.onChange}
          />
          <input type="submit" value="Login" />
          {this.state.msg ? <p>{this.state.msg}</p> : null}
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
