import React, { Component } from 'react';
import { Row, Col, Card, Divider, Modal, Button } from 'antd';
import '../index.css'

import { connect } from 'react-redux';
import { getServices, deleteService } from '../actions/serviceActions';
import PropTypes from 'prop-types';
import ServiceModal from '../components/serviceModal';

class Services extends Component {

    componentDidMount() {
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

    onDeleteClick = (id) => {
        this.props.deleteService(id);
    }

    render() {
        const serviceList = this.props.service.services.map((service) =>
            <Col xs={24} md={8} style={{ display: 'flex' }}>
                <Card key={service._id} style={{ width: '100%' }} title={service.name} bordered={false} hoverable="true" onClick={this.showModal}>
                    <h3>{service.time} Hours</h3>
                    <p>service.id {service._id}</p>
                    <h5>{service.metrics}</h5>
                    <Divider />
                    <p>{service.description}</p>
                </Card>
                <Button onClick={this.onDeleteClick.bind(this, service._id)}>Delete dis</Button>
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
                    <ServiceModal></ServiceModal>
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
    service: state.service
})

export default connect(mapStateToProps, { getServices, deleteService })(Services);