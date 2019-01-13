export const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData())
});

const fetchData = () => dispatch => {
    const url = 'https://randomuser.me/api/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(response => response.results)
        .then(results => dispatch(fetchDataSuccess(results)));
};

const fetchDataSuccess = results => ({
    type: 'FETCH_DATA_SUCCESS',
    results
});
