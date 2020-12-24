import React, { useEffect, useContext, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import storeContext from 'reducer/context';
import { userInfo } from 'library/user';
import i18n, { t } from 'locales';
import Loader from 'route/hilo/hilo';
import Loading from 'component/loading';
import Notify from 'component/notify';
import Game from 'library/game';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function Routing() {
    const { setting, setSetting, setApp } = useContext(storeContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getState = (state => {
        setSetting(state)
    })

    const connect = (data, env) => {
        let game = new Game(env);
        setApp({ game });
        game.connect().then(() => {
            game.joinChannel(data).then(() => {
                game.onState(getState);
                game.add('setting', getState);
                setLoading(false);
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
                let env = window.location.pathname.split('/')[1];
                connect({ token: data.token, channel: data.ref }, env);
                i18n.changeLanguage(data.lang);
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
                :
                <Router>
                    <Notify />
                    <Route render={({ location }) =>
                        <Switch location={location}>
                            {/* <Route path='/' exact component={Dashboard} /> */}
                            <Route path='/hilo' exact component={Loader} />
                        </Switch>
                    } />
                </Router>
            }
        </div>
    )
}