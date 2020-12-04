import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export default forwardRef((props, ref) => {
    const [counter, setCounter] = useState(0);

    useImperativeHandle(ref, (time) => ({
        start(time) {
            setCounter(time);
        },
        stop() {
            setCounter(0);
        }
    }));

    useEffect(() => {
        if (counter == 0) {
            props?.onDone?.();
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        counter
            ? <span > {counter}</span>
            : null
    );
})