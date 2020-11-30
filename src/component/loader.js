import React, { useState } from 'react';
import { t } from 'locales';

import Bet from 'component/bet';
import Status from 'component/status';
import Card from 'component/card';
import History from 'component/history';
import Live from 'component/live';
import Chat from 'component/chat';
import Tabs from 'component/tabs';
import User from 'component/user';


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