"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTCP = exports.toTCPOnServer = exports.toTCPOnConnection = exports.toIPCTCPOnConnection = exports.toWebSocket = void 0;
const net_1 = __importDefault(require("net"));
const ws_1 = __importDefault(require("ws"));
const toWebSocket = (fromPort, toAddr) => {
    const server = net_1.default.createServer(c => {
        const ws = new ws_1.default(toAddr);
        console.log('connect');
        ws.on('close', () => c.destroy());
        ws.on('error', () => c.destroy());
        c.on('end', () => { ws.close(1000); });
        c.on('error', () => { ws.close(1000); });
        ws.on('open', () => {
            console.log('on open');
            c.on('data', data => {
                ws.send(data);
            });
        });
        ws.on('message', data => {
            if (!c.destroyed) {
                // @ts-expect-error
                c.write(data);
            }
        });
    });
    server.on('error', (err) => {
        throw err;
    });
    server.listen(fromPort);
    return server;
};
exports.toWebSocket = toWebSocket;
const toIPCTCPOnConnection = (ws, ipc) => {
    const client = net_1.default.connect(ipc);
    client.on('end', () => { ws.close(1000); });
    client.on('error', () => { ws.close(1000); });
    ws.on('close', () => client.destroy());
    ws.on('error', () => client.destroy());
    // @ts-expect-error
    ws.on('message', data => client.write(data));
    client.on('data', data => { ws.send(data); });
};
exports.toIPCTCPOnConnection = toIPCTCPOnConnection;
const toTCPOnConnection = (ws, toPort, toHost) => {
    const client = net_1.default.createConnection(toPort, toHost);
    client.on('end', () => { ws.close(1000); });
    client.on('error', () => { ws.close(1000); });
    ws.on('close', () => client.destroy());
    ws.on('error', () => client.destroy());
    client.on('connect', () => {
        console.log('client on ready');
        ws.on('message', data => {
            console.log('ws on message');
            // @ts-expect-error
            client.write(data);
        });
    });
    client.on('data', data => {
        console.log('client on data');
        ws.send(data);
    });
};
exports.toTCPOnConnection = toTCPOnConnection;
const toTCPOnServer = ({ server, path = '/ws-ttt', toHost, toPort }) => {
    const wss = new ws_1.default.WebSocketServer({ server, path });
    wss.on('connection', ws => { (0, exports.toTCPOnConnection)(ws, toPort, toHost); });
    return wss;
};
exports.toTCPOnServer = toTCPOnServer;
const toTCP = (fromPort, toPort, toHost) => {
    const wss = new ws_1.default.WebSocketServer({ port: fromPort });
    wss.on('connection', ws => { (0, exports.toTCPOnConnection)(ws, toPort, toHost); });
    return wss;
};
exports.toTCP = toTCP;
