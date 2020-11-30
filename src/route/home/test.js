import React, { useEffect, useContext, useState } from 'react';
import storeContext from 'reducer/context';

export default function Routing() {
    const { app: { game, state }, setApp } = useContext(storeContext);

    const getHi = (message => {
        console.log('message', message)
    })
    const getState = (state => {
        setApp({ state })
    })

    useEffect(() => {
        game.add('hi', getHi)
        game.create({ options: 'ok' }).then(() => {
            game.onState(getState);
            game.send('move', 'left');
            game.getRooms(rooms => {
                console.log('rooms', rooms)
            })
        })
    }, []);

    useEffect(() => {
        console.log('state : ', state)
    }, [state]);

    return (
        <div>
            <h1>connected</h1>
        </div>
    )
}