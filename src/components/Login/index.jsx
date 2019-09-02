import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import "./styles.scss";

class Login extends PureComponent {

  constructor(){
    super();

    this.state = {
      errors: {}
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    const loginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(loginRequest);
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.security.validToken){
      this.props.history.push("/menu")
    }

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount(){
    if(this.props.security.validToken){
      this.props.history.push("/menu")
    }
  }

  render() {

    const { errors = {} } = this.state;

    return(
        <div className="login-box">
          <h1 className="display-4 text-center">Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Username" name="username" onChange={this.onChange}/>
              {errors.username && <div className="text-danger"><small>{errors.username}</small></div>}
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" onChange={this.onChange}/>
              {errors.password && <div className="text-danger"><small>{errors.password}</small></div>}
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4"/>
          </form>
        </div>
    )
  }

}

const mapStateToProps = state => ({
  security: state.security,
  products: state.products,
  errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);