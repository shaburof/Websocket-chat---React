import React from 'react';
import { getTime, insertSmiles, smiles, messagesType } from '../../../app/helper';
import classes from './classes.module.scss';

interface messageInterface {
    messages: messagesType
}

const Messages = (props: messageInterface) => {

    const showTime = false;

    return <>
        {props.messages.map((message, index) => {
            return <li key={index} className={classes.message} style={{ color: (message as any).color }}>
                <span className={classes.messageName}>{(message as any).user}:</span>
                {showTime && <span className={classes.messageTime}>{getTime((message as any).time)}</span>}
                <span dangerouslySetInnerHTML={{ __html: insertSmiles((message as any).message, smiles) }}></span>
            </li>
        })}
    </>
}

export default Messages;