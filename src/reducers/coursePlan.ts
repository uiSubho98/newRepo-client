const initialState = {
    planMode: '',
    courseName: '',
    terms: '',
    planId: '',
    planPrice: '',
    symbol: 'USD',
    selectedSlot: '',
    userTimeZone: ''
}

const coursePlanReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'PLAN_DETAILS':
            return state = action.payload;
        default:
            return state;
    }
}

export default coursePlanReducer;