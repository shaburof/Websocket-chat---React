import React, { useEffect, useState } from 'react';
import ChatMain from '../components/ChatMain/ChatMain';
import _socketClass from '../app/socketClass';
import { CSS_COLOR_NAMES, messagesType } from '../app/helper';

const debug = true;
const socketClass = new _socketClass(debug);

function App() {

    const [online, setOnline] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<messagesType>([]);

    useEffect(() => {
        getConnection();
    }, []);

    const getConnection = async () => {
        let { status } = await socketClass.checkStatus() as { status: boolean };
        if (status === true) {
            setOnline(true);
            socketClass.emitGetMessages();
            onGetMessages();
            onBroadcast();
            socketClass.onRestartServer(() => reset())
        } else setOnline(false);
    }

    const reset = () => {
        setOnline(false);
        setMessage('');
        setMessages([]);
        setOnline(true);
    }

    const onGetMessages = () => {
        socketClass.onGetMessages((data: any) => {
            debug && console.log('onGetMessages data: ', data);
            setMessages(data);
        });
    }


    const sendHandler = (message: string) => {
        debug && console.log('send message: ', message);
        socketClass.emitSendMessage(message);
        setMessage('');
    }

    const onBroadcast = () => {
        socketClass.onBroadcast((data: any) => {
            setMessages(prev => {
                return [...prev, data];
            })
        })
    }

    return (
        <div className="App">
            {online
                && <>
                    <ChatMain sendHandler={sendHandler}
                        message={message} setMessage={setMessage}
                        messages={messages}
                    />
                </>}

        </div>
    );
}

export default App;
export { debug };