import {
    LOADING,
    LOGIN,
    FETCH_ADMIN,
    ADD_USER,
    FETCH_USERS,
    DELETE_USERS,
    LOGOUT,
    STOP_LOADING,
    AUTH,
    FETCH_NUMBER_USERS,
    FETCH_NUMBER_USERS_INFO,
    FETCH_USAGE,
    CHANGE_YEAR,
    ADD_TIP,
    DELETE_TIP,
    FETCH_TIPS,
    TIP_MESSAGE,
    ADD_RAT,
    DELETE_RAT,
    FETCH_REQUEST,
    FETCH_RAT,
    FETCH_RIDES
} from '../actions/types';
let moment = require('moment');
let INITIAL_STATE = {
    loading: false,
    username: '',
    message: '',
    error: false,
    isAuth: false,
    totalUsers: '0',
    dailyUsage: '0',
    allDays: [],
    monthlyUsage: 'pending',
    yearlyUsage: 'pending',
    year: '2020',
    tip_message: '',
    rides: [],
    users: [
        {
            id: '',
            username: '',
            access_level: '',
            first_name: '',
            last_name: ''
        }
    ],
    tips: [
        {
            id: '',
            tip_body: '',
            day_created: '',
            title: ''
        }
    ],
    app_users_data: [
        {
            email: 'holder@gmail.com',
            first_name: 'holder',
            last_name: 'holder',
            date_created: '21 20 2020'
        }
    ],
    rat: [
        {
            first_name: '',
            last_name: '',
            email: '',
            location: '',
            id: '',
            assigned: ''
        }
    ],
    request: [
        {
            feedback: '',
            completed: false,
            sender_name: '',
            sender_email: '',
            sender_location: '',
            body: '',
            assigned_to_name: '',
            assigned_to_email: '',
            assigned_to_id: '',
            id: '',
            date_sent: '',
            date_created: ''
        }
    ]
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case AUTH:
            return { ...state, isAuth: true };
        case LOGIN:
            let temp_name = action.name;
            return { ...state, username: temp_name };
        case CHANGE_YEAR:
            let temp_year = action.year;
            return { ...state, year: temp_year };
        case LOGOUT:
            return INITIAL_STATE;
        case FETCH_ADMIN:
            let temp_admin = action.student;
            return { ...state, student: temp_admin };
        case FETCH_REQUEST:
            let temp_request = action.request;
            return { ...state, request: temp_request };
        case FETCH_USERS:
            let temp_users = action.users;
            return { ...state, users: temp_users };
        case FETCH_RAT:
            let temp_rats = action.rat;
            return { ...state, rat: temp_rats };
        case FETCH_TIPS:
            let temp_tips = action.tips;
            return { ...state, tips: temp_tips };
        case FETCH_RIDES:
            let temp_rides = action.data;
            return { ...state, rides: temp_rides };
        case FETCH_USAGE:
            let temp_usage = action.current_day;
            let temp_all_usage = action.all_day;

            let monthlyUsage = 0;
            let monthCounter = 0;
            let yearCheck = moment().format('YYYY').toLowerCase();
            let monthCheck = moment().format('MMMM').toLowerCase();
            let yearlyUsage = 0;

            /* while (monthCounter < temp_all_usage.length) {
                if (
                    monthCheck === temp_all_usage[monthCounter].month &&
                    yearCheck === temp_all_usage[monthCounter].Year
                ) {
                    monthlyUsage += temp_all_usage[monthCounter].usage_count;
                }
                monthCounter++;
            }
            
            let yearCounter = 0;

            while (yearCounter < temp_all_usage.length) {
                if (yearCheck === temp_all_usage[yearCounter].Year) {
                    yearlyUsage += temp_all_usage[yearCounter].usage_count;
                }
                yearCounter++;
            }
 */
            return {
                ...state,
                dailyUsage: temp_usage,
                allDays: temp_all_usage,
                monthlyUsage: monthlyUsage.toString(),
                yearlyUsage: yearlyUsage.toString()
            };
        case FETCH_NUMBER_USERS:
            let temp_number_users = action.users;
            //let temp_users_data = action.users_data;

            return {
                ...state,
                totalUsers: temp_number_users.toString()
            };
        case FETCH_NUMBER_USERS_INFO:
            let temp_users_data = action.users_data;

            return {
                ...state,

                app_users_data: temp_users_data
            };
        case ADD_USER:
            let new_users = state.users.concat(action.data);

            return { ...state, users: new_users, loading: false };
        case ADD_RAT:
            let new_rat = state.rat.concat(action.data);

            return { ...state, rat: new_rat, loading: false };
        case TIP_MESSAGE:
            let new_message = action.data;

            return { ...state, tip_message: new_message, loading: false };
        case ADD_TIP:
            let new_tip = state.tips.concat(action.data);

            return { ...state, tips: new_tip, loading: false };
        case STOP_LOADING:
            return { ...state, loading: false };
        case DELETE_USERS:
            let new_user = state.users.filter(
                user => user.username !== action.data
            );

            return { ...state, users: new_user, loading: false };
        case DELETE_RAT:
            let new_rats = state.rat.filter(rats => rats.id !== action.data);

            return { ...state, rat: new_rats, loading: false };
        case DELETE_TIP:
            let new_tips = state.tips.filter(tip => tip.tip_id !== action.data);
            console.log(new_tips);
            return { ...state, tips: new_tips, loading: false };

        default:
            return state;
    }
}
