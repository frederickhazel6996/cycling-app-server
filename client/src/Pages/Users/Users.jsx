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
    Pagination
} from 'react-bootstrap';

import {
    addUserUp,
    fetchUsers,
    deleteUser,
    updateUser
} from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import './users.scss';

const Users = ({
    loading,
    addUserUp,
    history,
    users,
    fetchUsers,
    deleteUser,
    updateUser
}) => {
    useEffect(() => {
        fetchUsers();
    }, []);
    const { register, handleSubmit } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();
    const [delete_id, setdelete_id] = useState('');
    const [update_email, setupdate_email] = useState('');
    const [update_id, setupdate_id] = useState('');
    const [user, setuser] = useState({});

    const submitHandler = data => {
        if (data.password === data.confirm_password) {
            addUserUp({
                username: data.email,
                password: data.password,
                access_level: data.access_level,
                first_name: data.first_name,
                last_name: data.last_name,
                history: history
            });
        }
        document.getElementById('add-user-form').reset();
        document.getElementById('overlay-8').style.display = 'none';
    };

    const updateHandler = data => {
        if (data.email === '') {
            data.email = user.username;
        }
        if (data.first_name === '') {
            data.first_name = user.first_name;
        }
        if (data.last_name === '') {
            data.last_name = user.last_name;
        }

        if (data.password === data.confirm_password) {
            updateUser({
                username: data.email,
                password: data.password,
                access_level: data.access_level,
                first_name: data.first_name,
                last_name: data.last_name,
                id: update_id,
                history: history
            });
        }

        document.getElementById('overlay-6').style.display = 'none';
    };

    const addUserButtonAction = () => {
        document.getElementById('overlay-8').style.display = 'block';
        document.getElementById('add-user-form').reset();
    };

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 12;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(users.length / pagination_division);
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

    const Adminpagination = (
        <div className="mt-2 float-right">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    let users_length = users.length;

    let users_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        users_holder.push(users[counter]);
        counter++;
    }

    let temp_users = users_holder.map(user => (
        <tr key={user.id}>
            <td>
                {user.first_name} {user.last_name}
            </td>
            <td>{user.username}</td>
            {user.access_level === 1 ? (
                <td>Super Admin</td>
            ) : user.access_level === 2 ? (
                <td>Editor</td>
            ) : (
                <td>Moderator</td>
            )}

            <td>
                {' '}
                <div
                    className="update-icon"
                    onClick={() => {
                        setuser(user);
                        setupdate_email(user.username);
                        setupdate_id(user.id);
                        document.getElementById('overlay-6').style.display =
                            'block';
                        document.getElementById('update-user-form').reset();
                    }}>
                    Edit
                </div>
            </td>
            <td
                className="delete-user-cross"
                onClick={() => {
                    setdelete_id(user.username);
                    document.getElementById('overlay-5').style.display =
                        'block';
                }}>
                Delete
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
        table = document.getElementById('admin-table');
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

    return (
        <>
            <Container fluid>
                <div className="corrector">
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
                                                Admins
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
                                className="btn btn-success button-down-2"
                                id="add-user-button"
                                onClick={addUserButtonAction}>
                                Add New Admin
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col
                            xs={11}
                            sm={11}
                            md={8}
                            lg={4}
                            xl={4}
                            className="mb-3">
                            <button
                                className="btn btn-success"
                                id="add-user-button"
                                onClick={addUserButtonAction}>
                                Add New Admin
                            </button>
                        </Col> */}
                    </Row>
                    <div id="overlay-8">
                        <Row>
                            <Col
                                xs={{ offset: 1, span: 10 }}
                                sm={{ offset: 1, span: 10 }}
                                md={{ offset: 2, span: 8 }}
                                lg={{ offset: 4, span: 6 }}
                                xl={{ offset: 4, span: 4 }}
                                className="add-overlay">
                                <Card id="add-user-form-box">
                                    <Card.Body>
                                        <div
                                            className="text-right mr-2 delete-user-cross"
                                            onClick={() =>
                                                (document.getElementById(
                                                    'overlay-8'
                                                ).style.display = 'none')
                                            }>
                                            X
                                        </div>
                                        <Form
                                            autocomplete="off"
                                            key={1}
                                            onSubmit={handleSubmit(
                                                submitHandler
                                            )}
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
                                                        <Form.Label>
                                                            Email
                                                        </Form.Label>
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
                                                        <Form.Label>
                                                            First Name
                                                        </Form.Label>
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
                                                        <Form.Label>
                                                            Last Name
                                                        </Form.Label>
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
                                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                                        <Form.Label>
                                                            Level
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="access_level"
                                                            ref={register({
                                                                required: true
                                                            })}>
                                                            <option>
                                                                Super Admin
                                                            </option>
                                                            <option>
                                                                Editor
                                                            </option>
                                                            <option>
                                                                Moderator
                                                            </option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12}>
                                                    <Form.Group controlId="formBasicPassword1">
                                                        <Form.Label>
                                                            Password
                                                        </Form.Label>
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
                                                        Add Admin
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>

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
                                            id="admin-table">
                                            <thead>
                                                <tr>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(0)
                                                        }>
                                                        Name{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(1)
                                                        }>
                                                        E-Mail{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            tableSort(2)
                                                        }>
                                                        Access Level{' '}
                                                        <span className="ml-5">
                                                            <i className="fas fa-sort"></i>
                                                        </span>
                                                    </th>
                                                    <th
                                                        colSpan="2"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>{temp_users}</tbody>
                                        </Table>
                                    </div>
                                    {Adminpagination}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <div id="overlay-5">
                        <Row>
                            <Col
                                xs={{ offset: 1, span: 10 }}
                                sm={{ offset: 1, span: 10 }}
                                md={{ offset: 2, span: 8 }}
                                lg={{ offset: 4, span: 7 }}
                                xl={{ offset: 4, span: 4 }}>
                                <div className="delete-box shadow rounded">
                                    <div
                                        className="text-right mr-2 delete-user-cross"
                                        onClick={() =>
                                            (document.getElementById(
                                                'overlay-5'
                                            ).style.display = 'none')
                                        }>
                                        X
                                    </div>
                                    <div className="text-center pt-3">
                                        Do you want to delete User{' '}
                                        <span className="delete-user">
                                            {delete_id}
                                        </span>
                                    </div>
                                    <div className="text-center mt-3">
                                        This Action is permanent
                                    </div>
                                    <div className="text-center mt-3 pb-3 ">
                                        <Button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                document.getElementById(
                                                    'overlay-5'
                                                ).style.display = 'none';
                                                deleteUser(delete_id);
                                            }}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div id="overlay-6">
                        <Row>
                            <Col
                                xs={{ offset: 1, span: 10 }}
                                sm={{ offset: 1, span: 10 }}
                                md={{ offset: 3, span: 7 }}
                                lg={{ offset: 5, span: 6 }}
                                xl={{ offset: 4, span: 4 }}
                                className="update-form-extra">
                                <Card>
                                    <Card.Body>
                                        <div
                                            className="text-right mr-2 delete-user-cross"
                                            onClick={() =>
                                                (document.getElementById(
                                                    'overlay-6'
                                                ).style.display = 'none')
                                            }>
                                            X
                                        </div>
                                        <div className="update-form">
                                            <Form
                                                autocomplete="off"
                                                key={2}
                                                onSubmit={handleSubmit2(
                                                    updateHandler
                                                )}
                                                id="update-user-form">
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        {' '}
                                                        <h5 className="text-center mt-5">
                                                            Update User{' '}
                                                            {user.first_name}{' '}
                                                            {user.last_name}
                                                        </h5>
                                                        <hr />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        {' '}
                                                        <Form.Group controlId="formBasicids">
                                                            <Form.Label>
                                                                Email
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={
                                                                    update_email
                                                                }
                                                                name="email"
                                                                ref={register2({
                                                                    required: false
                                                                })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        {' '}
                                                        <Form.Group controlId="formBasicids">
                                                            <Form.Label>
                                                                First Name
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={
                                                                    user.first_name
                                                                }
                                                                name="first_name"
                                                                ref={register2({
                                                                    required: false
                                                                })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        {' '}
                                                        <Form.Group controlId="formBasicids">
                                                            <Form.Label>
                                                                Last Name
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={
                                                                    user.last_name
                                                                }
                                                                name="last_name"
                                                                ref={register2({
                                                                    required: false
                                                                })}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        {' '}
                                                        <Form.Group controlId="exampleForm.ControlSelect1s">
                                                            <Form.Label>
                                                                Level
                                                            </Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                name="access_level"
                                                                ref={register2({
                                                                    required: true
                                                                })}>
                                                                {user.access_level ===
                                                                1 ? (
                                                                    <option>
                                                                        Super
                                                                        Admin
                                                                    </option>
                                                                ) : user.access_level ===
                                                                  2 ? (
                                                                    <option>
                                                                        Editor
                                                                    </option>
                                                                ) : (
                                                                    <option>
                                                                        Moderator
                                                                    </option>
                                                                )}

                                                                <option>
                                                                    Super Admin
                                                                </option>
                                                                <option>
                                                                    Editor
                                                                </option>
                                                                <option>
                                                                    Moderator
                                                                </option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        <Form.Group controlId="formBasicPasswords1">
                                                            <Form.Label>
                                                                Password
                                                            </Form.Label>
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
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        <Form.Group controlId="formBasicPasswords">
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
                                                </Row>

                                                <Row>
                                                    {' '}
                                                    <Col
                                                        xs={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        sm={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        md={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        lg={{
                                                            offset: 1,
                                                            span: 10
                                                        }}
                                                        xl={{
                                                            offset: 1,
                                                            span: 10
                                                        }}>
                                                        <Button
                                                            type="submit"
                                                            className="login-button mb-5">
                                                            {loading && (
                                                                <Spinner
                                                                    animation="border"
                                                                    variant="light"
                                                                    size="sm"
                                                                />
                                                            )}
                                                            Update User
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        users: state.admin.users
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        addUserUp: data => {
            dispatch(addUserUp(data));
        },
        fetchUsers: () => {
            dispatch(fetchUsers());
        },
        deleteUser: data => {
            dispatch(deleteUser(data));
        },
        updateUser: data => {
            dispatch(updateUser(data));
        }
    };
};

Users.propTypes = {
    history: RPT.object,
    addUserUp: RPT.func,
    fetchUsers: RPT.func,
    deleteUser: RPT.func,
    updateUser: RPT.func,
    users: RPT.array
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Users));
