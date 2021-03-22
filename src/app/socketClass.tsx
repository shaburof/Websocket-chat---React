import io from 'socket.io-client';
import { debug } from '../containers/App';
// const socket = debug ? io('http://192.168.1.71:3001') : io('http://192.168.2.66:3001');

class socketClass {
    socket: SocketIOClient.Socket;
    debug: boolean;
    constructor(debug: boolean) {
        this.debug = debug;
        this.socket = debug ? io('http://192.168.1.71:3001', {
        }) : io('http://192.168.2.66:3001', {
        });

        this.stopReconnectAfter(3);


    }

    checkStatus = () => {
        return new Promise((resolve, reject) => {
            this.socket.on('checkStatus', (status: { status: boolean }) => {
                resolve(status);
            });
        });
    }

    stopReconnectAfter = (attempt: number) => {
        let attemptNumber = attempt;
        this.socket.on('reconnect_attempt', (attemptNumber: any) => {
            this.debug && console.log('attemptNumber: ', attemptNumber);
            if (attemptNumber > 3) {
                this.debug && console.log(`Stoping reconnection to server with ${attempt} attempts.`);
                this.socket.close();
            }
        });
    }

    emitGetMessages = () => {
        this.socket.emit('getMessages');
    }

    emitSendMessage = (message: string) => {
        this.socket.emit('sendMessage', message);
    }


    onGetMessages = (cb: Function) => {
        this.socket.on('getMessages', (data: any) => {
            this.debug && console.log('data: ', data);
            cb(data);
        });
    }

    onBroadcast = (cb: Function) => {
        this.socket.on('broadcast', (data: any) => {
            this.debug && console.log('broadcast data: ', data);
            cb(data);
        })
    }

    onRestartServer = (cb: Function) => {
        this.socket.on('restartServer', () => {
            this.debug && console.log('restartServer');
            cb();
        })
    }
}

export default socketClass;