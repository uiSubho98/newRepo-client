const initialState = {};

const playgroundReducer = (state = initialState, action) => {
    let newData = {};
    if (action.payload !== undefined) {
        newData[`${action.payload.pid}`] = action.payload;
    }
    // Check for state length and remove oldest one
    if (Object.keys(state).length > 9) {
        Object.keys(state).forEach((item, idx) => {
            if (idx === 0) {
                delete state[item];
            }
        })
    }
    // Check tempPID from payload
    if (action.type === 'DELETE_PG') {
        const inPID = action.payload;
        Object.keys(state).forEach((key, idx) => {
            if (state[key]['pid'] === inPID) {
                delete state[key];
            }
        });
    }

    switch (action.type) {
        case 'ADD_TEMP_PG':
            return state = {...state, ...newData};
        case 'RESET_PG':
            return state = {};
        case 'DELETE_PG':
            return state = {...state};
        default:
            return state;
    }
}

export default playgroundReducer;