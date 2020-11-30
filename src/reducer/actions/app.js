import createPersistedReducer from '../persist';

export default createPersistedReducer('app');

export const initialState = {
    game: null,
    state: {}
};

export function reducer(state, action) {
    if (action == null) {
        return initialState;
    }
    else {
        return { ...state, ...action }
    }
}