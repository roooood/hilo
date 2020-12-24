import React, { useState, useContext, useRef, useEffect } from 'react';
import MeteorEmoji from './meteorEmoji';
import storeContext from 'reducer/context';
import Countdown from 'component/countdown';
import './chat.css';

export default function Chat(props) {
    const { app: { game }, setting: { message, id } } = useContext(storeContext);
    const counter = useRef(null);
    const scroll = useRef(null);
    const input = useRef(null);
    const [timer, setTimer] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (timer || input.current.value == 0) return;
        game.send('chat', input.current.value);
        input.current.value = '';
        setTimer(true);
        counter.current.start(10)
    }
    const endTimer = () => {
        setTimer(false);
    }
    useEffect(() => {
        scroll.current.scrollTo({
            top: 10000,
            behavior: 'smooth',
        })
    }, [message])
    useEffect(() => {
        new MeteorEmoji();
    }, [])
    return (
        <div className="msger">
            <div className="msger-chat" ref={scroll}>
                {message?.map((msg, i) => (
                    <div className={"msg " + (msg.user_id == id ? 'right' : 'left') + "-msg"} key={i}>
                        <div className="msg-bubble">
                            {msg.user_id != id &&
                                <div className="msg-info">
                                    <div className="msg-info-name">{msg.username}</div>
                                    <div className="msg-info-time"></div>
                                </div>
                            }
                            <div className="msg-text">{msg.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <form className="msger-inputarea" onSubmit={onSubmit}>
                <input
                    ref={input}
                    type="text"
                    // value={text}
                    // onChange={e => setText(e.target.value)}
                    className="msger-input"
                    data-meteor-emoji="true"
                />
                <button type="submit" className="msger-send-btn">
                    <Countdown ref={counter} onDone={endTimer} />
                    {!timer &&
                        <div className="send-icon" />
                    }
                </button>
            </form>
        </div >
    )
}