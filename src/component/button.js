import React from 'react';
import play from 'library/sound';

export default function Button({ type, children, color, onClick, disable }) {
    const click = () => {
        play('click')
        onClick();
    }
    return (
        <>
            {
                {
                    'up':
                        <div className={"arrow pulse" + (disable ? ' disable' : '')} onClick={click}>
                            <div className="arrow-text btn-text">{children}</div>
                            <div className="diff-arrow"></div>
                        </div>,
                    'down':
                        <div className={"arrow x pulse" + (disable ? ' disable' : '')} onClick={click}>
                            <div className="arrow-text x btn-text">{children}</div>
                            <div className="diff-arrow x"></div>
                        </div>,
                    'equal':
                        <div className={"burger pulse" + (disable ? ' disable' : '')} onClick={click}></div>,
                    'btn':
                        <button className={"btn pulse " + (color ?? '') + (disable ? ' disable' : '')} onClick={click}>{children}</button>,
                }[type]
            }
        </>
    )
}