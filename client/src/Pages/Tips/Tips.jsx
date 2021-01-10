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
import {
    addTip,
    deleteTip,
    updateTip,
    fetchTips,
    tipMessage
} from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import '../Users/users.scss';
import { set } from 'd3';

const Tips = ({
    loading,
    addTip,
    history,
    tips,
    fetchTips,
    deleteTip,
    updateTip,
    tipMessage,
    tip_message
}) => {
    useEffect(() => {
        fetchTips();
    }, []);

    const [delete_id, setdelete_id] = useState('');

    const [update_id, setupdate_id] = useState('');
    const [update_value, setupdate_value] = useState('');
    const [text, setText] = useState('');
    var [text2, setText2] = useState('');
    var [text3, settext3] = useState('');
    var [text4, settext4] = useState('');
    const [tip, settip] = useState('');
    const [tipbody, settipbody] = useState('');
    const [updatebody, setupdatebody] = useState('');
    function handleOnEnter(text) {}

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 12;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(tips.length / pagination_division);
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

    const handleTipSubmit = e => {
        addTip({
            tip_body: text,
            tip_title: text3
        });

        handleClose();
    };

    const handleTipUpdate = e => {
        if (text2 === '') {
            text2 = updatebody;
        }
        if (text4 === '') {
            text4 = update_value;
        }

        updateTip({
            tip_body: text2,
            tip_title: text4,
            tip_id: update_id
        });
        setupdate(false);
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

    let users_length = tips.length;

    let tips_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        tips_holder.push(tips[counter]);
        counter++;
    }

    let temp_tips = tips_holder.map(tip => (
        <tr key={tip.tip_id}>
            <td
                style={{ width: 400 }}
                className="view-button"
                onClick={() => {
                    settip(tip.tip_title);
                    settipbody(tip.tip_body);
                    handleViewShow();
                }}>
                {tip.tip_title}
            </td>
            <td>
                {' '}
                <div
                    className="update-icon"
                    onClick={() => {
                        setupdate_id(tip.tip_id);
                        setupdate_value(tip.tip_title);
                        setupdatebody(tip.tip_body);
                        handleUpdateShow();
                    }}>
                    Edit
                </div>
            </td>
            <td
                className="delete-user-cross"
                onClick={() => {
                    setdelete_id(tip.tip_id);
                    handleDeleteShow();
                }}>
                Delete
            </td>
        </tr>
    ));

    let add_modal = (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Enter Tip Body</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicid">
                    <Form.Group controlId="formBasicids">
                        <Form.Label>Tip Title</Form.Label>
                        <InputEmoji
                            value={text3}
                            onChange={settext3}
                            cleanOnEnter
                            name="tip"
                            onEnter={handleOnEnter}
                            placeholder="Enter Your Tip Title"
                        />
                    </Form.Group>
                    <Form.Label>Tip Body</Form.Label>

                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        name="tip"
                        onEnter={handleOnEnter}
                        placeholder="Enter Your Tip here"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    onClick={handleTipSubmit}
                    variant="success"
                    className="add-user-button mb-5">
                    {loading && (
                        <Spinner animation="border" variant="light" size="sm" />
                    )}
                    Add Tip
                </Button>
            </Modal.Footer>
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
                <Modal.Title>{tip}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {' '}
                <div className="text-center tip-text mt-3">
                    <Row>
                        <Col xl={12}>{tipbody}</Col>
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
                    Do you want to delete Tip{' '}
                    <span className="delete-user">{delete_id}</span>
                </div>
            </Modal.Header>

            <div className="text-center mt-3">This Action is permanent</div>
            <div className="text-center mt-3 pb-3 ">
                <Button
                    className="btn btn-danger"
                    onClick={() => {
                        setdelete_modal(false);
                        deleteTip(delete_id);
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
            keyboard={false}
            centered>
            <Modal.Header closeButton>
                <div className="modal-title w-100">
                    {' '}
                    <h3 className="  mt-5">Edit Tip {update_id}</h3>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formTip">
                    <Form.Label>Tip Title</Form.Label>
                    <InputEmoji
                        value={text4}
                        onChange={settext4}
                        cleanOnEnter
                        name="tip"
                        onEnter={handleOnEnter}
                        placeholder={update_value}
                    />
                </Form.Group>
                <Form.Group controlId="formTip">
                    <Form.Label>Tip Body</Form.Label>
                    <InputEmoji
                        value={text2}
                        onChange={setText2}
                        cleanOnEnter
                        name="tip"
                        onEnter={handleOnEnter}
                        placeholder={updatebody}
                    />
                </Form.Group>
            </Modal.Body>{' '}
            <Modal.Footer>
                <Button
                    type="submit"
                    onClick={handleTipUpdate}
                    variant="success"
                    className="add-user-button mb-5">
                    {loading && (
                        <Spinner animation="border" variant="light" size="sm" />
                    )}
                    Update Tip
                </Button>
            </Modal.Footer>
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
                                                Tips Management System
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
                                Add New Tip
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
                                Add New Tip
                            </button>
                        </Col>
  */}{' '}
                    </Row>
                    <Row>
                        {' '}
                        <Col
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 8 }}
                            lg={{ span: 6 }}
                            xl={{ span: 6 }}>
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
                                                    <th>Tip</th>
                                                    <th
                                                        colSpan="2"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}>
                                                        Actions
                                                    </th>
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
        tips: state.admin.tips,
        tip_message: state.admin.tip_message
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        addTip: data => {
            dispatch(addTip(data));
        },
        fetchTips: () => {
            dispatch(fetchTips());
        },
        deleteTip: data => {
            dispatch(deleteTip(data));
        },
        updateTip: data => {
            dispatch(updateTip(data));
        },
        tipMessage: data => {
            dispatch(tipMessage(data));
        }
    };
};

Tips.propTypes = {
    history: RPT.object,
    addTip: RPT.func,
    fetchTips: RPT.func,
    deleteTip: RPT.func,
    updateTip: RPT.func,
    tips: RPT.array,
    tipMessage: RPT.func,
    tip_message: RPT.string
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Tips));
