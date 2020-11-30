import React from 'react';

export default function Button({ type, children, color, onClick, disable }) {

    return (
        <>
            {
                {
                    'up':
                        <div className={"arrow pulse" + (disable ? ' disable' : '')} onClick={onClick}>
                            <div className="arrow-text btn-text">{children}</div>
                            <div className="diff-arrow"></div>
                        </div>,
                    'down':
                        <div className={"arrow x pulse" + (disable ? ' disable' : '')} onClick={onClick}>
                            <div className="arrow-text x btn-text">{children}</div>
                            <div className="diff-arrow x"></div>
                        </div>,
                    'equal':
                        <div className={"burger pulse" + (disable ? ' disable' : '')} onClick={onClick}></div>,
                    'btn':
                        <button className={"btn pulse " + (color ?? '') + (disable ? ' disable' : '')} onClick={onClick}>{children}</button>,
                }[type]
            }
        </>
    )
}