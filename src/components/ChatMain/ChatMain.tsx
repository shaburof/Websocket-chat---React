import React, { useEffect, useRef, useState } from 'react';
import { smiles, filterMessage, insertSmiles, getTime, messagesType } from '../../app/helper';
import classes from './classes.module.scss';
import Messages from './Messages/Messages';
import { debug } from '../../containers/App';

interface ChatMainInterface {
    sendHandler: (s: string) => void,
    message: string,
    setMessage: Function,
    messages: messagesType,
    // messages: { name: string, massage: string, color: string, time: string }[],
}

const ChatMain = (props: ChatMainInterface) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const textAreaRef = useRef<HTMLDivElement>(null) as any;
    const inputRef = useRef<HTMLDivElement>(null) as any;
    const messagesRef = useRef(null);

    useEffect(() => {
        textAreaScrollHelper();
    }, [props.messages]);

    const selectEmoji = (emojiName: any) => {
        props.setMessage((prev: string) => prev += emojiName);
        inputRef.current.focus();
    }

    const smilesBox = (smiles: any[]) => {
        let elements = [];
        let temp = [];
        let addRowStep = 8;
        let smilesLength = smiles.length;
        let step = 0;
        for (const smile of smiles) {
            let additionalPath = debug ? '' : '/public';
            temp.push(<img key={smile.image}
                onClick={() => { selectEmoji(smile.emojiName) }}
                className={classes.smileIcon}
                src={additionalPath + "/images/smiles/" + smile.image} />);

            step++;
            smilesLength--;
            if (step === addRowStep || smilesLength === 0) {
                elements.push(<div key={smile.image} className={classes.emojiSectionSmileRow}>{temp}</div>);
                temp = [];
                step = 0;
            }
        }
        return [<section key={'emoji'} className={classes.emojiSection}>{elements}</section>];
    }

    const textAreaScrollHelper = () => {
        if (props.messages.length !== 0) {
            let textArea = textAreaRef.current as any;
            let messages = messagesRef.current as any;
            let messagesHeight = messages.clientHeight;

            if (textArea.clientHeight > messagesHeight) {
                textArea.style.overflowY = 'unset';
            } else {
                textArea.style.overflowY = 'scroll';
                textArea.scrollTop = textArea.scrollHeight;
                // textArea.scrollTop = messagesHeight;
            }
        }

    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.keyCode === 88) setShowEmoji(prev => !prev);
        else if (props.message.trim().length > 0 && event.ctrlKey && (event.keyCode === 13 || event.which === 32)) {
            let message = (filterMessage(props.message.trim()));
            props.sendHandler(message);
            setShowEmoji(false);
        }

    }

    return <div className={classes.chatMain}>
        <section className={classes.chatArea}>
            {/* <textarea className={classes.chatArea__textarea} style={{ whiteSpace: 'pre-line' }}></textarea> */}
            <div ref={textAreaRef} className={classes.chatArea__textarea}>
                <ul ref={messagesRef} className={classes.messages}>
                    {/* {props.messages.map((message, index) => {
                        return <li key={index} className={classes.message} style={{ color: (message as any).color }}>
                            <span className={classes.messageName}>{(message as any).user}</span><span className={classes.messageTime}>{getTime((message as any).time)}:</span> <span dangerouslySetInnerHTML={{ __html: insertSmiles((message as any).message, smiles) }}></span>
                        </li>
                    })} */}
                    <Messages messages={props.messages} />
                </ul>
            </div>
        </section>
        <section className={classes.inputArea}>
            <input ref={inputRef} type="text" onKeyDown={onKeyDownHandler} className={classes.inputArea__input} value={props.message} onChange={(e) => { props.setMessage(e.target.value) }} />
            <div className={classes.inputArea__helpMessage}>send: <span>ctrl+enter</span> or <span>ctrl+space</span></div>
            <div className={classes.inputArea__helpMessage + ' ' + classes.helpMessageEmoji}>emoji: <span>ctrl+x</span></div>
        </section>
        {showEmoji && smilesBox(smiles)}
    </div >
};

export default ChatMain;