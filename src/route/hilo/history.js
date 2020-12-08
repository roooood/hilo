import React, { useReducer, useContext, useEffect } from 'react';
import { t } from 'locales';
import Table from 'component/table';
import storeContext from 'reducer/context';

const initialState = [];
function reducer(state, history) {
    history?.map(p => {
        p.style = { profit: { color: (p.state == 0 ? '#f25151' : '#4e9f4e') } }
        p.status = p.profit ?? p.amount;
        return p;
    })
    return [...history, ...state]
}


export default function History(props) {
    const { app: { game } } = useContext(storeContext);
    const [data, setData] = useReducer(reducer, initialState);

    const _history = (history) => {
        setData(history)
    }
    useEffect(() => {
        game.add('history', _history);
    }, []);

    return (
        <Table
            header={{
                type: t('bet-type'),
                amount: t('amount'),
                profit: t('win'),
            }}
            body={data}
        />
    )
}