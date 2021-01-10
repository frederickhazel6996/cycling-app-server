import React, { useEffect, useState } from 'react';
import Map from '../../Demo/Maps/GoogleMap/TempMap';
import Logo from '../assets/bblogo.svg';
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    Spinner,
    Table,
    Card,
    Pagination,
    Modal
} from 'react-bootstrap';

import { fetchRequest } from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import '../Users/users.scss';

const Ras = ({
    loading,

    history,
    request,
    fetchRequest
}) => {
    useEffect(() => {
        fetchRequest();
    }, []);

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 12;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(request.length / pagination_division);
    for (let number = 1; number <= divison; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => setpagination_number(number)}>
                {number}
            </Pagination.Item>
        );
    }

    const Userpagination = (
        <div className="mt-2 float-right">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    const [view, setview] = useState(false);

    const handleViewClose = () => setview(false);
    const handleViewShow = () => setview(true);

    let users_length = request.length;

    let rat_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        rat_holder.push(request[counter]);
        counter++;
    }

    const [feedback, setfeedback] = useState('');
    const [completed, setcompleted] = useState('');
    const [sender_email, setsender_email] = useState('');
    const [senderlocation, setsenderlocation] = useState('');
    const [body, setbody] = useState('');
    const [assignedname, setassignedname] = useState('');
    const [sender_name, setsender_name] = useState('');
    const [assignedemail, setassignedemail] = useState('');
    const [assignedid, setassignedid] = useState('');
    const [id, setid] = useState('');
    const [datesent, setdatesent] = useState('');

    let temp_request = rat_holder.map(request => (
        <tr key={request.id}>
            <td>{request.sender_name} </td>
            <td>{request.assigned_to_name} </td>
            <td>{request.sender_location} </td>

            {request.completed ? (
                <td>
                    <span className="green-text">Yes</span>
                </td>
            ) : (
                <td>
                    {' '}
                    <span className="delete-user-cross">No</span>
                </td>
            )}
            <td
                className="view-text view-button"
                onClick={() => {
                    setfeedback(request.feedback);
                    setcompleted(request.completed);
                    setsender_email(request.sender_email);
                    setsenderlocation(request.sender_location);
                    setassignedname(request.assigned_to_name);
                    setassignedemail(request.assigned_to_email);
                    setassignedid(request.assigned_to_id);
                    setid(request.id);
                    setdatesent(request.date_sent);
                    setbody(request.body);
                    setsender_name(request.sender_name);

                    handleViewShow();
                }}>
                View
            </td>
        </tr>
    ));

    let view_modal = (
        <Modal
            show={view}
            onHide={handleViewClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-extra">
                    Road Assistance Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text">Name </span>
                        </Col>
                        <Col className="request-body-text">{sender_name}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text">Location</span>
                        </Col>
                        <Col className="request-body-text">
                            {senderlocation}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text">Request</span>
                        </Col>
                        <Col className="request-body-text">{body}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text">
                                Request Date and Time
                            </span>
                        </Col>
                        <Col className="request-body-text">{datesent}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text">
                                Response Team Member Name
                            </span>
                        </Col>
                        <Col className="request-body-text">{assignedname}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text">Status</span>
                        </Col>
                        {completed ? (
                            <Col className="green-text">Completed</Col>
                        ) : (
                            <Col className="delete-user-cross">Pending</Col>
                        )}
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <span className="blue-text mt-5">Feedback</span>
                        </Col>
                        <Col className="request-body-text">{feedback}</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <div className="help-map-box">
                                <Map />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            <Container fluid>
                <div className="corrector">
                    <div>{view_modal}</div>

                    <Row>
                        <Col
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                            xl={{ span: 4 }}>
                            <Card>
                                <Card.Body>
                                    <h6 className="mb-4"></h6>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-9">
                                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                Roadside Assistance Management
                                                system
                                            </h3>
                                        </div>

                                        <div className="col-3 text-right">
                                            <p className="m-b-0"></p>
                                        </div>
                                    </div>
                                    <div
                                        className="progress m-t-30"
                                        style={{ height: '7px' }}>
                                        <div
                                            className="progress-bar progress-c-theme"
                                            role="progressbar"
                                            style={{ width: '100%' }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        {' '}
                        <Col
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 12 }}>
                            <Card>
                                <Card.Body>
                                    <div className="table-height">
                                        <Table
                                            responsive
                                            striped
                                            bordered
                                            hover
                                            size="sm"
                                            className="">
                                            <thead>
                                                <tr>
                                                    <th>Sender Name</th>
                                                    <th>Assigned Team</th>
                                                    <th>Sender Location</th>
                                                    <th>Completed</th>
                                                </tr>
                                            </thead>
                                            <tbody>{temp_request}</tbody>
                                        </Table>
                                    </div>
                                    {Userpagination}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        request: state.admin.request
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchRequest: () => {
            dispatch(fetchRequest());
        }
    };
};

Ras.propTypes = {
    history: RPT.object,

    fetchRequest: RPT.func,

    request: RPT.array
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Ras));
