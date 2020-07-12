import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

import { Row, Col, Card, Space, Divider, Avatar, Modal, Button } from 'antd';
import '../index.css'

import { WindowsOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getServices } from '../actions/serviceActions';
import PropTypes from 'prop-types';

class Services extends Component {

    componentDidMount(){
        this.props.getServices();
    }

    state = {
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };



    render() {
        

        const serviceList = this.props.service.services.map((service) =>
            <Col xs={24} md={8} style={{ display: 'flex' }}>
                <Card key={service.id} style={{ width: '100%' }} title={service.name} bordered={false} hoverable="true" onClick={this.showModal}>
                    <h3>750 Hours</h3>
                    <h5>Quad Core, 16GB RAM, 1TB Storage</h5>
                    <Divider />
                    <p>Create Windows virtual machines with on-demand capacity in seconds.</p>
                </Card>
            </Col>
        );

        return (
            <div className="serviceContainer">
                <h2>Product List</h2>
                <Divider />
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
         
                        {serviceList}
                    
                    </Row>
                    <Modal
                        title="Add Service"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>Some form to</p>
                        <p>Validate your request</p>
                        <p>And usage</p>
                    </Modal>

                </div>
            </div>
        );
    }
}

Services.propTypes = {
    getServices: PropTypes.func.isRequired,
    service: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    service:state.service
})

export default connect(mapStateToProps, { getServices })(Services);