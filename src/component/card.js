import React, { useEffect, useContext, useReducer, useState } from 'react';
import { t } from 'locales';
import storeContext from 'reducer/context';
import LinearProgress from '@material-ui/core/LinearProgress';

const arr = ['K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2, 'A'];

const initialState = { flip: true, card: ['back2', 'back2'] };
function reducer(state, xcard) {
    let temp = state.flip ? [xcard, state.card[1]] : [state.card[0], xcard];
    return { flip: !state.flip, card: temp }
}

export default function Card(props) {
    const { app: { game }, setSetting } = useContext(storeContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [completed, setCompleted] = useState(0);
    const [started, setStarted] = useState(false);

    const _card = (c) => {
        dispatch(c.join(''));
    };

    useEffect(() => {
        game.add('card', _card);
        game.add('started', _started);
        game.add('ended', _ended);
    }, []);

    const _started = (time) => {
        setStarted(true)
        setSetting({ type: null, beted: false })
    }
    const _ended = () => {
        setStarted(false)
    }

    return (
        <div className="card-dir" >
            <div className="pri">
                {arr.map(i =>
                    <div key={i} className={"card mini _" + i + "c"} />
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