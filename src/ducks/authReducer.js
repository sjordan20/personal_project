import axios from "axios";

const initialState = {
    user: {},
    loading: false,
    error: false,
    errorMessage: ''
};

const CHECK_USER = "CHECK_USER"
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = 'LOGOUT'

export function checkUser() {
    let action = {
        type: CHECK_USER,
        payload: axios.get('/api/check')
    }
    return action
}

export function register(username, password) {
    let action = {
        type: REGISTER,
        payload: axios.post(`/api/register`, { username, password })
    };
    return action;
}

export function login(username, password) {
    let action = {
        type: LOGIN,
        payload: axios.post('/api/login', { username, password })
    }
    return action
}

export function logout() {
    let action = {
        type: LOGOUT,
        payload: axios.post('/api/logout')
    }
    return action
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_USER + '_PENDING':
            return { ...state, loading: true, error: false }
        case CHECK_USER + '_FULFILLED':
            return { ...state, loading: false, user: action.payload.data }
        case CHECK_USER + '_REJECTED':
            return { ...state, loading: false }
        case LOGIN + '_PENDING':
            return { ...state, loading: true, error: false }
        case LOGIN + '_FULFILLED':
            return { ...state, loading: false, user: action.payload.data }
        case LOGIN + '_REJECTED':
            return { ...state, loading: false, error: true }
        case LOGOUT + '_PENDING':
            return { ...state, loading: true, error: false }
        case LOGOUT + '_FULFILLED':
            return { ...state, ...initialState }
        case LOGOUT + '_REJECTED':
            return { ...state, loading: false, error: true }
        case REGISTER + '_PENDING':
            return { ...state, loading: true, error: false }
        case REGISTER + '_FULFILLED':
            return { ...state, loading: false, user: action.payload.data }
        case REGISTER + '_REJECTED':
            return { ...state, loading: false, error: true }
        default:
            return state;
    }
}
