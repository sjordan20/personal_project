const initialState = {
    group: []
}

const GET_GROUP = "GET_GROUP"

export function getGroup(groupObj) {
    return {
        type: GET_GROUP,
        payload: groupObj
    }
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_GROUP:
            return { ...state, group: action.payload }
        default:
            return state
    }

}
