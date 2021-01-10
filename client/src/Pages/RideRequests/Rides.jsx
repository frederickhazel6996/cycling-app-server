import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Form } from 'react-bootstrap';
import Geocode from 'react-geocode';
import Aux from '../../hoc/_Aux';
import DEMO from '../../store/constant';
import BarDiscreteChart from '../../Demo/Charts/Nvd3Chart/BarDiscreteChart';
import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { fetchRides } from '../../actions/index';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
let moment = require('moment');
//require('dotenv').config();

const Dashboard = ({ fetchRides, totalRidesInfo }) => {
    useEffect(() => {
        fetchRides();
    }, []);

    const { register, handleSubmit } = useForm();

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 10;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(totalRidesInfo.length / pagination_division);
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

    let users_length = totalRidesInfo.length;

    let users_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        users_holder.push(totalRidesInfo[counter]);
        counter++;
    }
    let recent_users = [];
    let counter2 = 5;
    let users_holder2 = totalRidesInfo;
    while (counter2 > 0) {
        if (counter2 >= users_length) {
            break;
        }
        recent_users.push(users_holder2[counter2]);
        counter2--;
    }

    const appUserTable = users_holder.map(total => (
        <tr className="unread" key={total.id}>
            <td>
                <img
                    className="rounded-circle"
                    style={{ width: '40px' }}
                    src={avatar2}
                    alt="activity-user"
                />
            </td>
            <td>
                {total.email === null ? (
                    <h6 className="mb-1"> n/a</h6>
                ) : (
                    <h6 className="mb-1"> {total.email}</h6>
                )}
            </td>
            <td>
                {total.name === null ? (
                    <h6 className="mb-1"> n/a</h6>
                ) : (
                    <h6 className="mb-1"> {total.name}</h6>
                )}
            </td>
            <td>
                {total.location_name === null ? (
                    <h6 className="mb-1"> n/a</h6>
                ) : (
                    <h6 className="mb-1"> {total.location_name}</h6>
                )}
            </td>
            <td>
                {total.destination_name === null ? (
                    <h6 className="mb-1"> n/a</h6>
                ) : (
                    <h6 className="mb-1"> {total.destination_name}</h6>
                )}
            </td>
            <td>
                <p>{total.date}</p>
            </td>
            <td>
                <p>{total.time}</p>
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
        table = document.getElementById('users-table');
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
                <Col xl={4}></Col>
                <Col md={12} xl={12}>
                    <Card className="Recent-Users">
                        <Card.Header className="remove-border">
                            <Card.Title as="h5">All Rides</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <div>
                                <Table responsive hover id="users-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th onClick={() => tableSort(1)}>
                                                Email{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(2)}>
                                                Name{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(3)}>
                                                Request Location{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(4)}>
                                                Request Destination{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(5)}>
                                                Date{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                            <th onClick={() => tableSort(6)}>
                                                Time{' '}
                                                <span className="ml-5">
                                                    <i className="fas fa-sort"></i>
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{appUserTable}</tbody>
                                </Table>
                            </div>
                            {Userpagination}
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

        totalRidesInfo: state.admin.rides
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchRides: () => {
            dispatch(fetchRides());
        }
    };
};

Dashboard.propTypes = {
    history: RPT.object,
    totalRidesInfo: RPT.array,
    fetchRides: RPT.func
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Dashboard));
