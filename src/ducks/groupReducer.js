import axios from 'axios'

const initialState = {
    groups: []
}

const GET_GROUP = "GET_GROUP"

export function getGroup() {
    // console.log(action.payload)
    let action = {
        type: GET_GROUP,
        payload: axios.get(`/api/group/`)
    }
    return action
}

export default function groupReducer(state = initialState, action) {
    // console.log(action.payload)

    switch (action.type) {
        case GET_GROUP:
            return { ...state, groups: action.payload }
        default:
            return state
    }

}
