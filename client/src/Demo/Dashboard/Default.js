import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Form } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
import DEMO from '../../store/constant';
import BarDiscreteChart from '../Charts/Nvd3Chart/BarDiscreteChart';
import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { fetchNumberUsers, fetchUsage, searchYear } from '../../actions/index';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
let moment = require('moment');

const Dashboard = ({
    fetchNumberUsers,
    totalUsers,
    totalUsersInfo,
    fetchUsage,
    dailyUsage,
    year,
    searchYear,
    monthlyUsage,
    yearlyUsage
}) => {
    useEffect(() => {
        fetchNumberUsers();
        fetchUsage();
    }, []);
    const { register, handleSubmit } = useForm();

    const submitHandler = data => {
        searchYear(data.year);
        document.getElementById('year-form').reset();
    };

    const changeYear = event => {
        searchYear(event.target.value);
        document.getElementById('year-form').reset();
    };
    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 5;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(totalUsersInfo.length / pagination_division);
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
        <div className="mt-2 float-right mr-4">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    let users_length = totalUsersInfo.length;

    let users_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        users_holder.push(totalUsersInfo[counter]);
        counter++;
    }
    let recent_users = [];
    let counter2 = users_length - 1;
    let small_counter = 0;
    let users_holder2 = totalUsersInfo;
    while (counter2 > 0) {
        if (counter2 >= users_length) {
            break;
        }
        if (small_counter >= 5) {
            break;
        }

        recent_users.push(users_holder2[counter2]);
        counter2--;
        small_counter++;
    }

    const appUserTable = recent_users.map(total => (
        <tr className="unread">
            <td>
                <img
                    className="rounded-circle"
                    style={{ width: '40px' }}
                    src={avatar2}
                    alt="activity-user"
                />
            </td>
            <td>
                <h6>
                    {total.first_name} {total.last_name}
                </h6>
                {/* <h6 className="mb-1">{total.email}</h6>
                <p className="m-0">
                    
                </p> */}
            </td>
            <td>
                <h6 className="text-muted">
                    <i className="fa fa-circle text-c-green f-10 m-r-15" />
                    {total.date_created}
                </h6>
            </td>
            <td>
                {/* <a
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg2 text-white f-12">
                    Reject
                </a>
                <a
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg text-white f-12">
                    Approve
                </a> */}
                <p>{total.location}</p>
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
        table = document.getElementById('recent-table');
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
        <Aux>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h5 className="mb-1">
                                Total Number of Registered Users
                            </h5>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h2 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{' '}
                                        {totalUsers}
                                    </h2>
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

                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h5 className="mb-1">Rides Today</h5>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h2 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-calendar text-c-green f-30 m-r-5" />{' '}
                                        {dailyUsage}
                                    </h2>
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

                <Col md={12} xl={12}>
                    <Card className="Recent-Users">
                        <Card.Header className="remove-border">
                            <Card.Title as="h5">
                                Recent Registered Users
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <div>
                                <Table responsive hover id="recent-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th onClick={() => tableSort(1)}>
                                                Name{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(2)}>
                                                Date{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(3)}>
                                                Location{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{appUserTable}</tbody>
                                </Table>
                            </div>

                            {/* {Userpagination} */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Card.Title as="h5">
                                        Yearly Usage
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <div className="float-right">
                                        <Form
                                            onSubmit={handleSubmit(
                                                submitHandler
                                            )}
                                            id="year-form">
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Control
                                                    as="select"
                                                    name="access_level"
                                                    onChange={changeYear}>
                                                    <option>
                                                        {moment().format(
                                                            'YYYY'
                                                        )}
                                                    </option>
                                                    <option>2023</option>
                                                    <option>2022</option>
                                                    <option>2021</option>
                                                    <option>2020</option>
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                    <option>2014</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <BarDiscreteChart />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        users: state.admin.users,
        username: state.admin.username,
        totalUsers: state.admin.totalUsers,
        dailyUsage: state.admin.dailyUsage,
        totalUsersInfo: state.admin.app_users_data,
        year: state.admin.year,
        monthlyUsage: state.admin.monthlyUsage,
        yearlyUsage: state.admin.yearlyUsage
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchNumberUsers: () => {
            dispatch(fetchNumberUsers());
        },
        fetchUsage: () => {
            dispatch(fetchUsage());
        },
        searchYear: data => {
            dispatch(searchYear(data));
        }
    };
};

Dashboard.propTypes = {
    history: RPT.object,
    totalUsers: RPT.string,
    dailyUsage: RPT.string,
    year: RPT.string,
    users: RPT.array,
    fetchNumberUsers: RPT.func,
    fetchUsage: RPT.func,
    totalUsersInfo: RPT.array,
    monthlyUsage: RPT.any,
    yearlyUsage: RPT.any
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Dashboard));
