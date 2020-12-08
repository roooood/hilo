import React, { useContext, useEffect } from 'react';
import { t } from 'locales';
import Button from 'route/hilo/button';
import storeContext from 'reducer/context';

export default function Status(props) {
    const { setting: { ratio, type, started, beted }, setSetting } = useContext(storeContext);
    useEffect(() => {
        if (!started) {
            setSetting({ type: false })
        }
    }, [started]);

    const setType = (xtype) => {
        if (started && !beted)
            setSetting({ type: xtype == type ? null : xtype })
    }
    return (
        <div className="status-dir" >
            <div className="bg btn-actions" style={{ flex: .45 }}>
                <Button disable={type ? type != 'a' : !started} type='btn' color="blue" onClick={() => setType('a')}>
                    A
                    <span>{ratio?.['a']}X</span>
                </Button>
                <Button disable={type ? type != 'red' : !started} type='btn' color="red" onClick={() => setType('red')}>
                    {t('red')}
                    <span>{ratio?.['red']}X</span>
                </Button>
                <Button disable={type ? type != 'black' : !started} type='btn' color="black" onClick={() => setType('black')} >
                    {t('black')}
                    <span>{ratio?.['black']}X</span>
                </Button>
                <Button disable={type ? type != '2-9' : !started} type='btn' onClick={() => setType('2-9')} >
                    2-9
                     <span>{ratio?.['2-9']}X</span>
                </Button>
                <Button disable={type ? type != 'jqka' : !started} type='btn' onClick={() => setType('jqka')} >
                    j q k a
                     <span>{ratio?.['jqka']}X</span>
                </Button>
                <Button disable={type ? type != 'ka' : !started} type='btn' onClick={() => setType('ka')} >
                    k a
                     <span>{ratio?.['ka']}X</span>
                </Button>
                <Button disable={type ? type != 'jq' : !started} type='btn' onClick={() => setType('jq')} >
                    j q
                    <span>{ratio?.['jq']}X</span>
                </Button>
            </div>
            <div className="ml flex col" style={{ flex: .55 }}>
                <div className="mb bg center col" style={{ flex: .35 }}>
                    <Button disable={(type || ratio?.['hi'] == 0) ? type != 'hi' : !started} type="up" onClick={() => ratio?.['hi'] == 0 ? null : setType('hi')}>
                        Hi
                    <span>{ratio?.['hi']}x</span>
                    </Button>
                </div>
                <div className="mb bg center justify-center col" style={{ flex: .3 }}>
                    <Button disable={type ? type != '=' : !started} type="equal" onClick={() => setType('=')}>
                        <span>{ratio?.['=']}x</span>
                    </Button>
                </div>
                <div className="bg center col" style={{ flex: .35 }}>
                    <Button disable={(type || ratio?.['lo'] == 0) ? type != 'lo' : !started} type="down" onClick={() => ratio?.['lo'] == 0 ? null : setType('lo')} >
                        Lo
                     <span>{ratio?.['lo']}x</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}