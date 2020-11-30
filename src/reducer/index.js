import React from 'react';
import storeContext from 'reducer/context';

import settingReducer, { reducer as _setSetting, initialState as _setting } from 'reducer/actions/setting';
import appReducer, { reducer as _setApp, initialState as _app } from 'reducer/actions/app';

export default function AppStore(props) {
    const [setting, setSetting] = settingReducer(_setSetting, _setting);
    const [app, setApp] = appReducer(_setApp, _app);

    return (
        <storeContext.Provider value={{
            setting, setSetting,
            app, setApp
        }}>
            {props.children}
        </storeContext.Provider>
    );
}
