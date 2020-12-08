import React, { useContext } from 'react';
import storeContext from 'reducer/context';
import { toMoney } from 'library/helper';
import coin from 'assets/img/coin.png';

export default function Bet(props) {
    const { setting: { username, balance, currency } } = useContext(storeContext);
    return (
        <div className="flex center">
            <div className="user-dir">
                <div className="user-name" >
                    {username}
                </div>
                <div className="user-balance" >
                    <img src={coin} />
                    <span className="amount">
                        {toMoney(balance)} <b>{currency}</b>
                    </span>
                </div>
            </div>
        </div>
    )
}