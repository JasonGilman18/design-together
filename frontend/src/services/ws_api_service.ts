import {Socket} from 'phoenix';

export function connectToWebsocketAndChannels(authToken: string, socketRef: React.MutableRefObject<Socket>) {
    var socket = new Socket('/socket', {params: {authToken: authToken}})
    socket.connect();

    //var channel = socket.channel('document:'+doc_id, {});
    //channel.join();
    //probable return channels and set state of connected channel

    //socketRef.current = socket;
}