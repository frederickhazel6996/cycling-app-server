import React, { useEffect, useState } from 'react';
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

import InputEmoji from 'react-input-emoji';
import { addRat, deleteRat, updateRat, fetchRat } from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import '../Users/users.scss';
import { set } from 'd3';

const Rat = ({
    loading,
    addRat,
    history,
    rat,
    fetchRat,
    deleteRat,
    updateRat,
    tipMessage,
    tip_message
}) => {
    useEffect(() => {
        fetchRat();
    }, []);

    const { register, handleSubmit } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();
    const [delete_id, setdelete_id] = useState('');

    const [update_id, setupdate_id] = useState('');
    const [update_value, setupdate_value] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [email, setemail] = useState('');
    const [last_name, setlast_name] = useState('');
    const [location, setlocation] = useState('');
    /* const [rat, setrat] = useState(''); */

    function handleOnEnter(text) {}

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 12;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(rat.length / pagination_division);
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

    const submitHandler = data => {
        if (data.password === data.confirm_password) {
            addRat({
                email: data.email,
                password: data.password,
                location: data.location,
                first_name: data.first_name,
                last_name: data.last_name,
                history: history
            });
        }
        document.getElementById('add-user-form').reset();

        handleClose();
    };

    const updateHandler = data => {
        if (data.password === data.confirm_password) {
            updateRat({
                id: update_id,
                email: data.email,
                password: data.password,
                location: data.location,
                first_name: data.first_name,
                last_name: data.last_name,
                history: history
            });
        }
        document.getElementById('update-user-form').reset();

        handleUpdateClose();
    };
    const [show, setShow] = useState(false);

    const [view, setview] = useState(false);
    const [delete_modal, setdelete_modal] = useState(false);
    const [update, setupdate] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleViewClose = () => setview(false);
    const handleViewShow = () => setview(true);
    const handleDeleteClose = () => setdelete_modal(false);
    const handleDeleteShow = () => setdelete_modal(true);
    const handleUpdateClose = () => setupdate(false);
    const handleUpdateShow = () => setupdate(true);

    let users_length = rat.length;

    let rat_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        rat_holder.push(rat[counter]);
        counter++;
    }

    let temp_tips = rat_holder.map(rat => (
        <tr key={rat.id}>
            <td>{rat.email} </td>
            <td>{rat.first_name} </td>
            <td>{rat.last_name} </td>
            <td>{rat.location} </td>
            {rat.assigned ? (
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
                className="delete-user-cross"
                onClick={() => {
                    setdelete_id(rat.id);
                    handleDeleteShow();
                }}>
                delete
            </td>
            <td>
                {' '}
                <div
                    className="update-icon"
                    onClick={() => {
                        setupdate_id(rat.id);
                        setlocation(rat.location);
                        setfirst_name(rat.first_name);
                        setlast_name(rat.last_name);
                        setemail(rat.email);
                        handleUpdateShow();
                    }}>
                    update
                </div>
            </td>
        </tr>
    ));
    let tableSort = n => {
        var table,
            rows,
            switching,
            i,
            x,
            y,
            shouldSwitch,
            dir,
            switchcount = 0;
        table = document.getElementById('rat-table');
        switching = true;

        dir = 'asc';

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < rows.length - 1; i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName('TD')[n];
                y = rows[i + 1].getElementsByTagName('TD')[n];

                if (dir === 'asc') {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === 'desc') {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;

                switchcount++;
            } else {
                if (switchcount === 0 && dir === 'asc') {
                    dir = 'desc';
                    switching = true;
                }
            }
        }
    };

    let add_modal = (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Member Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="">
                        <Form
                            autocomplete="off"
                            key={1}
                            onSubmit={handleSubmit(submitHandler)}
                            id="add-user-form">
                            <Row>
                                <Col xs={12}>
                                    <h5 className="text-center mt-5 f-w-300">
                                        Enter User Details
                                    </h5>
                                    <hr />
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid1">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="first name"
                                            name="first_name"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="last name"
                                            name="last_name"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="location"
                                            name="location"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Form.Group controlId="formBasicPassword1">
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
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirm_password"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="add-user-button mb-5">
                                        {loading && (
                                            <Spinner
                                                animation="border"
                                                variant="light"
                                                size="sm"
                                            />
                                        )}
                                        Add Member
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
    let view_modal = (
        <Modal
            show={view}
            onHide={handleViewClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Tip Body</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {' '}
                <div className="text-center rat-text mt-3">
                    <Row>
                        <Col xl={12}>{rat}</Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
    );
    let deleteModal = (
        <Modal
            show={delete_modal}
            onHide={handleDeleteClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <div className="text-center pt-3">
                    Do you want to delete RAT Member{' '}
                    <span className="delete-user">{delete_id}</span>
                </div>
            </Modal.Header>

            <div className="text-center mt-3">This Action is permanent</div>
            <div className="text-center mt-3 pb-3 ">
                <Button
                    className="btn btn-danger"
                    onClick={() => {
                        setdelete_modal(false);
                        deleteRat(delete_id);
                    }}>
                    Delete
                </Button>
            </div>
        </Modal>
    );
    let update_modal = (
        <Modal
            show={update}
            onHide={handleUpdateClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update User {update_id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="">
                        <Form
                            autocomplete="off"
                            key={1}
                            onSubmit={handleSubmit2(updateHandler)}
                            id="update-user-form">
                            <Row>
                                <Col xs={12}>
                                    <h5 className="text-center mt-5 f-w-300">
                                        Enter User Details
                                    </h5>
                                    <hr />
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={email}
                                            name="email"
                                            ref={register2({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid1">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={first_name}
                                            name="first_name"
                                            ref={register2({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={last_name}
                                            name="last_name"
                                            ref={register2({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={location}
                                            name="location"
                                            ref={register2({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Form.Group controlId="formBasicPassword1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            ref={register2({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirm_password"
                                            ref={register2({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="add-user-button mb-5">
                                        {loading && (
                                            <Spinner
                                                animation="border"
                                                variant="light"
                                                size="sm"
                                            />
                                        )}
                                        Update Member
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
    return (
        <>
            <Container fluid>
                <div className="corrector">
                    <div>{add_modal}</div>
                    <div>{view_modal}</div>
                    <div>{deleteModal}</div>
                    <div>{update_modal}</div>

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
                                                RAT Management System
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
                        <Col
                            xs={11}
                            sm={11}
                            md={8}
                            lg={4}
                            xl={4}
                            className="mb-3">
                            <button
                                className="btn btn-success button-down"
                                id="add-user-button"
                                onClick={handleShow}>
                                Add New member
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        {/*  <Col
                            xs={11}
                            sm={11}
                            md={8}
                            lg={4}
                            xl={4}
                            className="mb-3">
                            <button
                                className="btn btn-success"
                                id="add-user-button"
                                onClick={handleShow}>
                                Add New RAT member
                            </button>
                        </Col> */}
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
                                            className=""
                                            id="rat-table">
                                            <thead>
                                                <tr>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(0)
                                                        }>
                                                        E-mail{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(1)
                                                        }>
                                                        First name{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(2)
                                                        }>
                                                        Last name{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(3)
                                                        }>
                                                        Location{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th>Assigned</th>
                                                </tr>
                                            </thead>
                                            <tbody>{temp_tips}</tbody>
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
        rat: state.admin.rat
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        addRat: data => {
            dispatch(addRat(data));
        },
        fetchRat: () => {
            dispatch(fetchRat());
        },
        deleteRat: data => {
            dispatch(deleteRat(data));
        },
        updateRat: data => {
            dispatch(updateRat(data));
        }
    };
};

Rat.propTypes = {
    history: RPT.object,
    addRat: RPT.func,
    fetchRat: RPT.func,
    deleteRat: RPT.func,
    updateRat: RPT.func,
    rat: RPT.array
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Rat));
