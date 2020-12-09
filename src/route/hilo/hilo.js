import React, { useState } from 'react';
import { t } from 'locales';
import 'assets/css/hilo.css';

import Bet from 'route/hilo/bet';
import Status from 'route/hilo/status';
import Card from 'route/hilo/card';
import History from 'route/hilo/history';
import Live from 'route/hilo/live';
import Tabs from 'route/hilo/tabs';
import User from 'route/hilo/user';
import Chat from 'component/chat';


export default function Loader(props) {

    return (
        <>
            <div className="left bg" >
                <Card />
            </div>
            <div className="middle col">
                <div className="mb" style={{ flex: .7 }}>
                    <Status />
                </div>
                <div className="bg" style={{ flex: .3 }}>
                    <Bet />
                </div>
            </div>
            <div className="right col" >
                <div className="mb bg" style={{ flex: .1 }}>
                    <User />
                </div>
                <div className="bg" style={{ flex: .9 }}>
                    <Tabs
                        header={[t('live'), t('my-bet'), t('chat')]}
                        body={[<Live />, <History />, <Chat />]}
                    />
                </div>
            </div>
        </>
    )
}