import React, { useContext } from 'react';
import { t } from 'locales';
import Table from 'component/table';
import storeContext from 'reducer/context';

export default function Live(props) {
    const { setting: { players } } = useContext(storeContext);
    players?.map(p => {
        if (p.status != null) {
            p.style = { status: { color: (p.status == 0 ? '#f25151' : '#4e9f4e') } }
        }
        return p;
    })
    return (
        <Table
            header={{
                user: t('player'),
                type: t('bet-type'),
                bet: t('amount'),
                status: t('win'),
            }}
            body={players ?? []}
        />
    )
}