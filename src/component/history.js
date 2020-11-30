import React, { useState, useContext, useEffect } from 'react';
import { t } from 'locales';
import Table from 'component/table';
import storeContext from 'reducer/context';

export default function History(props) {
    const { app: { game } } = useContext(storeContext);
    const [data, setData] = useState([]);

    const _history = (data) => {
        data?.map(p => {
            p.style = { status: { color: (p.profit == 0 ? '#f25151' : '#4e9f4e') } }
            p.status = p.rofit ?? p.amount;

            return p;
        })
        setData(data)
    }
    useEffect(() => {
        game.add('history', _history);
    }, []);

    return (
        <Table
            header={{
                type: t('bet-type'),
                amount: t('amount'),
                status: t('win'),
            }}
            body={data}
        />
    )
}