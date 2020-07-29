import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors} from '../../actions/errorActions';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.props.clearErrors();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const newUser = {
            name,
            email,
            password
        };
        this.props.register(newUser);
    };
    componentDidUpdate(prevProps){
        const {error }=this.props;
        if(error!== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg:error.msg.msg});
            }else{
                this.setState({msg:null});
            }
        }
    }
 
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Name:
                  </label>
                    <input type="text" id="name" name="name" onChange={this.onChange} />
                    <input type="email" id="email" name="email" onChange={this.onChange} />
                    <input type="password" id="password" name="password" onChange={this.onChange} />
                    <input type="submit" value="Register" />
        {this.state.msg ? <p>{this.state.msg}</p> : null}
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
})

export default connect(
    mapStateToProps,
    { register, clearErrors }
)(Register);


