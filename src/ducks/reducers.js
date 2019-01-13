export function user(state = null, action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return action.user;
        default:
            return state;
    }
}
