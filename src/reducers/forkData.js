const initialState = {};

const forkDataReducer = (state = initialState, action) => {
    let newData = {};
    if (action.payload !== undefined) {
        newData[`${action.payload.pid}`] = action.payload;
    }

    // Check tempPID from payload
    if (action.type === 'DELETE_FORK') {
        const inPID = action.payload;
        Object.keys(state).forEach((key, idx) => {
            if (state[key]['pid'] === inPID) {
                delete state[key];
            }
        });
    }

    switch (action.type) {
        case 'SAVE_FORK':
            return state = {...state, ...newData};
        case 'DELETE_FORK':
            return state = {...state};
        default:
            return state;
    }
}

export default forkDataReducer;