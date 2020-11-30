import React, { useEffect, useContext, useState } from 'react';
import storeContext from 'reducer/context';
import Game from 'library/game';
import Test from './test';
import Button from 'component/button';

export default function Routing() {
    const { setApp } = useContext(storeContext);
    const [connect, setConnect] = useState(false);

    useEffect(() => {
        let game = new Game('demo');
        game.connect().then(() => {
            setApp({ game })
            setConnect(true);
        }).catch(e => {
            console.log('error :', e)
        });

    }, []);

    return (
        <>

        </>
    )
}