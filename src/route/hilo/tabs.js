import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

export default function Button({ header, body }) {
    const [index, setIndex] = useState(0);
    return (
        <>
            <div className="tabs">
                {header.map((item, i) =>
                    <div
                        key={i}
                        className={"tab " + (i == index ? 'active' : '')}
                        onClick={() => setIndex(i)}
                    >
                        {item}
                    </div>
                )}
                <span className={"glider active-" + (1 + index)}></span>
            </div>
            <SwipeableViews
                style={{ height: '90%' }}
                containerStyle={{ height: '100%' }}
                onSwitching={(i) => setIndex(i)}
                index={index}
            >
                {body.map((item, i) =>
                    <div key={i} style={{ height: '100%' }}>{item}</div>
                )}
            </SwipeableViews>
        </>
    )
}
