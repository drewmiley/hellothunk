export function fetchDataSuccess(state = null, action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return action.results;
        default:
            return state;
    }
}
