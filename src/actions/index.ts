export const updatePlan = (selectedPlan:any) => {
    return {
        type: 'PLAN_DETAILS',
        payload: selectedPlan
    }
};

export const addPlayground = (tempPG: any) => {
    return {
        type: 'ADD_TEMP_PG',
        payload: tempPG
    }
};

export const resetPlayground = () => {
    return {
        type: 'RESET_PG',
        payload: null
    }
};

export const deletePlayground = (tempPID: string) => {
    return {
        type: 'DELETE_PG',
        payload: tempPID
    }
};

export const saveFork = (forkData: any) => {
    return {
        type: 'SAVE_FORK',
        payload: forkData
    }
};

export const deleteFork = (forkID: any) => {
    return {
        type: 'DELETE_FORK',
        payload: forkID
    }
};