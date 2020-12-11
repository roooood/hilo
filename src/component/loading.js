import React from 'react';
import logo from 'assets/img/logo.png';

export default function Loading(props) {
    return (
        <>
            <div className="loading">
                <img src={logo} />
                <div className="lds-roller">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
            <span>RFprovider</span>
        </>

    )
}