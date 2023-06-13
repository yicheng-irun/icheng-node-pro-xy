"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWSServer = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const tunnel_1 = require("./tunnel");
async function createWSServer(port = 8800, tcpPort = 18080) {
    const app = (0, express_1.default)();
    app.get('/', (_, res) => {
        res.send('hello world');
    });
    const server = http_1.default.createServer(app);
    (0, tunnel_1.toTCPOnServer)({
        server,
        path: '/ws-ttt',
        toPort: tcpPort,
        toHost: '127.0.0.1'
    });
    server.listen(port, '0.0.0.0', () => {
        console.log(`ws server listen in ${port}, to ${tcpPort}`);
    });
}
exports.createWSServer = createWSServer;
