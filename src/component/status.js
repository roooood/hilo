import React, { useContext, useEffect } from 'react';
import { t } from 'locales';
import Button from 'component/button';
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
                <Button disable={type ? type != 'a' : false} type='btn' color="blue" onClick={() => setType('a')}>
                    A
                    <span>{ratio?.['a']}X</span>
                </Button>
                <Button disable={type ? type != 'red' : false} type='btn' color="red" onClick={() => setType('red')}>
                    {t('red')}
                    <span>{ratio?.['red']}X</span>
                </Button>
                <Button disable={type ? type != 'black' : false} type='btn' color="black" onClick={() => setType('black')} >
                    {t('black')}
                    <span>{ratio?.['black']}X</span>
                </Button>
                <Button disable={type ? type != '2-9' : false} type='btn' onClick={() => setType('2-9')} >
                    2-9
                     <span>{ratio?.['2-9']}X</span>
                </Button>
                <Button disable={type ? type != 'jqka' : false} type='btn' onClick={() => setType('jqka')} >
                    j q k a
                     <span>{ratio?.['jqka']}X</span>
                </Button>
                <Button disable={type ? type != 'ka' : false} type='btn' onClick={() => setType('ka')} >
                    k a
                     <span>{ratio?.['ka']}X</span>
                </Button>
                <Button disable={type ? type != 'jq' : false} type='btn' onClick={() => setType('jq')} >
                    j q
                    <span>{ratio?.['jq']}X</span>
                </Button>
            </div>
            <div className="ml flex col" style={{ flex: .55 }}>
                <div className="mb bg center col" style={{ flex: .4 }}>
                    50%
                    <Button disable={(type || ratio?.['hi'] == 0) ? type != 'hi' : false} type="up" onClick={() => ratio?.['hi'] == 0 ? null : setType('hi')}>Hi</Button>
                    {ratio?.['hi']}x
                </div>
                <div className="mb bg center" style={{ flex: .2 }}>
                    8%
                    <Button disable={type ? type != '=' : false} type="equal" onClick={() => setType('=')}>=</Button>
                    {ratio?.['=']}x
                </div>
                <div className="bg center col" style={{ flex: .4 }}>
                    50%
                    <Button disable={(type || ratio?.['lo'] == 0) ? type != 'lo' : false} type="down" onClick={() => ratio?.['lo'] == 0 ? null : setType('lo')} >Lo</Button>
                    {ratio?.['lo']}x
                </div>
            </div>
        </div>
    )
}