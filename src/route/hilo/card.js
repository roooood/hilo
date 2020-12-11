import React, { useEffect, useContext, useReducer, useRef } from 'react';
import { t } from 'locales';
import storeContext from 'reducer/context';
import play from 'library/sound';
import Countdown from 'component/countdown';

const initialState = { flip: true, card: ['back2', 'back2'] };
function reducer(state, xcard) {
    let temp = state.flip ? [xcard, state.card[1]] : [state.card[0], xcard];
    return { flip: !state.flip, card: temp }
}

export default function Card(props) {
    const { setting: { started, card, games, mobile } } = useContext(storeContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const counter = useRef(null);

    useEffect(() => {
        if (card) {
            dispatch(card);
            play('flip')
        }
    }, [card]);
    useEffect(() => {
        if (started) {
            counter.current.start(10)
        }
        else {
            counter.current.stop()
        }
    }, [started]);

    return (
        <div className="card-dir" >
            <div className="pri">
                {games?.map(game =>
                    <div key={game.id} className={"card mini _" + game.card} />
                )}
            </div>
            <div className={'xcard'}>
                <div className="card-status">
                    <div className={"card big " + (state.flip ? 'flipped' : '')}>
                        <div className={"card  _" + state.card[0]} />
                        <div className={"card back _" + state.card[1]} />
                    </div>
                </div>
                <div className="card-timer">
                    <div className="timer" >
                        <Countdown ref={counter} />
                    </div>
                    <div className={"progress " + (started ? 'progress-moved' : '')}>
                        <div className="progress-bar" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}