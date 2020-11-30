import createPersistedReducer from '../persist';

export default createPersistedReducer('setting');

export const initialState = {

};

export function reducer(state, action) {
    if (action == null) {
        return initialState;
    }
    else {
        return { ...state, ...action }
    }
}