import React, { useEffect, useContext, useReducer, useState } from 'react';
import { t } from 'locales';
import storeContext from 'reducer/context';

const initialState = { flip: true, card: ['back2', 'back2'] };
function reducer(state, xcard) {
    let temp = state.flip ? [xcard, state.card[1]] : [state.card[0], xcard];
    return { flip: !state.flip, card: temp }
}

export default function Card(props) {
    const { setting: { started, card, games } } = useContext(storeContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (card)
            dispatch(card);
    }, [card]);

    return (
        <div className="card-dir" >
            <div className="pri">
                {games?.map(game =>
                    <div key={game.id} className={"card mini _" + game.card} />
                )}
            </div>
            <div className="card-status">
                <div className={"card big " + (state.flip ? 'flipped' : '')}>
                    <div className={"card  _" + state.card[0]} />
                    <div className={"card back _" + state.card[1]} />
                </div>
            </div>
            <div className="card-timer">
                <div className={"progress " + (started ? 'progress-moved' : '')}>
                    <div className="progress-bar" >
                    </div>
                </div>
            </div>
        </div>
    )
}