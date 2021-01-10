import React from 'react';
import { Row, Col, Container, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUserIn } from '../../actions/index';
import Logo from '../assets/bblogo.svg';

import 'notyf/notyf.min.css';
import './sign.scss';
import '../../assets/scss/style.scss';
import Aux from '../../hoc/_Aux';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';

const Sign = ({ loading, signUserIn, history }) => {
    const { register, handleSubmit } = useForm();

    const submitHandler = data => {
        signUserIn({
            username: data.username,
            password: data.password,
            history: history
        });
    };
    return (
        <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <div className="card">
                        <div>
                            <div className="text-center pb-0 mt-2">
                                <img
                                    src={Logo}
                                    alt="loading"
                                    width="80"
                                    height="100"
                                />
                            </div>
                            <h4 className="text-center mt-2">Admin Portal</h4>

                            <Form onSubmit={handleSubmit(submitHandler)}>
                                <Row>
                                    <Col
                                        xs={{ offset: 1, span: 10 }}
                                        sm={{ offset: 1, span: 10 }}
                                        md={{ offset: 1, span: 10 }}
                                        lg={10}
                                        xl={10}>
                                        {' '}
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col
                                        xs={{ offset: 1, span: 10 }}
                                        sm={{ offset: 1, span: 10 }}
                                        md={{ offset: 1, span: 10 }}
                                        lg={10}
                                        xl={10}>
                                        {' '}
                                        <Form.Group controlId="formBasicid">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                ref={register({
                                                    required: true
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col
                                        xs={{ offset: 1, span: 10 }}
                                        sm={{ offset: 1, span: 10 }}
                                        md={{ offset: 1, span: 10 }}
                                        lg={10}
                                        xl={10}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                ref={register({
                                                    required: true
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    {' '}
                                    <Col
                                        xs={{ offset: 1, span: 10 }}
                                        sm={{ offset: 1, span: 10 }}
                                        md={{ offset: 1, span: 10 }}
                                        lg={10}
                                        xl={10}>
                                        <button
                                            type="submit"
                                            className="btn btn-success login-button mb-5">
                                            {loading && (
                                                <Spinner
                                                    animation="border"
                                                    variant="light"
                                                    size="sm"
                                                />
                                            )}
                                            Login
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        message: state.admin.message,
        error: state.admin.error
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        signUserIn: data => {
            dispatch(signUserIn(data));
        }
    };
};

Sign.propTypes = {
    history: RPT.object,
    signUserIn: RPT.func,
    message: RPT.string,
    error: RPT.bool
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Sign));
