import React, { useState, useContext, useEffect } from 'react';
import storeContext from 'reducer/context';
import { t } from 'locales';
import { num } from 'library/helper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import Button from 'component/button';

export default function Bet(props) {
    const { app: { game }, setSetting, setting: { minBet, changeBet, maxBet, balance, type, beted, started } } = useContext(storeContext);
    const [bet, setBet] = useState(0);

    useEffect(() => {
        game.add('beted', _beted);
        if (minBet)
            setBet(minBet)
    }, [minBet]);

    useEffect(() => {
        if (!started)
            setSetting({ beted: false })
    }, [started]);

    const _beted = (xtype) => {
        setSetting({ beted: xtype })
    }
    const setBeting = () => {
        if (type && bet && started)
            game.send('bet', { bet, type })
    }
    const inc = () => {
        let temp = bet + changeBet;
        if (temp < balance && temp < maxBet)
            setBet(temp)
    }
    const dec = () => {
        let temp = bet - changeBet;
        if (temp >= minBet)
            setBet(temp)
    }
    const min = () => {
        setBet(minBet)
    }
    const max = () => {
        setBet(balance >= maxBet ? maxBet : balance)
    }
    const div = () => {
        let temp = bet / 2;
        if (temp >= minBet && bet)
            setBet(temp)
    }
    const mul = () => {
        let temp = bet * 2;
        if (temp <= balance && temp <= maxBet && bet)
            setBet(temp)
    }
    const value = (val) => {
        if (val == '') {
            setBet(null);
            return;
        }
        val = num(val);
        if (val <= maxBet && val <= balance && val >= minBet)
            setBet(val)
        else {
            setBet(minBet)
        }
    }

    return (
        <div className="bet-dir">
            <div className="bet-input" >
                <IconButton onClick={dec} >
                    <RemoveCircleOutlineIcon className={"icon " + (bet == minBet ? '' : 'active')} />
                </IconButton>
                <input type="text" value={bet} onChange={(e) => value(e.target.value)} />
                <IconButton onClick={inc}>
                    <AddCircleOutlineIcon className={"icon " + (bet == maxBet ? '' : 'active')} />
                </IconButton>
            </div>
            <div className="flex" >
                <a className="bet-btn mini" onClick={min}>
                    <ArrowDownwardIcon className="icon" /> Min
                </a>
                <a className="bet-btn" onClick={div}>
                    &#247; 2
                </a>
                <a className="bet-btn mini" onClick={mul} >
                    &#215; 2
                </a>
                <a className="bet-btn" onClick={max} >
                    <ArrowUpwardIcon className="icon" /> Max
                </a>
            </div>
            <Button
                type='btn'
                color={(beted ? 'blue row no-hover' : type ? 'red row no-hover' : 'green no-hover')}
                onClick={setBeting} >
                {beted ? t('cancel') : t('bet')}
                {type &&
                    <span> ( {type} )</span>
                }
            </Button>
        </div>
    )
}