"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_server_1 = require("./utils/proxy-server");
const ws_server_1 = require("./utils/ws-server");
console.log('server');
async function main() {
    await (0, proxy_server_1.createProxyServer)(18888);
    console.log('本地httpProxy启动成功');
    await (0, ws_server_1.createWSServer)(8800, 18888);
    console.log('websocket server 启动成功');
}
main().catch(console.error);
