"use strict";
/* eslint-disable n/no-deprecated-api */
/**
 * 进行普通的http代理
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxyServer = void 0;
const http_1 = __importDefault(require("http"));
const net_1 = __importDefault(require("net"));
const url_1 = __importDefault(require("url"));
/**
 * 普通的http请求走这里
 * @param cReq
 * @param cRes
 */
function request(cReq, cRes) {
    console.log('request', cReq.url);
    const u = url_1.default.parse(cReq.url);
    const options = {
        hostname: u.hostname,
        port: u.port ?? 80,
        path: u.path,
        method: cReq.method,
        headers: cReq.headers
    };
    if (u.hostname === null) { // 如果是直接请求的
        cRes.write('hello wrold');
        cRes.end();
        return;
    }
    const pReq = http_1.default.request(options, (pRes) => {
        cRes.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cRes);
    }).on('error', (e) => {
        console.log('request error', e);
        cRes.end();
    });
    cReq.pipe(pReq);
    cReq.on('error', (e) => {
        console.log('request creq error', e);
        pReq.end();
    });
}
/**
 * websock 或者 https 是走的这里
 * @param cReq
 * @param cSock
 */
function connect(cReq, cSock) {
    console.log('connect', cReq.url);
    const u = url_1.default.parse(`http://${cReq.url ?? ''}`);
    const pSock = net_1.default.connect(parseInt(u.port, 10), u.hostname, () => {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', (e) => {
        console.log('connect error', u.href, e);
        cSock.end();
    });
    cSock.pipe(pSock);
    cSock.on('error', (e) => {
        console.log('connect cSock error', u.href, e);
        pSock.end();
    });
}
async function createProxyServer(port = 18080) {
    await new Promise((resolve, reject) => {
        http_1.default.createServer()
            .on('request', request)
            .on('connect', connect)
            .on('error', reject)
            .listen(port, '0.0.0.0', () => {
            console.log(`proxy server listen in ${port}`);
            resolve(undefined);
        });
    });
}
exports.createProxyServer = createProxyServer;
