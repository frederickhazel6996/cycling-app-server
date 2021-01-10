import {
    LOGIN,
    LOADING,
    ADD_USER,
    FETCH_USERS,
    DELETE_USERS,
    AUTH,
    STOP_LOADING,
    LOGOUT,
    FETCH_NUMBER_USERS,
    FETCH_NUMBER_USERS_INFO,
    FETCH_USAGE,
    CHANGE_YEAR,
    ADD_TIP,
    FETCH_TIPS,
    DELETE_TIP,
    FETCH_REQUEST,
    TIP_MESSAGE,
    ADD_RAT,
    DELETE_RAT,
    UPDATE_RAT,
    FETCH_RIDES,
    FETCH_RAT
} from './types';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';
import setAuthorization from '../config/setAuthorization';
const moment = require('moment');
let url = 'api/admin/login';
let url2 = '/api/admin/add-user';
let url3 = '/api/admin/fetch-users';
let url4 = '/api/admin/delete-user';
let url5 = '/api/admin/update-user';
let url6 = '/api/user/total-users';
let url7 = '/api/user/rides/fetch-usage';
let url8 = '/api/tip/add-tip';
let url9 = '/api/tip/update-tip';
let url10 = '/api/tip/delete-tip';
let url11 = '/api/tip/fetch-tips';
let url12 = '/api/rat/register';
let url13 = '/api/rat/update-user';
let url14 = '/api/rat/delete-user';
let url15 = '/api/rat/fetch-users';
let url16 = '/api/rat/fetch-request';
let url17 = '/api/user/assistance/fetch-all-ride-requests';

let notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top'
    }
});
export const loading = () => {
    return {
        type: LOADING
    };
};
export const tipMessage = data => {
    return {
        type: TIP_MESSAGE,
        data
    };
};

export function signUserIn(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url,
                {
                    username: data.username,
                    password: data.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                const token = response.data.access_token;
                const name =
                    response.data.first_name + ' ' + response.data.last_name;

                localStorage.setItem('userToken', token);
                setAuthorization(token);

                dispatch({ type: LOGIN, name });
                dispatch({ type: AUTH });

                data.history.push('/dashboard');
                notyf.success('Sign In successful');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error.response.status === 500) {
                    notyf.error('login failed');
                } else {
                    notyf.error('login failed');
                }
                dispatch({ type: STOP_LOADING });
            });
    };
}
export function addUserUp(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url2,
                {
                    username: data.username,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    access_level: data.access_level
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: ADD_USER, data });
                notyf.success('User Added Successfully');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error(error.response.data);
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function updateUser(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url5,
                {
                    username: data.username,
                    password: data.password,
                    access_level: data.access_level,
                    last_name: data.last_name,
                    first_name: data.first_name,
                    id: data.id
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                notyf.success('User Updated');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('User Update Failed');
                    }

                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function fetchUsers() {
    return function (dispatch) {
        axios
            .get(
                url3,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_USERS, users: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}

export function fetchNumberUsers() {
    return function (dispatch) {
        axios
            .get(
                url6,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                let temp_user_number = response.data.length;
                let temp_user_data = response.data;

                dispatch({
                    type: FETCH_NUMBER_USERS,
                    users: temp_user_number
                });
                dispatch({
                    type: FETCH_NUMBER_USERS_INFO,

                    users_data: temp_user_data
                });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}
export function deleteUser(data) {
    return function (dispatch) {
        axios
            .get(
                url4,
                {
                    params: {
                        user_id: data
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: DELETE_USERS, data });
                notyf.success('User Deleted');
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Delete failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function logout(data) {
    return function (dispatch) {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        data.push('/sign');
    };
}
export function searchYear(data) {
    return function (dispatch) {
        dispatch({ type: CHANGE_YEAR, year: data });
    };
}

export function fetchUsage() {
    return function (dispatch) {
        axios
            .get(
                url7,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                let current_day = moment().format('MMMM Do YYYY').toLowerCase();

                let temp_data = response.data;

                let current_day_count = temp_data.filter(
                    temp => temp.day === current_day
                );
                if (current_day_count.length === 0) {
                    dispatch({
                        type: FETCH_USAGE,
                        current_day: 0,
                        all_day: temp_data
                    });
                } else {
                    dispatch({
                        type: FETCH_USAGE,
                        current_day: current_day_count[0].usage_count.toString(),
                        all_day: temp_data
                    });
                }
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    }
                }
            });
    };
}
export function fetchRides() {
    return function (dispatch) {
        axios
            .get(
                url17,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                let tempData = response.data;
                dispatch({ type: FETCH_RIDES, data: tempData });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    }
                }
            });
    };
}

export function addTip(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url8,
                {
                    tip_body: data.tip_body,
                    tip_title: data.tip_title
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: ADD_TIP, data });
                notyf.success('Tip Added Successfully');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Error Adding Tip');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function addRat(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url12,
                {
                    email: data.email,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    location: data.location
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: ADD_RAT, data });
                notyf.success(' Added Successfully');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Error Adding Member');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}

export function deleteTip(data) {
    return function (dispatch) {
        axios
            .get(
                url10,
                {
                    params: {
                        tip_id: data
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: DELETE_TIP, data });
                notyf.success('Tip Deleted');
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Delete failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function deleteRat(data) {
    return function (dispatch) {
        axios
            .get(
                url14,
                {
                    params: {
                        user_id: data
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: DELETE_RAT, data });
                notyf.success('Member Deleted');
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Delete failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}

export function fetchTips() {
    return function (dispatch) {
        axios
            .get(
                url11,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_TIPS, tips: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}

export function fetchRat() {
    return function (dispatch) {
        axios
            .get(
                url15,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_RAT, rat: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}
export function fetchRequest() {
    return function (dispatch) {
        axios
            .get(
                url16,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_REQUEST, request: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}

export function updateTip(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url9,
                {
                    tip_id: data.tip_id,
                    tip_body: data.tip_body,
                    tip_title: data.tip_title
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                notyf.success('Tip Updated');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('User Update Failed');
                    }

                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function updateRat(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url13,
                {
                    id: data.id,
                    email: data.email,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    location: data.location
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                notyf.success('Member Updated');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('User Update Failed');
                    }

                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
