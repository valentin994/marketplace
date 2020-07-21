import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addService } from '../actions/serviceActions';

class serviceModal extends Component {
    state = {
        name: '',
        time: 0,
        metrics: '',
        description: ''
    }

    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newService = {
            name: this.state.name,
            time: this.state.time,
            metrics: this.state.metrics,
            description: this.state.description
        }
        console.log(newService);
        // Add service via addServiceAction
        this.props.addService(newService);

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Name:
                      </label>
                    <input type="text" id="service" name="name" onChange={this.onChange} />
                    <input type="text" id="service" name="time" onChange={this.onChange} />
                    <input type="text" id="service" name="metrics" onChange={this.onChange} />
                    <input type="text" id="service" name="description" onChange={this.onChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    service: state.service
})

export default connect(mapStateToProps, { addService })(serviceModal)