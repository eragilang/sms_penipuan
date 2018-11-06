/* eslint-disable */
import React, { Component } from "react";
import {
    Grid, Row, Col,
    FormControl,
} from "react-bootstrap";
import { connect } from 'react-redux';
import agent from '../../agent';
import moment from 'moment';
import { Link, Redirect, withRouter } from 'react-router-dom';

import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

import {
    UPDATE_DETAIL_SMS_PAGE_UNLOADED,
    GET_REFERENCE_SMS_BY_MSISDN,
    UPDATE_FIELD_SMS
} from '../../constants/actionTypes';


const mapStateToProps = state => ({ ...state, sms: state.sms });
const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch({ type: GET_REFERENCE_SMS_BY_MSISDN, payload }),
    onUnload: () =>
        dispatch({ type: UPDATE_DETAIL_SMS_PAGE_UNLOADED }),
    onUpdateField: (key, value) =>
        dispatch({ type: UPDATE_FIELD_SMS, key, value }),
});

class ViewPenipu extends Component {

    constructor() {
        super()
        const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
        this.changeStatus = updateFieldEvent('status')
        // this.submitForm = (oldStatus) => ev => {
        //     const division = this.props.user.division ? this.props.user.division : this.props.oldUser[0][0].DIVISION;
        //     if (oldStatus === 'INCOMPLETE') {
        //         this.props.onClickLogout()
        //     }
        //     this.props.onSubmit(this.props.location.pathname.replace('/updateUser/', ''), status, new Date(), username, email, name, roles, department, division)
        // }
    }
    componentWillMount() {
        this.props.onLoad(Promise.all([agent.Sms.getReferencePenipu(this.props.location.pathname.replace('/update/penipu/', ''))]))
    }
    componentWillUnmount() {
        this.props.onUnload();
    }
    render() {
        if (!this.props.sms.reference) {
            return null;
        }

        return (<div className="content">
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            title={`Reference for ${this.props.sms.reference[0].msisdn}`}
                            category={``}
                            content={
                                <div>
                                    <div className="typo-line">
                                        <p>
                                            <span className="category">msisdn</span>{`${this.props.sms.reference[0].msisdn}`}
                                        </p>
                                    </div>
                                    <div className="typo-line">
                                        <p>
                                            <span className="category">updated by</span>{`${this.props.sms.reference[0].updated_by}`}
                                        </p>
                                    </div>
                                    <div className="typo-line">
                                        <p>
                                            <span className="category">updated date</span>{`${this.props.sms.reference[0].updated_date}`}
                                        </p>
                                    </div>
                                    <div className="typo-line">
                                        <p>
                                            <span className="category">current_ind</span>{`${this.props.sms.reference[0].current_ind}`}
                                        </p>
                                    </div>
                                    <div className="typo-line">
                                        <p>
                                            <span className="category">Status</span>
                                            <div style={{ width: '20%' }}>
                                                <FormControl componentClass="select" value={this.props.sms.reference[0].status} onChange={this.changeStatus} >
                                                    <option value={this.props.sms.reference[0].status} selected>{this.props.sms.reference[0].status}</option>
                                                    <option value="Follow Up" hidden={this.props.sms.reference[0].status === 'Follow Up' ? true : false}>Follow Up</option>
                                                    <option value="Blocked" hidden={this.props.sms.reference[0].status === 'Blocked' ? true : false}>Blocked</option>
                                                </FormControl>
                                            </div>
                                        </p>
                                    </div>
                                    <div className="typo-line">
                                        <p>
                                            <span className="category"></span>
                                            <Button bsStyle="info" fill type="submit" /*onClick={this.submitForm()}*/>
                                                Update
                                            </Button>
                                        </p>
                                    </div>
                                </div>
                            }
                        />
                    </Col>
                </Row>
                <Row> <div className="col-md-12">
                    <Link to="/home">
                        <Button bsStyle="info" fill type="submit">
                            Back
                        </Button>
                    </Link>
                </div>
                </Row>
            </Grid>
        </div>)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPenipu));
