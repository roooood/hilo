import React, { useState, useContext, useRef, useEffect } from 'react';
import { t } from 'locales';
import storeContext from 'reducer/context';
import Countdown from 'component/countdown';
import './chat.css';

export default function History(props) {
    const { app: { game }, setting: { message, id } } = useContext(storeContext);
    const counter = useRef(null);
    const scroll = useRef(null);
    const [text, setText] = useState('');
    const [timer, setTimer] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (timer) return;
        game.send('chat', text);
        setText('');
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
                <input type="text" value={text} onChange={e => setText(e.target.value)} className="msger-input" placeholder="Enter your message..." />
                <button type="submit" className="msger-send-btn">
                    <Countdown ref={counter} onDone={endTimer} />
                    {!timer &&
                        <svg viewBox="0 0 512 512" enableBackground="new 0 0 128 128" >
                            <path d="M462,54.955L355.371,437.187l-135.92-128.842L353.388,167l-179.53,124.074L50,260.973L462,54.955z
M202.992,332.528v124.517l58.738-67.927L202.992,332.528z"></path>
                        </svg>
                    }

                </button>
            </form>
        </div >
    )
}