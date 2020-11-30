import React, { useEffect, useContext, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import storeContext from 'reducer/context';
import { userInfo } from 'library/user';
import { t } from 'locales';
import Loader from 'component/loader';
import Loading from 'component/loading';
import Game from 'library/game';

export default function Routing() {
    const { setting, setSetting, setApp } = useContext(storeContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getState = (state => {
        setSetting(state)
    })

    const connect = (token) => {
        let game = new Game('hilo');
        setApp({ game });
        game.connect().then(() => {
            game.create({ token }).then(() => {
                game.onState(getState);
                game.add('setting', getState);
            }).catch(e => {
                setError('auth-error')
            });
        }).catch(e => {
            setError('auth-error')
        });
    }

    useEffect(() => {
        userInfo()
            .then(data => {
                connect(data.token);
                setLoading(false);
                setSetting(data);
            })
            .catch(e => {
                setError(e)
            })
    }, []);

    return (
        <div className="container" >
            {(loading || error)
                ?
                <div className="to-center">
                    {error
                        ?
                        <Alert severity="error">
                            <AlertTitle>{t('error')}</AlertTitle>
                            {t(error)}
                        </Alert>
                        : <Loading />
                    }
                </div>
                : <Loader />
            }
        </div>
    )
}